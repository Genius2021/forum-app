const { db } = require("../db.js");



const createPost = async (req, res) => {
    const { title, description, picture, author, community_name, likes, is_shared, views, is_pinned_to_dashboard} = req.body;
    try {
        const insertion = await db.query("INSERT INTO posts(title, description, picture, author, community_name, likes, is_shared, views, is_pinned_to_dashboard) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;", [title, description, picture, author, community_name, likes, is_shared, views, is_pinned_to_dashboard ] )
        const createdPost = insertion.rows[0]
        res.status(200).json(createdPost);
    } catch (err) {
        res.status(500).json(err);
    }
}


const editPost = async (req, res) => {
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


const deletePost = async (req, res) => {
    try{
         const post = await db.query("SELECT * FROM posts INNER JOIN users ON users.username = posts.author WHERE post_id = $1;", [req.params.id])
         if(post.rowCount > 0 ){
            if(post.rows[0].username === req.user.username){

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

 const getAPost = async (req, res) =>{
    const id = req.params.id
    try{
        if(id){
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

const getAllPosts = async (req, res) => {
    const author = req.query.author;
    const title = req.query.title;
    const community = req.query.community;
    const pageNumber = req.query.page;
    const pageLimit = 10;
    // const skipNumber = 2;
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
                res.status(200).json({documentsCount, numOfPages , posts})
            }else{
                res.status(404).json("Post was not found");
            }
        }else if(pageNumber){
            async function documentReturn( pageNumber=1 ){
                count = await db.query("SELECT COUNT(post_id) FROM posts;");
                // const documentsCount =  await db.query("SELECT count(title) FROM posts")
                const result = await db.query(`SELECT * FROM posts INNER JOIN community ON posts.community_name = community.community_name ORDER BY posts.created_on DESC LIMIT ${pageLimit} OFFSET ${skipNumber} `)
                documentsCount = count.rows[0].count;
                numOfPages = Math.ceil(documentsCount / pageLimit); //e.g there are 10 pages which will be sent to the frontend
                posts = result.rows;
                res.status(200).json({documentsCount, numOfPages , posts})
            }
    
                documentReturn(pageNumber)
        }else if(community){
            count = await db.query("SELECT COUNT(post.community_name) FROM posts WHERE post.community_name = $1;", [community]);
            const postByCommunity = await db.query("SELECT * FROM posts INNER JOIN community ON (posts.community_name = community.community_name) WHERE community = $1 ORDER BY posts.created_on LIMIT 5;", [community]);
            if(postByCommunity.rowCount > 0){
                documentsCount = count.rows[0].count;
                numOfPages = Math.ceil(documentsCount / pageLimit); //e.g there are 10 pages which will be sent to the frontend
                posts = postByCommunity.rows
                res.status(200).json({documentsCount, numOfPages , posts})
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
                res.status(200).json({documentsCount, numOfPages , posts})
            }else{
                res.status(404).json("Post was not found");
            }
       }else{
           console.log("there...")
           count = await db.query("SELECT COUNT(post_id) FROM posts")
           const result = await db.query(`SELECT * FROM posts ORDER BY posts.created_on DESC LIMIT ${pageLimit} `)
           if(result.rowCount > 0){
                documentsCount = count.rows[0].count;
                numOfPages = Math.ceil(documentsCount / pageLimit);
                posts = result.rows
                res.status(200).send({documentsCount, numOfPages , posts})
            }else{
                res.status(404).json("Oops! Posts were not found");
            }
       }

        
    } catch (error) {
        res.status(404).json("Posts not found");
    }
}

const getPinnedPosts = async (req, res) => {
    const username = req.params.username

    const pageLimit = 5;
    // const skipNumber = (pageNumber * pageLimit) - pageLimit;
    let documentsCount;
    let numOfPages;

    try {
           const result = await db.query(`SELECT title, community_name, post_id, created_on FROM posts WHERE $1 = ANY(is_pinned_to_dashboard_array) ORDER BY created_on DESC LIMIT ${pageLimit};`, [username])
           if(result.rowCount > 0){
                documentsCount = result.rows.length;
                numOfPages = Math.ceil(documentsCount / pageLimit);
                let pinnedPosts = result.rows
                res.status(200).send({documentsCount, numOfPages , pinnedPosts})
           }else{
            res.status(404).json("Oops! Pinned posts were not found");

           }           
        
    } catch (error) {
        res.status(404).json("Posts not found");
    }
}



module.exports ={
    getPinnedPosts,
    createPost,
    editPost,
    deletePost,
    getAPost,
    getAllPosts,
}