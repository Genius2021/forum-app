const Post = require("../models/PostModel");


const createPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
}


const editPost = async (req, res) => {

    try{
      const post = await Post.findById(req.params.id);
      if(post.author === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, {new: true});
    
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
      const post = await Post.findById(req.params.id);
      if(post.author === req.body.username){
         try{
            await post.delete();
             res.status(200).json("Post has been deleted");
         }catch(err){
             res.status(500).json(err)
          }
     }else{
        res.status(401).json("You can delete only your own posts!");
     }
          
     }catch(err){
         res.status(500).json(err)
     }
 }

 const getAPost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json("Post not found");
    }
}

const getAllPosts = async (req, res) => {
    const author = req.query.author;
    const title = req.query.title;
    const community = req.query.community;
    const pageNumber = req.query.page;
    console.log(req.query)

    try {
       if(author){
            //the query immediately is not correct
            //    const posts = await Post.find({}).populate("username").where("username").equals(username).sort({ createdAt: -1 });
            const posts = await Post.aggregate([
                //the from foreign collection, the local field of "input collection", the foreign field of output collection, then alias
                { "$lookup": { "from" : "users", "localField": "author", "foreignField": "_id", "as": "author" }},
                // { "$project" : { "username" : { "$filter" : { "input": "$username", "as": "username", "cond": { "$eq": ["username.username", username]}}}}},
                { "$match": { "author.username": author, }},
                { "$sort": { "createdAt": -1 }},
            ])

            res.status(200).json({ posts })
       }

       if(community){
            const posts = await Post.find({ community }).populate("username").sort({ createdAt: -1 });
            res.status(200).json({ posts })
       }
        
       if(title){
            const posts = await Post.find({}).populate("username").where("title").equals(title).sort({ createdAt: -1 });
            //the query although correct, does not populate the username field
            // const posts = await Post.find({ title: { $in: [title] } });
            res.status(200).json({ posts })
       }
    
            // const nextPosts = posts._id > lastPostId;
            // while(posts.hasNext()){
            //      res.json(posts.next());

            //     if(!posts.hasNext()){
            //         lastPostId = posts[pageSize.length - 1]._id
            //     }
            // }
            // const pageNumber = 2;

            async function documentReturn( pageNumber=1 ){
                const pageLimit = 3;
                // const skipNumber = 2;
                const skipNumber = (pageNumber * pageLimit) - pageLimit;
                const documentsCount = await Post.find({}).count(); 
                //fetches all documents, populates username field, sorts in descending order, limits to 5 per page and skips documents based on page number;
                const posts = await Post.find({}).populate("author").sort({ createdAt: -1 }).limit(pageLimit).skip(skipNumber);
                const numOfPosts = documentsCount / pageLimit;  //e.g there are 10 pages which will be sent to the frontend
                const numOfPages = Math.ceil(numOfPosts)
                res.status(200).json({documentsCount, numOfPages , posts})
            }

            documentReturn(pageNumber)
    } catch (error) {
        res.status(404).json("Posts not found");
    }
}



module.exports ={
    createPost,
    editPost,
    deletePost,
    getAPost,
    getAllPosts,
}