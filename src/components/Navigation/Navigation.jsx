import React from "react";
import "tachyons/css/tachyons.min.css";

const Navigation = ({onRouteChange, isSignedIn}) => {
        if (isSignedIn) {
            return (   //if we click on signout, it will go to signin/register
                <nav style={{display: "flex", justifyContent: "flex-end"}}>
                    <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                </nav>
            );
        } else {
            return (   //if we click on signin, it will go to signin and if we click on register, it will go to register.
                <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>  
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>);
        }
    }

    export default Navigation;  
