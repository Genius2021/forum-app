import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';



export default function Advertisement({ general, passedIndex, topRight, bottomRight, topLeft, center, centerLeft, centerTop, centerBottom, TextBackgroundColor, TextColor}) {

    const location = useLocation();
    const community = location.pathname.split("/")[2];


    const topRightstyle ={
        position: "absolute",
        top:0,
        right:0,
        textAlign:"right",
        width:"100%",
        bgColor:`${TextBackgroundColor || "rgba(0, 0, 0, 0.54)"}`,
        color: `${TextColor || "white"}`,
        padding: "0.5rem",
    }

    const bottomRightstyle ={
        position: "absolute",
        bottom:0,
        right:0,
        textAlign:"right",
        width:"100%",
        bgColor:`${TextBackgroundColor || "rgba(0, 0, 0, 0.54)"}`,
        color: `${TextColor || "white"}`,
        padding: "0.5rem",
    }

    const bottomLeftstyle ={
        position: "absolute",
        bottom:0,
        left:0,
        width:"100%",
        bgColor:`${TextBackgroundColor || "rgba(0, 0, 0, 0.54)"}`,
        color: `${TextColor || "white"}`,
        padding: "0.5rem",
    }
    
    const topLeftstyle ={
        position: "absolute",
        top:0,
        left:0,
        width:"100%",
        bgColor:`${TextBackgroundColor || "rgba(0, 0, 0, 0.54)"}`,
        color: `${TextColor || "white"}`,
        padding: "0.5rem",
    }

    const centerStyle = {
        position: "absolute",
        top:"35%",
        textAlign:"center",
        width:"100%",
        bgColor:`${TextBackgroundColor || "rgba(0, 0, 0, 0.54)"}`,
        color: `${TextColor || "white"}`,
        padding: "0.5rem",
    }

    const centerLeftStyle = {
        position: "absolute",
        top:"35%",
        textAlign:"left",
        width:"100%",
        bgColor:`${TextBackgroundColor || "rgba(0, 0, 0, 0.54)"}`,
        color: `${TextColor || "white"}`,
        paddingLeft: "0.2rem",
        paddingTop: "0.5rem",
        paddingRight: 0,
    }

    const centerTopStyle = {
        position: "absolute",
        top: 0,
        textAlign:"center",
        width:"100%",
        bgColor:`${TextBackgroundColor || "rgba(0, 0, 0, 0.54)"}`,
        color: `${TextColor || "white"}`,
        paddingTop: "0.5rem",

    }

    const centerBottomStyle = {
        position: "absolute",
        bottom: 0,
        textAlign:"center",
        width:"100%",
        bgColor:`${TextBackgroundColor || "rgba(0, 0, 0, 0.54)"}`,
        color: `${TextColor || "white"}`,
        paddingTop: "0.5rem",

    }

    const advertArray = [
        {community: "generalAd", images: [{imgId: 1, imgPoster: "/assets/images/GCFR2.jpg", imgHeaderText: "", imgBodyText: "" }, {imgId: 2, imgPoster: "/assets/images/sports1.jpg", imgHeaderText: "", imgBodyText: "" }, {imgId: 3, imgPoster: "/assets/images/love2.jpg", imgHeaderText: "", imgBodyText: "" }, {imgId: 4, imgPoster: "/assets/images/education.jpg", imgHeaderText: "", imgBodyText: "" }, {imgId: 5, imgPoster: "/assets/images/img6.jpg", imgHeaderText: "", imgBodyText: "" }, {imgId: 6, imgPoster: "/assets/images/food3.jpg", imgHeaderText: "", imgBodyText: "" }, {imgId: 7, imgPoster: "/assets/images/business3.jpg", imgHeaderText: "", imgBodyText: "" } , {imgId: 8, imgPoster: "/assets/images/chess.jpg", imgHeaderText: "", imgBodyText: "" }]}, 
        {community: "politics", images: [{imgId: 9, imgPoster: "/assets/images/img2.jpg", imgHeaderText: "", imgBodyText: "" }, {imgId: 10, imgPoster: "/assets/images/GCFR.jpg", imgHeaderText: "", imgBodyText: "" }, {imgId: 11, imgPoster: "/assets/images/Atiku.jpg", imgHeaderText: "", imgBodyText: "" } , {imgId: 12, imgPoster: "/assets/images/GCFR3.jpg", imgHeaderText: "", imgBodyText: "" }]}, 
        {community: "business", images: [{imgId: 13, imgPoster: "/assets/images/business.jpg", imgHeaderText: "",  imgBodyText: ""}, {imgId: 14, imgPoster: "/assets/images/business2.jpg", imgHeaderText: "",  imgBodyText: ""}, {imgId: 15, imgPoster: "/assets/images/business3.jpg", imgHeaderText: "Welcome",  imgBodyText: "Let's do business"}]}, 
        {community: "science-and-tech", images: [{imgId: 16, imgPoster: "/assets/images/science-and-tech.jpg", imgHeaderText: "",  imgBodyText: ""}]}, 
        {community: "sports", images: [{imgId: 17, imgPoster: "/assets/images/chess.jpg", imgHeaderText: "Play Chess!", imgBodyText: "",}, {imgId: 18, imgPoster: "/assets/images/sports.jpg", imgHeaderText: "", imgBodyText: "",}, {imgId: 19, imgPoster: "/assets/images/sports1.jpg", imgHeaderText: "", imgBodyText: ""}]}, 
        {community: "entertainment", images: [{imgId: 20, imgPoster: "/assets/images/img3.jpg", imgHeaderText: "", imgBodyText: "",}]}, 
        {community: "education", images: [{imgId: 21, imgPoster: "/assets/images/education.jpg", imgHeaderText: "", imgBodyText: "",}, {imgId: 22, imgPoster: "/assets/images/education2.jpg", imgHeaderText: "", imgBodyText: "",}]}, 
        {community: "programming", images: [{imgId: 23, imgPoster: "/assets/images/programming.jpg", imgHeaderText: "", imgBodyText: "",}]}, 
        {community: "love", images: [{imgId: 24, imgPoster: "/assets/images/love.jpg", imgHeaderText: "", imgBodyText: "",}, {imgId: 25, imgPoster: "/assets/images/img6.jpg", imgHeaderText: "", imgBodyText: "",}, {imgId: 26, imgPoster: "/assets/images/love2.jpg", imgHeaderText: "", imgBodyText: "",}]}, 
        {community: "food-and-agriculture", images: [{imgId: 27, imgPoster: "/assets/images/food.jpg", imgHeaderText: "", imgBodyText: "",}, {imgId: 28, imgPoster: "/assets/images/food2.jpg", imgHeaderText: "", imgBodyText: "",}, {imgId: 29, imgPoster: "/assets/images/food3.jpg", imgHeaderText: "", imgBodyText: "",}]}, 
        {community: "earth-sustainability", images: [{imgId: 30, imgPoster: "/assets/images/img4.jpg", imgHeaderText: "", imgBodyText: "",}]}, 
        {community: "gaming", images: [{imgId: 31, imgPoster: "/assets/images/gaming.jpg", imgHeaderText: "", imgBodyText: "",}, {imgId: 32, imgPoster:  "/assets/images/gaming2.jpg", imgHeaderText: "", imgBodyText: "",}]}, 
        {community: "culture-and-tradition", images: [{imgId: 33, imgPoster: "/assets/images/img5.jpg", imgHeaderText: "", imgBodyText: "",}]}, 
        {community: "religion", images: [{imgId: 34, imgPoster: "/assets/images/religion.png", imgHeaderText: "", imgBodyText: "",}, {imgId: 35, imgPoster: "/assets/images/cross.jpg", imgHeaderText: "", imgBodyText: "",}, {imgId: 36, imgPoster: "/assets/images/religion2.jpg", imgHeaderText: "", imgBodyText: "",}]}, 
    ]


    return (
        <>
            {
                advertArray.map((data)=>{
                    if(general && data.community === "generalAd"){
                        return data.images.map((img, index)=>{
                            if(index === passedIndex){
                                return <Card key={img.imgId} variant="outlined" sx={{ maxWidth: 350, my: 2, mx:"auto", border: "1px solid rgba(0, 0, 0, 0.12)" }}>
                                        <Box>
                                            <Link to={`/advertisements/${img.imgId}`}>
                                                <div style={{ position: "relative"}}>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"              //Advert specific to the community        //"Otherwise", which is represented as a colon is for general advertisement i.e advert that will show everywhere
                                                    image={ img.imgPoster || "/assets/images/img6.jpg"}
                                                    alt="passport"
                                                    ></CardMedia>
                                                    <Box sx={ (topRight && topRightstyle)
                                                        || (bottomRight && bottomRightstyle)
                                                        || (topLeft && topLeftstyle) 
                                                        || (center && centerStyle) 
                                                        || (centerLeft && centerLeftStyle) 
                                                        || (centerTop && centerTopStyle) 
                                                        || (centerBottom && centerBottomStyle)
                                                        || bottomLeftstyle }> 
                                                        <Typography variant="h5">{img.imgHeaderText}</Typography>
                                                        <Typography variant="body2">{img.imgBodyText}</Typography>
                                                    </Box>
                                                </div>
                                            </Link>
                                        </Box>
                                    </Card>
                            }
                        })

                    }else{
                        return data.community === community && data.images.map((img, index)=>{
                            if(data.images.length === 1){
                                return <Card key={img.imgId} variant="outlined" sx={{ maxWidth: 350, my: 2, mx:"auto",  border: "1px solid rgba(0, 0, 0, 0.12)" }}>
                                <Box>
                                    <Link to={`/advertisements/${img.imgId}`}>
                                        <div style={{ position: "relative"}}>
                                            <CardMedia
                                            component="img"
                                            height="140"              //Advert specific to the community        //"Otherwise", which is represented as a colon is for general advertisement i.e advert that will show everywhere
                                            image={ img.imgPoster || "/assets/images/img6.jpg"}
                                            alt="passport"
                                            ></CardMedia>
                                            <Box sx={ (topRight && topRightstyle)
                                                || (bottomRight && bottomRightstyle)
                                                || (topLeft && topLeftstyle) 
                                                || (center && centerStyle) 
                                                || (centerLeft && centerLeftStyle) 
                                                || (centerTop && centerTopStyle) 
                                                || (centerBottom && centerBottomStyle)
                                                || bottomLeftstyle }> 
                                                <Typography variant="h5">{img.imgHeaderText}</Typography>
                                                <Typography variant="body2">{img.imgBodyText}</Typography>
                                            </Box>
                                        </div>
                                    </Link>
                                </Box>
                            </Card>

                            }

                            if(index === passedIndex){
                                return <Card key={img.imgId} variant="outlined" sx={{ maxWidth: 350, my: 2, mx:"auto",  border: "1px solid rgba(0, 0, 0, 0.12)" }}>
                                <Box>
                                    <Link to={`/advertisements/${img.imgId}`}>
                                        <div style={{ position: "relative"}}>
                                            <CardMedia
                                            component="img"
                                            height="140"              //Advert specific to the community        //"Otherwise", which is represented as a colon is for general advertisement i.e advert that will show everywhere
                                            image={ img.imgPoster || "/assets/images/img6.jpg"}
                                            alt={img.imgId}
                                            ></CardMedia>
                                            <Box sx={ (topRight && topRightstyle)
                                                || (bottomRight && bottomRightstyle)
                                                || (topLeft && topLeftstyle) 
                                                || (center && centerStyle) 
                                                || (centerLeft && centerLeftStyle) 
                                                || (centerTop && centerTopStyle) 
                                                || (centerBottom && centerBottomStyle)
                                                || bottomLeftstyle }> 
                                                <Typography variant="h5">{img.imgHeaderText}</Typography>
                                                <Typography variant="body2">{img.imgBodyText}</Typography>
                                            </Box>
                                        </div>
                                    </Link>
                                </Box>
                            </Card>
                            }
                            
                        })

                    }
                        
                }) 
            }
        </>
      )
}
