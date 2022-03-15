const bcrypt = require("bcrypt");
const { generateToken, capitalize } = require("../utils.js");
const { db } = require("../db.js");
const { v4: uuidv4 } = require("uuid");

//user profile
// const getUserProfile = async (req, res) => {
//   const username = req.params.username;
//   console.log(username);
//   try {
//     if (username) {
//       let userPostAndComments = await db.query(
//         "SELECT posts.post_id, posts.title, posts.created_on AS postcreated_on, comments.community_name, comments.comment_id,comments.comment_text, comments.created_on AS commentcreated_on FROM posts INNER JOIN comments ON posts.author = comments.author_username WHERE posts.author = $1 LIMIT 5;",
//         [username]
//       );
//       // const userProfile = await db.query("SELECT users.firstname, friendsList,followersList, followingList, posts.post_id, posts.title, comments.comment_id,comments.comment_text FROM posts INNER JOIN users ON posts.author = users.username INNER JOIN comments ON comments.post_id = posts.post_id INNER JOIN friends ON users.username = friends.username WHERE users.username = $1;",[username]);
//       //   console.log(userPostAndComments);
//       let userFirstnameAndFollowers = await db.query(
//         "SELECT users.firstname, friends_list, followers_list, following_list FROM users LEFT JOIN friends ON users.username = friends.username WHERE users.username = $1;",
//         [username]
//       );
//       console.log(userFirstnameAndFollowers);
//       if(userPostAndComments.rowCount > 0 || userFirstnameAndFollowers.rowCount > 0){
//           userPostAndComments = userPostAndComments.rows;
//           userFirstnameAndFollowers = userFirstnameAndFollowers.rows[0];
//         res.status(200).send({userPostAndComments, userFirstnameAndFollowers });
//       }else{
//           res.status(404).json("User was not found");
//       }
//     } else {
//       res.status(404).json("No ID was found");
//     }
//   } catch (error) {
//     res.status(404).json("User was not found");
//   }
// };

//user profile
const getUserProfile = async (req, res) => {
  const username = req.params.username;
  console.log(username);
  const dataLimit = 10;
  try {
    if (username) {
      let userPosts = await db.query(
        `SELECT post_id, title, community_name, created_on FROM posts WHERE author = $1 ORDER BY created_on LIMIT ${dataLimit};`,
        [username]
      );
      console.log(userPosts);

      let userComments = await db.query(
        `SELECT community_name, comment_id, comment_text, created_on FROM comments WHERE author_username = $1 ORDER BY created_on LIMIT ${dataLimit} ;`,
        [username]
      );
      console.log(userComments);

      //   let userFirstnameAndFollowers = await db.query(
      //     "SELECT users.firstname, friends_list, followers_list, following_list FROM users LEFT JOIN friends ON users.username = friends.username WHERE users.username = $1;",
      //     [username]
      //   );

      let userFollowers = await db.query(
        "SELECT friends_list, followers_list, following_list FROM friends WHERE username = $1;",
        [username]
      );
      console.log(userPosts, userComments);
      if (
        userComments.rowCount > 0 ||
        userFollowers.rowCount > 0 ||
        userPosts.rowCount > 0
      ) {
        userComments = userComments.rows;
        userPosts = userPosts.rows;
        userFollowers = userFollowers.rows[0];
        res.status(200).send({ userPosts, userComments, userFollowers });
      } else {
        res.status(404).json("User was not found");
      }
    } else {
      res.status(404).json("No ID was found");
    }
  } catch (error) {
    res.status(404).json("User was not found");
  }
};

//find all users
//find user by id
//find user by username
const allUsers = async (req, res) => {
  const id = req.query.id;
  const username = req.query.username;

  if (id) {
    const userById = await db.query("SELECT * FROM users WHERE user_id = $1;", [
      id,
    ]);
    if (userById.rowCount > 0) {
      res.status(200).send(userById.rows[0]);
    } else {
      res.status(404).json("User was not found");
    }
  } else if (username) {
    const userByUsername = await db.query(
      "SELECT * FROM users WHERE username = $1;",
      [username]
    );
    if (userByUsername.rowCount > 0) {
      res.status(200).send(userByUsername.rows[0]);
    } else {
      res.status(404).json("User was not found");
    }
  } else {
    const users = await db.query("SELECT * FROM users;");
    res.status(200).send(users.rows);
  }
};

//find single user
const oneUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      const userById = await db.query(
        "SELECT * FROM users WHERE user_id = $1;",
        [id]
      );
      if (userById.rowCount > 0) {
        res.status(200).send(userById.rows[0]);
      } else {
        res.status(404).json("User was not found");
      }
    } else {
      res.status(404).json("No ID was found");
    }
  } catch (error) {
    res.status(404).json("User was not found");
  }
};

const userLogin = async (req, res) => {
  console.log("backend userlogin");

  const { email, password } = req.body;
  console.log(email, password);

  try {
    const result = await db.query(
      "SELECT user_id, firstname, is_admin, password, username, email FROM users WHERE email = $1;",
      [email]
    );
    if (result.rowCount > 0) {
      if (bcrypt.compareSync(password, result.rows[0].password)) {
        console.log("Password matched");
        const createdUser = { ...result.rows[0] };
        res.status(201).send({
          user_id: result.rows[0].user_id,
          firstname: result.rows[0].firstname,
          username: result.rows[0].username,
          profile_pic: result.rows[0].profile_pic,
          is_admin: result.rows[0].is_admin,
          token: generateToken(createdUser),
          message: `Welcome back Big Boss! ${capitalize(
            result.rows[0].username
          )}, you are now logged in!`,
        });
      } else {
        res.status(403).send({ message: "Invalid password" });
      }
    } else {
      res.status(204).send({ message: "No User with such credentials exist!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const userRegister = async (req, res) => {
  const { firstname, lastname, username, email, password, profile_pic } =
    req.body;
  try {
    const search = await db.query(
      "SELECT username, email FROM users WHERE username = $1 OR email= $2;",
      [username, email]
    );
    if (search.rowCount > 0) {
      res.status(409).json({
        message: "A user with that Email or Username, already exists!",
      });
    } else {
      const user_id = uuidv4();
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const last_login = new Date();
      const result = await db.query(
        "INSERT INTO users (user_id, firstname, lastname, username, email, password, profile_pic, last_login) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
        [
          user_id,
          firstname,
          lastname,
          username,
          email,
          hashedPass.toString(),
          profile_pic,
          last_login,
        ]
      );
      console.log("successfully inserted a document");
      const createdUser = { ...result.rows[0] };
      res.status(201).send({
        user_id: result.rows[0].user_id,
        firstname: result.rows[0].firstname,
        username: result.rows[0].username,
        profile_pic: result.rows[0].profile_pic,
        is_admin: result.rows[0].is_admin,
        token: generateToken(createdUser),
        message: `Congratulations ${result.rows[0].firstname}, you have successfully registered! Now, proceed to Log in.`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const userProfile = async (req, res) => {
  const user = await db.query(
    "SELECT (user_id, password, firstname, lastname, profile_pic) FROM users WHERE user_id = $1;",
    [req.user.user_id]
  );
  const { password, firstname, lastname, profile_pic } = user.rows[0];
  if (user.rowCount > 0) {
    if (req.body.currentPassword) {
      if (bcrypt.compareSync(req.body.currentPassword, password)) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        firstname = req.body.newFirstname || firstname;
        lastname = req.body.newLastname || lastname;
        password = hashedPass || password;
        profile_pic = req.body.filename || profile_pic;

        try {
          const insertion = await db.query(
            "INSERT INTO users firstname, lastname, password, profile_pic VALUES ($1, $2, $3, $4) RETURNING *;",
            [firstname, lastname, password.toString(), profile_pic]
          );
          const updatedUser = { ...insertion.rows[0] };
          res.status(201).send({
            user_id: insertion.rows[0].user_id,
            firstname: insertion.rows[0].firstname,
            username: insertion.rows[0].username,
            profile_pic: insertion.rows[0].profile_pic,
            is_admin: insertion.rows[0].is_admin,
            token: generateToken(updatedUser),
            message: "Boss!, you have successfully updated your profile.",
          });
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res
          .status(403)
          .send({ message: "You entered an incorrect current password!" });
      }
    } else {
      res.status(403).send({
        message: "You must enter a valid current password to make any updates!",
      });
    }
  } else {
    res.status(401).send({ message: "Oops! User, Was Not Found." });
  }
};

const deleteUser = async (req, res) => {
  const result = await db.query(
    "SELECT user_id FROM users WHERE user_id = $1;",
    [req.user.user_id]
  );

  if (result) {
    const result = await db.query("DELETE FROM users WHERE user_id = $1;", [
      req.user.user_id,
    ]);
    res.status(200).send({
      message:
        "You have successfully deleted your account. Tell us more, why you left.",
    });
  } else {
    res.status(204).send({ message: "User does not exist!" });
  }
};

module.exports = {
  getUserProfile,
  oneUser,
  allUsers,
  userLogin,
  userRegister,
  userProfile,
  deleteUser,
};
