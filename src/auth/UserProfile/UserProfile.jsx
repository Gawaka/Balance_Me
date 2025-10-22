import { signOut} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import auth, { db } from "../../firebase";
import { useEffect, useState } from "react";
import Button from '../../components/Button/Button';
import avatar from '../../img/avatar.png';
import { AvatarPlaceholder } from "../../components/AvatarPlaceholder/AvatarPlaceholder";
import '../UserProfile/userProfile.scss';

export default function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(false);

    function handleLogOut() {
        signOut(auth)
            .then(user=> console.log('user is Log Out'))
            .catch(error=> console.log('error'))
    };

    useEffect(()=> {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.warn('User is NOT logined!');
            return;
        }

        const userRef = doc(db, 'users', currentUser.uid);

        getDoc(userRef)
            .then((userSnap)=> {
                if (userSnap.exists()) {
                    console.log("Дані користувача:", userSnap.data());
                    setUserData(userSnap.data());
                } else {
                    console.log('Документ юзера не знайдено(');
                }
            })
            .catch((error)=> {
                setError(true);
                console.log('Помилка при отриманні данних юзера!');
            })
    }, []);

    return(
        <section className="profile-card">
            <div className="profile-card__wrapper">
                <h2 className="profile__card-title">Profile</h2>
                {userData ? (
                    <>
                    {/* <div className="profile-card__avatar-box">
                        <img className="profile-card__avatar" src={avatar} alt="user avatar" />
                    </div> */}
                    <AvatarPlaceholder/>
                    <div className="profile-card__user-info-box">
                        <h3 className="profile-card__name">{userData.userName}</h3>
                        <h3 className="profile-card__name">{userData.email}</h3>
                        <ul className="profile-card__info-items">
                            <li className="profile-card__info-item">Вік: {userData.age}</li>
                            <li className="profile-card__info-item">Вага: {userData.weight}</li>
                            <li className="profile-card__info-item">Зріст: {userData.height}</li>
                            <li className="profile-card__info-item">Калорії: {userData.calories}</li>
                        </ul>
                        <div className="profile-card__user-target">
                            
                        </div>
                    </div>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
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