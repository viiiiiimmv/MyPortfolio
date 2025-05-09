import React from "react";
import "../assets/css/Stats.css";

const Stats = () => {
    return (
        <div className="hero-container">
            <h1 className="hero-title">
                Fueled by code, coffee, and a passion for photography.<br />
                Building experiences that connect and inspire.
            </h1>
            <hr className="hero-divider" />

            <div className="grid-container">
                <div className="grid-item stealthy-shutter">
                    <p>STEALTHY SHUTTER<br />POSTS</p>
                </div>
                <div className="grid-item linkedin-posts">
                    <i className="fab fa-linkedin"></i>
                    <p>LINKEDIN POSTS<br />GO HERE</p>
                </div>
                <div className="grid-item caffeine-quote">
                    "98% caffeinated, 2% still sleepy."
                </div>
                <div className="grid-item leetcode-stats">
                    <i className="fas fa-code"></i>
                    <p>LEETCODE STATS<br />GO HERE</p>
                </div>
                <div className="grid-item check-cv">
                    <button>CHECK<br />OUT<br />MY CV</button>
                </div>
            </div>
        </div>
    );
};

export default Stats;
