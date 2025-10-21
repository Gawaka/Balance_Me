import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import auth from '../../firebase';
import { onAuthStateChanged } from "firebase/auth";
import Header from '../Header/Header';
import Login from '../../auth/Login/Login';
import Register from '../../auth/Register/Register';
import UserProfile from '../../auth/UserProfile/UserProfile';
import Home from '../Home/Home';
import Setup from '../Setup/Setup';
import Tracker from '../Tracker/Tracker';
import '../App/app.scss';



    function App() {
        const [currentUser, setCurrentUser] = useState(null);

        useEffect(()=> {
            const unsubscribe = onAuthStateChanged(auth, (user)=> {
                setCurrentUser(user);
            });

            return ()=> unsubscribe();
        }, []);

    return (
        <div className="app">
            <Header/>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/' element={<Home/>}/>
                <Route 
                    path='/userProfile' 
                    element={currentUser ? <UserProfile/> : <Navigate to='/login'/>}
                />
                <Route 
                    path='/setup' 
                    element={currentUser ? <Setup/> : <Navigate to='/login'/>}
                />
                <Route 
                    path='/tracker' 
                    element={currentUser ? <Tracker/> : <Navigate to='/login'/>}/>
            </Routes>
        </div>
    );
    }

export default App;
