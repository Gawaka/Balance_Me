import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Login from '../../auth/Login/Login';
import Register from '../../auth/Register/Register';
import Home from '../Home/Home';
import Setup from '../Setup/Setup';
import Tracker from '../Tracker/Tracker';
import '../App/app.scss';

    function App() {
    return (
        <div className="app">
            <Header/>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='/setup' element={<Setup/>}/>
                <Route path='/tracker' element={<Tracker/>}/>
            </Routes>
        </div>
    );
    }

export default App;
