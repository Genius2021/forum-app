const { db } = require("../db.js");
const { capitalizeStringWithDash } = require("../utils.js");
const { v4: uuidv4 } = require("uuid");



const likeCommunityPost = async (req, res) => {
    const { username, community } = req.body;
    const post_id = req.params.postId
    try {
        let likeCount;
        const find = await db.query("SELECT liked_by FROM posts WHERE post_id = $1 AND $2 = ANY(liked_by);", [post_id, username] )
        if(find.rows.length > 0){
            const removed = await db.query("UPDATE posts SET liked_by = array_remove(liked_by, $1) WHERE post_id = $2 RETURNING liked_by;", [username, post_id ] )
            likeCount = removed.rows[0].liked_by.length
            res.status(200).json({ liked: false, likeCount, username });
        }else{
            const addedLike = await db.query("UPDATE posts SET liked_by = array_append(liked_by, $1) WHERE post_id = $2 RETURNING liked_by;", [username, post_id ] )
            likeCount = addedLike.rows[0].liked_by.length
            res.status(200).json({ liked: true, likeCount, username });
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
}

const pinCommunityPostToDashboard = async (req, res) => {
    const { username } = req.body;
    const postId = req.params.postId
    const capitalizeCommunity = capitalizeStringWithDash(req.baseUrl.split("/")[2])

    try {
        const find = await db.query("SELECT is_pinned_to_dashboard_array FROM posts WHERE post_id = $1 AND $2 = ANY(is_pinned_to_dashboard_array);", [postId, username] )
        if(find.rowCount > 0){
            const removed = await db.query("UPDATE posts SET is_pinned_to_dashboard_array = array_remove(is_pinned_to_dashboard_array, $1) WHERE post_id = $2 RETURNING is_pinned_to_dashboard_array, post_id;", [username, postId ] )
            //  = removed.rows[0].is_pinned_to_dashboard_array.length
            const post_id = removed.rows[0].post_id
            res.status(200).json({ pinned: false, post_id, username });
        }else{
            const addedToDashboard = await db.query("UPDATE posts SET is_pinned_to_dashboard_array = array_append(is_pinned_to_dashboard_array, $1) WHERE post_id = $2 RETURNING is_pinned_to_dashboard_array, post_id;", [username, postId ] )
            const post_id = addedToDashboard.rows[0].post_id
            res.status(200).json({ pinned: true, post_id, username });
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteAComment = async (req, res) => {
    const post_id = req.params.postId;
    const username = req.body.username;
    const commentId = req.params.commentId;
    const capitalizeCommunity = capitalizeStringWithDash(req.baseUrl.split("/")[2])


    try{
         const findAuthorUsername = await db.query("SELECT author_username, comment_id FROM comments WHERE comment_id = $1 AND post_id = $2;", [commentId, post_id])
         if(findAuthorUsername.rowCount > 0 ){
             const usernameFromDatabase = findAuthorUsername.rows[0].author_username
             const commentIdFromDatabase = findAuthorUsername.rows[0].comment_id
            if(usernameFromDatabase === username){
                await db.query("DELETE FROM comments WHERE comment_id = $1;", [commentId])
                res.status(200).json({message:"Post has been deleted", commentIdFromDatabase});
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

const CommunityAllCommentsFollow = async (req, res) => {
    const { username } = req.body;
    const postId = req.params.postId;
    try {
        let followed_by;
        let length;
        let post_id;
        let follow_all_comments
        const find = await db.query("SELECT followed_by FROM comments WHERE post_id = $1 AND $2 = ANY(followed_by);", [postId, username])
        if(find.rows.length > 0){
            const removed = await db.query("UPDATE comments SET followed_by = array_remove(followed_by, $1) WHERE post_id = $2 RETURNING followed_by, post_id, author_username;", [username, postId ] )
            const notFollowingAll = await db.query("UPDATE posts SET follow_all_comments = array_remove(follow_all_comments, $1) WHERE post_id = $2 RETURNING follow_all_comments;", [username, postId ] )
            followed_by = removed.rows[0].followed_by;
            follow_all_comments = notFollowingAll.rows[0].follow_all_comments;
            post_id = removed.rows[0].post_id;
            length = removed.rows[0].followed_by.length;
            res.status(200).json({followed_by, username, length, follow_all_comments, followAllAction: false, post_id});
        }else{
            const addedAllFollow = await db.query("UPDATE comments SET followed_by = array_append(followed_by, $1) WHERE post_id = $2 RETURNING followed_by, post_id, author_username;", [username, postId ] )
            const followingAll = await db.query("UPDATE posts SET follow_all_comments = array_append(follow_all_comments, $1) WHERE post_id = $2 RETURNING follow_all_comments;", [username, postId ] )
            followed_by = addedAllFollow.rows[0].followed_by;
            follow_all_comments = followingAll.rows[0].follow_all_comments
            post_id = addedAllFollow.rows[0].post_id;
            length = addedAllFollow.rows[0].followed_by.length;
            res.status(200).json({followed_by, username, length, follow_all_comments, followAllAction: true, post_id});
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
}

const CommunityCommentFollow = async (req, res) => {
    const { username } = req.body;
    const commentId = req.params.commentId;
    try {
        let followed_by;
        let length;
        let comment_id;
        const find = await db.query("SELECT followed_by FROM comments WHERE comment_id = $1 AND $2 = ANY(followed_by);", [commentId, username] )
        if(find.rows.length > 0){
            const removed = await db.query("UPDATE comments SET followed_by = array_remove(followed_by, $1) WHERE comment_id = $2 RETURNING followed_by, comment_id, author_username;", [username, commentId ] )
            followed_by = removed.rows[0].followed_by;
            comment_id = removed.rows[0].comment_id;
            length = removed.rows[0].followed_by.length;
            res.status(200).json({followed_by, username, length, followAction: false, comment_id});
        }else{
            const addedFollow = await db.query("UPDATE comments SET followed_by = array_append(followed_by, $1) WHERE comment_id = $2 RETURNING followed_by, comment_id, author_username;", [username, commentId ] )
            followed_by = addedFollow.rows[0].followed_by;
            comment_id = addedFollow.rows[0].comment_id;
            length = addedFollow.rows[0].followed_by.length;
            res.status(200).json({followed_by, username, length, followAction: true, comment_id});
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
}


const CommunityCommentLike = async (req, res) => {
    const { user_name } = req.body;
    const commentId = req.params.commentId;
    try {
        let liked_by;
        let length;
        let comment_id;
        let username;
        const find = await db.query("SELECT liked_by FROM comments WHERE comment_id = $1 AND $2 = ANY(liked_by);", [commentId, user_name] )
        if(find.rows.length > 0){
            const removed = await db.query("UPDATE comments SET liked_by = array_remove(liked_by, $1) WHERE comment_id = $2 RETURNING liked_by, comment_id, author_username;", [user_name, commentId ] )
            liked_by = removed.rows[0].liked_by;
            comment_id = removed.rows[0].comment_id;
            length = removed.rows[0].liked_by.length;
            username = user_name;
            res.status(200).json({liked_by, username, length, likeAction: false, comment_id});
        }else{
            const addedLike = await db.query("UPDATE comments SET liked_by = array_append(liked_by, $1) WHERE comment_id = $2 RETURNING liked_by, comment_id, author_username;", [user_name, commentId ] )
            liked_by = addedLike.rows[0].liked_by;
            comment_id = addedLike.rows[0].comment_id;
            length = addedLike.rows[0].liked_by.length;
            username = user_name;
            res.status(200).json({liked_by, username, length, likeAction: true, comment_id});
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
}

const CommunityCommentShare = async (req, res) => {
    const { username, community } = req.body;
    const commentId = req.params.commentId
   
    try {
        const find = await db.query("SELECT shared_by FROM comments WHERE $1 = ANY(shared_by);", [username] )
        if(find.rows.length > 0){
        res.status(200);
        }else{
            const addedShare = await db.query("UPDATE comments SET shared_by = array_append(shared_by, $1) WHERE post_id = $2 RETURNING shared_by;", [username, post_id ] )
            let shareCount = addedShare.rows[0].shared_by.length
            res.status(200).json({ liked: true, shareCount });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const postAComment = async (req, res) => {
    const comment_id = req.params.commentId
    const post_id = req.params.postId
    const {author_username, is_admin, comment_text} = req.body
    const capitalizeCommunity = capitalizeStringWithDash(req.baseUrl.split("/")[2])

    try {
        const insertion = await db.query("INSERT INTO comments(comment_id, post_id, community_name, author_username, is_admin, comment_text ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [comment_id, post_id, capitalizeCommunity, author_username, is_admin, comment_text ])
        const createdPost = insertion.rows[0]
        res.status(200).json(createdPost);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getAllComments = async (req, res) => {
    const pageNumber = req.query.page;
    const pageLimit = 10;
    const skipNumber = (pageNumber * pageLimit) - pageLimit;
    let documentsCount;
    let numOfPages;
    const post_id = req.params.postId
    const capitalizeCommunity = capitalizeStringWithDash(req.baseUrl.split("/")[2])
    try {
        //NOTE: When doing an inner join, after the SELECT, you specify the columns in both table A and table B which you want. NOTE again, they come immediately after the SELECT syntax.
        const count = await db.query('SELECT count(comment_id) FROM comments WHERE post_id = $1 AND community_name = $2 ', [post_id, capitalizeCommunity])
        let result = await db.query(`SELECT comment_id, post_id,community_name, author_username, comments.is_admin, comment_text, shared_by, followed_by, comments.created_on, edited_on, users.firstname, users.username, CASE WHEN liked_by is NULL THEN '{}' ELSE liked_by END FROM comments INNER JOIN users ON comments.author_username = users.username WHERE post_id = $1 AND community_name = $2 ORDER BY comments.created_on DESC LIMIT ${pageLimit} OFFSET ${skipNumber};`, [ post_id, capitalizeCommunity ]);
        documentsCount = count.rows[0].count;
        numOfPages = Math.ceil(documentsCount / pageLimit); //e.g there are 10 pages which will be sent to the frontend
        comments = result.rows
        res.status(200).json({comments, documentsCount, numOfPages, pageLimit});
    } catch (err) {
        res.status(500).json(err);
    }
}


const createACommunityPost = async (req, res) => {
  const { title, description, picture, author } = req.body;
  console.log(picture, "picture at backend...")
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
        const id = req.params.postId;
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
    const id = req.params.postId
    const capitalizeCommunity = capitalizeStringWithDash(req.baseUrl.split("/")[2])

    try{
        // const post = await db.query("SELECT post_id FROM posts INNER JOIN users ON users.username = posts.author WHERE post_id = $1;", [req.params.id])
        const post = await db.query("SELECT post_id, author FROM posts WHERE post_id = $1 AND community_name = $2;", [id, capitalizeCommunity ])
        if(post.rowCount > 0 ){
             const post_id = post.rows[0].post_id
            if(post.rows[0].author === req.body.username){

                await db.query("DELETE FROM posts WHERE post_id = $1;", [id])
                res.status(200).json({message: "Post has been deleted", post_id });
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
    const id = req.params.postId
    const username = req.query.username
    const communityFromParams = capitalizeStringWithDash(req.baseUrl.split("/")[2])

    try{
        const findPost = await db.query("SELECT post_id FROM posts WHERE post_id = $1", [id])
        if(findPost.rowCount > 0){
            if(username !== "undefined"){
                if(communityFromParams && id ){
                    const addedView = await db.query("UPDATE posts SET viewed_by_registered_users = array_append(viewed_by_registered_users, $1) WHERE post_id = $2 AND community_name = $3 RETURNING *;", [username, id, communityFromParams ] )
                    if(addedView.rowCount > 0){
                        post = addedView.rows[0]
                        res.status(200).json(post);
                    }else{
                        res.status(404).json("Post was not found");
                    }
        
                }else if(id){
                    const postById = await db.query("SELECT * FROM posts INNER JOIN community ON posts.community_name = community.community_name INNER JOIN users ON posts.author = users.username WHERE post_id = $1;", [id])                                                                                                                                                                                                                                                                                                                                                                                                   
                    if(postById.rowCount > 0){
                        postById = postById.rows[0];
                        res.status(200).send(postById);
                    }else{
                        res.status(404).json("Post was not found");
                    }
                }else{
                    res.status(404).json("No ID was found")
                }   
            }else{
                let ipAddress = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0] 
                const addedUnregisteredUsersView = await db.query("UPDATE posts SET viewed_by_unregistered_users = array_append(viewed_by_unregistered_users, $1) WHERE post_id = $2 AND community_name = $3 RETURNING *;", [ipAddress, id, communityFromParams ] )
                if(addedUnregisteredUsersView.rowCount > 0){
                    post = addedUnregisteredUsersView.rows[0]
                    res.status(200).json(post);
                }else{
                    res.status(404).json("Post was not found");
                }
            }
        }else{
            res.status(404).json("Post was not found")
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
        //    const postByAuthor = await db.query("SELECT * FROM posts INNER JOIN community ON (posts.community_name = community.community_name) WHERE author = $1 ORDER BY posts.created_on DESC LIMIT 5;", [author]);
           const postByAuthor = await db.query("SELECT * FROM posts WHERE author = $1 ORDER BY posts.created_on DESC LIMIT 5;", [author]);
           if(postByAuthor.rowCount > 0){
            documentsCount = count.rows[0].count;
            numOfPages = Math.ceil(documentsCount / pageLimit); //e.g there are 10 pages which will be sent to the frontend
                posts = postByAuthor.rows
                res.status(200).json({documentsCount, numOfPages , posts, pageLimit})
            }else{
                res.status(404).json("Post was not found");
            }
        }else if(pageNumber && communityFromParams){
                const doc = async(pageNumber=1)=>{
                const count = await db.query('SELECT count(post_id) FROM posts WHERE community_name = $1', [communityFromParams])
                const result = await db.query(`SELECT * FROM posts WHERE community_name = $1 ORDER BY posts.created_on DESC LIMIT ${pageLimit} OFFSET ${skipNumber};`, [communityFromParams])
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
    CommunityAllCommentsFollow,
    CommunityCommentFollow,
    pinCommunityPostToDashboard,
    deleteAComment,
    likeCommunityPost,
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