import { useState } from "react";
import Button from "../Button/Button";

import "../LoginForm/loginForm.scss";

export default function LoginForm({mode, handleSubmit, buttonText, typeButton}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const clearForm = ()=> {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setUserName('');
            setError(null);
    };

    return(
        <form className="login-form" onSubmit={(e)=> {
            e.preventDefault();
            console.log("FORM SUBMIT CLICKED", {email, password, confirmPassword});
            handleSubmit(email, password, confirmPassword, userName);
            clearForm();
        }}>
            {
                mode === 'register' ?
                    <input type="text" 
                        placeholder="your name"
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
                    /> :
                null
            }
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