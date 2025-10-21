import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import '../Header/header.scss';

export default function Header() {
    return (
        <div className="header">
            <div className="header__wrapper">
                <nav className="header__nav">
                    <ul className="header__nav-items">
                        <li className="header__nav-item"><Link to="/">Головна</Link></li>
                        <li className="header__nav-item"><Link to="/setup">Налаштування</Link></li>
                        <li className="header__nav-item"><Link to="/tracker">Трекер</Link></li>
                        <li className="header__nav-item"><Link to="/userProfile">Профіль</Link></li>
                        <Link to="/login"><Button text="Sign In"></Button></Link>
                        <Link to="/register"><Button text="Sign Up"></Button></Link>
                    </ul>
                </nav>
            </div>
        </div>
    )
}