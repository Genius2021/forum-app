import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
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
                <span className="featuredSubtitle">Compared to last month</span>
            </div>
            <div className="featured__item">
                <span className="featured__title">Integrity</span>
                <div className="featuredMoney__container">
                    <span className="featuredMoney">0</span>
                    <span className="featuredMoney__rate">-0.5 <ArrowDownward className="featuredMoney__icon__down"/></span>
                </div>
                <span className="featuredSubtitle">Compared to last month</span>
            </div>
            <div className="featured__item">
                <span className="featured__title">Cost</span>
                <div className="featuredMoney__container">
                    <span className="featuredMoney">$5,300</span>
                    <span className="featuredMoney__rate">+1.2 <ArrowUpward className="featuredMoney__icon__up" /></span>
                </div>
                <span className="featuredSubtitle">Compared to last month</span>
            </div>
        </div>
    )
}

export default FeaturedInfo
