import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Setup from '../Setup/Setup';
import Tracker from '../Tracker/Tracker';
import '../App/app.scss';

    function App() {
    return (
        <div className="app">
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='setup' element={<Setup/>}/>
                <Route path='tracker' element={<Tracker/>}/>
            </Routes>
        </div>
    );
    }

export default App;
