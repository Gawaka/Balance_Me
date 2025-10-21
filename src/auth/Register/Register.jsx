import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore"; 
import auth, { db } from "../../firebase";
import LoginForm from "../../components/LoginForm/LoginForm";
import "../Register/register.scss";

export default function Register() {
    const [error, setError] = useState(null);

    function onRegister(email, password, confirmPassword, userName) {
        if (password !== confirmPassword) {
            setError(alert("Passwords do not match"));
            return
        };

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential)=> {
                const user = userCredential.user;
                console.log('Registered', user.uid);
                setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    userName: userName,
                    weight: null,
                    height: null,
                    age: null,
                    gender: null,
                    meals: []
                })
                .then(()=> {
                    console.log("User document created in Firestore");
                })
                .catch((error)=> {
                    console.error("Error creating user document: ", error);
                })
            })
            .catch(error=> {
                setError("Error registering user");
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
    );
};