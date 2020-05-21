import React from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Navigation = (props) => {

    const history = useHistory();

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');

    }

    return (
        <div className="admin-navigation">
            <div className="links-box">
                <Link to={"/quizes"} className="admin-navigation-link">Wszystkie quizy</Link>
                <Link to={"/"} className="admin-navigation-link">Aktywny quiz</Link>
            </div>
            <div className="links-box">    
                <button className="admin-navigation-link" onClick={handleLogout}>Wyloguj się</button>
            </div>
        </div>
    )

}

export default Navigation;