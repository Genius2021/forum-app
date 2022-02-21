const express = require("express");
const { db } = require("./db.js");
const dotenv = require("dotenv");

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
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
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