import React from 'react';
import { Link } from "react-router-dom";
const Navigation = (props) => {

    return (
        <div className="section-navigation">
            <div>
                {props.adminLink && <Link to={"/quizes"} className="section-navigation_button">Logowanie</Link>}&nbsp;
                <button onClick={props.buttonClick} disabled={props.dis} className="section-navigation_button">{props.buttonText}</button>
            </div>
        </div>
    )

}

export default Navigation;