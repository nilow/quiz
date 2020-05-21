import React, {useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const Login = () => {
    const [formValues, setformValues] = useState({login:'', password:''});
    const [passError, setpassError] = useState(false);
    const history = useHistory();

    const handleChange= (event) => {
        const { target } = event;
        const { name, value } = target;
        event.persist();
        setformValues({ ...formValues, [name]: value });
        //console.log(formValues);
    }

    const handleLogin= (event) => {
        event.preventDefault();
        axios.post('http://backquiz.nilow13.usermd.net/api/user/signin', {email: formValues.login, password: formValues.password})
        .then(response => {
          
            if(response.status === 200){
            const token = response.data.token;
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace("-","+").replace("_","/");
            const decoded = JSON.parse(window.atob(base64));
            //console.log(decoded);
            const date = new Date(0); 
            const utc = date.setUTCSeconds(decoded.exp);
            //const date = decoded.exp; 
            localStorage.setItem('token', token);
            localStorage.setItem('expiration', utc);
            history.push("/quizes");
          }
          
        })
        .catch(e => {
            setpassError(true);
        });
    }

    return (
        <div className="app login">
            <form>
                <h1>Logowanie</h1>
                {passError && <span className="error">Nieprawidłowe dane logowania</span>}
                <input type="text" onChange={handleChange} name="login" value={formValues.login} placeholder="Login"></input>
                <input type="password" onChange={handleChange} name="password" value={formValues.password} placeholder="Hasło"></input>
                <button onClick={handleLogin} className="" disabled={formValues.login==='' ||formValues.password===''}>Zaloguj się</button>
            </form>
            nilow123@gmail.com<br />
            test
        </div>
    )

}

export default Login;