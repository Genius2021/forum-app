const { db } = require("../db.js");
const { capitalizeStringWithDash } = require("../utils.js");
const { v4: uuidv4 } = require("uuid");



const CommunityCommentLike = async (req, res) => {
    const { title, description, picture, author, community } = req.body;
    const capitalizeCommunity = capitalizeStringWithDash(community);
    try {
        // const insertion = await db.query("INSERT INTO posts(title, description, picture, author, community_name, likes, is_shared, views, is_pinned_to_dashboard) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [title, description, picture, author, community ] )
        const insertion = await db.query("INSERT INTO posts(title, description, picture, author, community_name ) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [title, description, picture, author, capitalizeCommunity ] )
        const createdPost = insertion.rows[0]
        res.status(200).json(createdPost);
    } catch (err) {
        res.status(500).json(err);
    }
}

const CommunityCommentShare = async (req, res) => {
    const { title, description, picture, author, community } = req.body;
    const capitalizeCommunity = capitalizeStringWithDash(community);
    try {
        // const insertion = await db.query("INSERT INTO posts(title, description, picture, author, community_name, likes, is_shared, views, is_pinned_to_dashboard) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [title, description, picture, author, community ] )
        const insertion = await db.query("INSERT INTO posts(title, description, picture, author, community_name ) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [title, description, picture, author, capitalizeCommunity ] )
        const createdPost = insertion.rows[0]
        res.status(200).json(createdPost);
    } catch (err) {
        res.status(500).json(err);
    }
}

const postAComment = async (req, res) => {
    const comment_id = req.params.commentId
    const post_id = req.params.id
    const {author_id, is_admin, comment_text} = req.body
    const capitalizeCommunity = capitalizeStringWithDash(req.baseUrl.split("/")[2])

    try {
        const insertion = await db.query("INSERT INTO comments(comment_id, post_id, community_name, author_id, is_admin, comment_text ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [comment_id, post_id, capitalizeCommunity, author_id, is_admin, comment_text ])
        const createdPost = insertion.rows[0]
        res.status(200).json(createdPost);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getAllComments = async (req, res) => {
    const post_id = req.params.id
    const capitalizeCommunity = capitalizeStringWithDash(req.baseUrl.split("/")[2])
    try {
        //NOTE: When doing an inner join, after the SELECT, you specify the columns in both table A and table B which you want. NOTE again, they come immediately after the SELECT syntax.
        const allComments = await db.query("SELECT comment_id, post_id,community_name,author_id, comments.is_admin, comment_text, likes, shares, comments.created_on, edited_on, users.firstname, users.username  FROM comments INNER JOIN users ON comments.author_id = users.user_id WHERE post_id = $1 AND community_name = $2 ORDER BY comments.created_on DESC LIMIT 15;", [ post_id, capitalizeCommunity ])
        const createdPost = allComments.rows
        res.status(200).json(createdPost);
    } catch (err) {
        res.status(500).json(err);
    }
}


const createACommunityPost = async (req, res) => {
  const { title, description, picture, author } = req.body;
    const capitalizeCommunity = capitalizeStringWithDash(req.baseUrl.split("/")[2])

    try {
        const post_id = uuidv4()
        const insertion = await db.query("INSERT INTO posts(post_id, title, description, picture, author, community_name ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [post_id, title, description, picture, author, capitalizeCommunity ])
        const createdPost = insertion.rows[0]
        res.status(200).json(createdPost);
    } catch (err) {
        res.status(500).json(err);
    }
}

const editACommunityPost = async (req, res) => {
        const id = req.params.id;
    try{
        const postById = await db.query("SELECT * FROM posts WHERE post_id = $1;", [id] )
        const { author, title, description, picture, likes, is_shared, views, last_updated, is_pinned_to_dashboard } = postById.rows[0];
        if(author === req.user.username){
            const update = new Date();
            title = req.body.newTitle || title;
            description = req.body.newDescription || description;
            picture = req.body.newPicture || picture;
            likes = req.body.likes || likes;
            is_shared = req.body.is_shared || is_shared;
            views = req.body.views || views;
            last_updated = update || last_updated;
            is_pinned_to_dashboard = req.body.is_pinned_to_dashboard || is_pinned_to_dashboard;
            
            try{
                const insertion = await db.query("INSERT INTO posts (title, description, picture, likes, is_shared, views, is_pinned_to_dashboard, last_updated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;", [title, description, picture, likes,is_shared, views, is_pinned_to_dashboard, last_updated])
                const updatedPost = insertion.rows[0];
                res.status(200).json(updatedPost);
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("You can update only your posts!");
        }
          
    }catch(err){
         res.status(500).json(err)
    }
}


const deleteACommunityPost = async (req, res) => {
    try{
         const post = await db.query("SELECT * FROM posts INNER JOIN users ON users.username = posts.author WHERE post_id = $1;", [req.params.id])
         if(post.rowCount > 0 ){
             console.log("I found a post that can be deleted")
            if(post.rows[0].username === req.user.username){
                console.log("The post owner has been verified")

                await db.query("DELETE FROM posts WHERE post_id = $1;", [req.params.id])
                res.status(200).json("Post has been deleted");
            }else{
                res.status(401).json("You can delete only your own posts!");
            }
         }else{
            res.status(404).json("Post does not exist or has already been deleted");
         }
     }catch(err){
         res.status(500).json(err)
     }
 }

 const getSingleCommunityPost = async (req, res) =>{
    const id = req.params.id
    const communityFromParams = capitalizeStringWithDash(req.baseUrl.split("/")[2])

    try{
        if(communityFromParams && id ){
            const postByCommunityAndId = await db.query("SELECT * FROM posts WHERE post_id = $1 AND community_name = $2 ;", [id, communityFromParams]);
            if(postByCommunityAndId.rowCount > 0){
                post = postByCommunityAndId.rows[0]
                res.status(200).json(post)
            }else{
                res.status(404).json("Post was not found");
            }

        }else if(id){
            const postById = await db.query("SELECT * FROM posts INNER JOIN community ON posts.community_name = community.community_name INNER JOIN users ON posts.author = users.username WHERE post_id = $1;", [id])                                                                                                                                                                                                                                                                                                                                                                                                   
            if(postById.rowCount > 0){
                postById = postById.rows[0]
                res.status(200).send(postById);
            }else{
                res.status(404).json("Post was not found");
            }
        }else{
            res.status(404).json("No ID was found")
        }    
    }catch(error) {
        res.status(404).json("Post was not found");
    }
}

const getCommunityPosts = async (req, res) => {
    const author = req.query.author;
    const title = req.query.title;
    const community = req.query.community;
    const communityFromParams = capitalizeStringWithDash(req.baseUrl.split("/")[2])
    const pageNumber = req.query.page;
    const pageLimit = 3;
    const skipNumber = (pageNumber * pageLimit) - pageLimit;
    let documentsCount;
    let numOfPages;
    let posts;
    let count;

    try {
       if(author){
        count = await db.query("SELECT COUNT(author) FROM posts;");
           const postByAuthor = await db.query("SELECT * FROM posts INNER JOIN community ON (posts.community_name = community.community_name) WHERE author = $1 ORDER BY posts.created_on DESC LIMIT 5;", [author]);
           if(postByAuthor.rowCount > 0){
            documentsCount = count.rows[0].count;
            numOfPages = Math.ceil(documentsCount / pageLimit); //e.g there are 10 pages which will be sent to the frontend
                posts = postByAuthor.rows
                res.status(200).json({documentsCount, numOfPages , posts, pageLimit})
            }else{
                res.status(404).json("Post was not found");
            }
        }else if(pageNumber && communityFromParams){
            console.log("Just got here")
                const doc = async(pageNumber=1)=>{
                const count = await db.query('SELECT count(post_id) FROM posts WHERE community_name = $1', [communityFromParams])
                const result = await db.query(`SELECT * FROM posts WHERE community_name = $1 ORDER BY posts.created_on DESC LIMIT ${pageLimit} OFFSET ${skipNumber}`, [communityFromParams])
                console.log(result)
                documentsCount = count.rows[0].count;
                numOfPages = Math.ceil(documentsCount / pageLimit); //e.g there are 10 pages which will be sent to the frontend
                posts = result.rows;
                res.status(200).json({documentsCount, numOfPages , posts, pageLimit})
            }
            doc(pageNumber);

        }else if(pageNumber){
            async function documentReturn( pageNumber=1 ){
                count = await db.query("SELECT COUNT(post_id) FROM posts;");
                // const documentsCount =  await db.query("SELECT count(title) FROM posts")
                const result = await db.query(`SELECT * FROM posts INNER JOIN community ON posts.community_name = community.community_name ORDER BY posts.created_on DESC LIMIT ${pageLimit} OFFSET ${skipNumber} `)
                documentsCount = count.rows[0].count;
                numOfPages = Math.ceil(documentsCount / pageLimit); //e.g there are 10 pages which will be sent to the frontend
                posts = result.rows;
                res.status(200).json({documentsCount, numOfPages , posts, pageLimit})
            }
    
                documentReturn(pageNumber)
        }else if(community){
            count = await db.query("SELECT COUNT(post.community_name) FROM posts WHERE post.community_name = $1;", [community]);
            const postByCommunity = await db.query("SELECT * FROM posts WHERE community = $1 ORDER BY posts.created_on LIMIT 5;", [community]);
            if(postByCommunity.rowCount > 0){
                documentsCount = count.rows[0].count;
                numOfPages = Math.ceil(documentsCount / pageLimit); //e.g there are 10 pages which will be sent to the frontend
                posts = postByCommunity.rows
                res.status(200).json({documentsCount, numOfPages , posts, pageLimit})
            }else{
                res.status(404).json("Post was not found");
            }
       }else if(title){
            count = await db.query("SELECT COUNT(post.title) FROM posts WHERE post.title ILIKE $1;", [`%${title}%`]);
           //for reference
            // const postByTitle = await db.query("SELECT * FROM posts INNER JOIN users ON posts.author = users.username INNER JOIN community on posts.community_name = community.community_name WHERE title ILIKE $1 ORDER BY posts.created_on DESC LIMIT 5;", [`%${title}%`]);
            const postByTitle = await db.query("SELECT * FROM posts INNER JOIN community ON posts.community_name = community.community_name WHERE post.title ILIKE $1 ORDER BY posts.created_on DESC LIMIT 5;", [`%${title}%`]);
            if(postByTitle.rowCount > 0){
                documentsCount = count.rows[0].count;
                numOfPages = Math.ceil(documentsCount / pageLimit); //e.g there are 10 pages which will be sent to the frontend
                posts = postByTitle.rows
                res.status(200).json({documentsCount, numOfPages , posts, pageLimit})
            }else{
                res.status(404).json("Post was not found");
            }
       }else{
           count = await db.query('SELECT COUNT(post_id) FROM posts WHERE community_name = $1', [communityFromParams])
           const result = await db.query(`SELECT * FROM posts WHERE community_name = $1 ORDER BY posts.created_on LIMIT ${pageLimit} `, [communityFromParams])
           if(result.rowCount > 0){
                documentsCount = count.rows[0].count;
                numOfPages = Math.ceil(documentsCount / pageLimit);
                posts = result.rows
                res.status(200).send({documentsCount, numOfPages , posts, pageLimit})
            }else{
                res.status(404).json("Oops! Posts were not found");
            }
       }
        
    } catch (error) {
        res.status(404).json("Posts not found");
    }
}




module.exports ={
    CommunityCommentLike,
    CommunityCommentShare,
    getAllComments,
    postAComment,
    getCommunityPosts,
    createACommunityPost,
    getSingleCommunityPost,
    deleteACommunityPost,
    editACommunityPost,
}