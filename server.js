const express = require("express");
const { db } = require("./db.js");
const dotenv = require("dotenv");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink)
const app = express();
// const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js")
const postRoutes = require("./routes/postRoutes.js")
const communityRoutes = require("./routes/communityRoutes.js")
const multer = require("multer");
const path = require("path");

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

dotenv.config();

db.connect().then(() => console.log("Database connected successfully"))
.catch(error => console.log(error));

const storage = multer.diskStorage({
    //    destination:(req, file, callback function to handle error)
    destination: (req, file, cb) => {
          cb(null, "images");
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "gif"){
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error("Allowed file types are .png, .jpg, .jpeg and .gif"));
        }
    }
})

app.post("/api/photos/upload", upload.array("files", 15), (req, res) => {
    console.log(req.files, "at the ...")
    res.status(200).json({message: "File has been uploaded", thedata: req.files});
})

app.delete("/api/photos/upload",  (req, res) => {
    req.body.picture.forEach(async (x)=>{
        await unlinkAsync(`images/${x}`);
        console.log("file has been deleted successfully!")
    })
    res.status(200).json({message: "File has been deleted"});
})

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/:community/posts", communityRoutes);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("frontend/build"));
// }

// app.get("*", (req, res) =>{
//     res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
// })


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running...");
});