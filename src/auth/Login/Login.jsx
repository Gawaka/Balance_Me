import { useState } from "react";
import auth from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import LoginForm from "../../components/LoginForm/LoginForm";

import "../Login/login.scss";

export default function Login() {
    const [error, setError] = useState(null);

    function onLogin(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((user)=> {
                console.log('User is logined');
                console.log(user.user);
                setError(null);
            })
            .catch((error)=> {
                console.log(error);
                setError("vsio, pizda! Couldn't find your account!")
            })
    }

    return(
        <div className="login-page">
            <h2>Login</h2>
            <LoginForm 
                mode="login" 
                buttonText="Register" 
                handleSubmit={onLogin} 
                typeButton="submit"
            />
        </div>
    )
};