import { useState } from "react";
import auth from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "../Button/Button";

import "../LoginForm/loginForm.scss";

export default function LoginForm({mode, handleSubmit, buttonText, typeButton}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const clearForm = ()=> {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError(null);
    };

    return(
        <form className="login-form" onSubmit={(e)=> {
            e.preventDefault();
            console.log("FORM SUBMIT CLICKED", {email, password, confirmPassword});
            handleSubmit(email, password, confirmPassword);
            clearForm();
        }}>
            <input 
                type="email" 
                placeholder="email"
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="password"
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}
            />
            {
                mode === 'register' ?
                    <input 
                    type="password" 
                    placeholder="confirm password"
                    value={confirmPassword} 
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                /> :
                null
            }
            <Button type={typeButton} text={buttonText}/>
            {/* <button type="submit">Submit</button> */}
        </form>
    )
}