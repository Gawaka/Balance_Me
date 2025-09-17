import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase";
import LoginForm from "../../components/LoginForm/LoginForm";

import "../Register/register.scss";

export default function Register() {
    const [error, setError] = useState(null);

    function onRegister(email, password, confirmPassword) {
        if (password !== confirmPassword) {
            setError(alert("Passwords do not match"));
            return
        };

        createUserWithEmailAndPassword(auth, email, password)
            .then((user)=> {
                console.log(user.user);
                console.log('Registered');
            })
            .catch(error=> {
                setError('Error');
            })
    };

    return(
        <div className="register-page">
            <h2>Register</h2>
            <LoginForm 
                mode="register" 
                buttonText="Register" 
                handleSubmit={onRegister} 
                typeButton="submit"
            />
        </div>
    )
}