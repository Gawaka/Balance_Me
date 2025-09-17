import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import '../Home/home.scss';

export default function Home() {
    return(
        <div className="home-page">
            <h1>Balance Me</h1>
            <div className="home-page__content">
                <h2>Контролюй, слідкуй, балансуй</h2>
            </div>
            {/* <div className="home-page__login-box">
                <Link to="/login"><Button text="Sign In"></Button></Link>
                <Link to="/register"><Button text="Sign Up"></Button></Link>
            </div> */}
        </div>
    )
}