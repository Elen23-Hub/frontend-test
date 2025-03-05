import React from "react";
import "tachyons/css/tachyons.min.css";
import Tilt from 'react-parallax-tilt';
import "./Logo.css"; 
import brain from "./brain.png";

const Logo = () => {
    return (
        <div className="ma4 mt0">
           <Tilt>
                <div className="Tilt-inner pa3 br2 shadow-2" style={{ height: '150px', width: '150px' }}>
                    <img src={brain}/>
                </div>
            </Tilt>
        </div>
       
    );
    }

    export default Logo;  
