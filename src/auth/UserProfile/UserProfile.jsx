import { signOut } from "firebase/auth";
import auth from "../../firebase";
import Button from '../../components/Button/Button';
import '../UserProfile/userProfile.scss';

export default function UserProfile() {

    function handleLogOut() {
        signOut(auth)
            .then(user=> console.log('user is Log Out'))
            .catch(error=> console.log('error'))
    }

    return(
        <section className="profile-card">
            <div className="profile-card__wrapper">
                <h2 className="profile__card-title">Profile</h2>
                <div className="profile-card__user-info-box">
                    <div className="profile-card__avatar-box">
                        <img className="profile-card__avatar" src="/" alt="user avatar" />
                    </div>
                    <h3 className="profile-card__name">name</h3>
                    <ul>
                        <li className="profile-card__info-item">Вік</li>
                        <li className="profile-card__info-item">Вага</li>
                        <li className="profile-card__info-item">Зріст</li>
                        <li className="profile-card__info-item">Калораж</li>
                    </ul>
                    <div className="profile-card__user-target">
                        
                    </div>
                </div>
                <Button 
                    text="Log out" 
                    type="submit"
                    className="log-out"
                    onClick={handleLogOut}
                />
            </div>
        </section>
    )
};