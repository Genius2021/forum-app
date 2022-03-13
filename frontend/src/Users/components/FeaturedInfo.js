import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {Typography} from "@mui/material";
import "./FeaturedInfo.css";

function FeaturedInfo() {
    return (
        <div className="featured__info">
            <div className="featured__item">
                <span className="featured__title">Reputation</span>
                <div className="featuredMoney__container">
                    <span className="featuredMoney">0</span>
                    <span className="featuredMoney__rate">-5.5 <ArrowDownward className="featuredMoney__icon__down" /></span>
                </div>
                {/* <span className="featuredSubtitle">Compared to last month</span> */}
            </div>
            <div className="featured__item">
                <span className="featured__title">Integrity</span>
                <div className="featuredMoney__container">
                    <span className="featuredMoney">0</span>
                    <span className="featuredMoney__rate">-0.5 <ArrowDownward className="featuredMoney__icon__down"/></span>
                </div>
                {/* <span className="featuredSubtitle">Compared to last month</span> */}
            </div>
            <div className="featured__item">
                <span className="featured__title">Badge collection</span>
                <div className="featuredMoney__container">
                    {/* <span className="featuredMoney">$5,300</span>
                    <span className="featuredMoney__rate">+1.2 <ArrowUpward className="featuredMoney__icon__up" /></span> */}
                     <Typography sx={{fontSize:"2rem", margin:"0.2rem", marginLeft:"0.5rem"}}>
                        <span style={{color:"#ffd700", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                        <span style={{color:"#c0c0c0", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                        <span style={{color:"#cd7f32"}}><i className="fas fa-medal"></i></span>
                    </Typography>
                </div>
                {/* <span className="featuredSubtitle">Compared to last month</span> */}
            </div>
        </div>
    )
}

export default FeaturedInfo
