import { useState } from 'react';
import auth, { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { saveToStorage, getFromStorage, usersProfiles } from '../../services/dataBase';
import Button from '../Button/Button';
import '../../services/dataBase';
import '../UserForm/userForm.scss';

export default function UserForm() {
    const [error, setError] = useState(false);
    const [gender, setGender] = useState('');
    const [activity, setActivity] = useState('');
    const [calories, setCalories] = useState('');
    const [userTarget, setUserTarget] = useState('');
    const [formData, setFormData] = useState({
        age: '',
        weight: '',
        height: '',
        activity: ''
    });
    let bmr;

    function handleSubmit(e) {
        e.preventDefault();
        const {weight, height, age} = formData;
        const userCalories = Number(calories);
        const userCaloriesTarget = Number(userTarget);
        const weightNum = Number(weight);
        const heightNum = Number(height);
        const ageNum = Number(age);
        const activityNum = Number(activity);

        console.log(formData, gender, activity);

        if (!weight || !height || !age || !gender || !activity) {
            setError(true);
            return
        } else if (gender === 'male') {
            bmr = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity);
            setError(false);
        } else {
            bmr = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity);
            setError(false);
        }
        
        setCalories(bmr);
        
        const userProfile = {
            gender: gender,
            age: ageNum,
            weight: weightNum,
            height: heightNum,
            activity: activityNum,
            calories: bmr,
            caloriesTarget: userCaloriesTarget
        };
        console.log(userProfile);
        
        saveToStorage('userProfile', userProfile);

        const userRef = doc(db, "users", auth.currentUser.uid);

        updateDoc(userRef, userProfile)
            .then(()=> {
                console.log("User profile updated in Firestore");
            })
            .catch((error)=> {
                setError(console.log("Error updating user profile: ", error));
            })
    };

    function targetCalories(target) {
        if(!calories) return;
        
        const userTarget = Math.round(calories * target);
        setUserTarget(userTarget);

        const profile = getFromStorage('userProfile');
        if(profile) {
            const updateProfile = {...profile, caloriesTarget: userTarget};
            saveToStorage('userProfile', updateProfile);
        }
    };

    return(
        <section className="user-form">
            <form 
                action="" 
                className="user-form__form"
                onSubmit={handleSubmit}
            >
                <h3 style={{
                        display: !error ? 'none' : 'block',
                        color: '#bc333cff',
                        textAlign: 'center',
                        fontSize: '20px'
                }}>
                    There are empty fields!
                </h3>
                <input 
                    type="number" 
                    placeholder="your age" 
                    value={formData.age}                                                          // // показую що в полі
                    onChange={(e)=> setFormData({...formData, age: e.target.value})}              // // оновлюю стан
                />
                <input 
                    type="number" 
                    placeholder="your weight(kg)" 
                    value={formData.weight}
                    onChange={(e)=> setFormData({...formData, weight: e.target.value})}
                />
                <input 
                    type="number" 
                    placeholder="your height(sm)" 
                    value={formData.height}
                    onChange={(e)=> setFormData({...formData, height: e.target.value})}
                />
                <select 
                    className="user-form__select-gender" 
                    name="gender" 
                    id=""
                    onChange={(e)=> setGender(e.target.value)}
                >
                    <option value="">Обери стать</option>
                    <option value="male">Man</option>
                    <option value="female">Woman</option>
                </select>
                <select
                    name="activity"
                    id=""
                    onChange={(e)=> setActivity(e.target.value)}
                >
                    <option value="">Обери активність</option>
                    <option value="1.2">Minimal</option>
                    <option value="1.375">Small</option>
                    <option value="1.55">Medium</option>
                    <option value="1.725">High</option>
                    <option value="1.9">Very high</option>
                </select>
                <Button text='Daily intake' className="user-form__btn"/>
                <div className="user-form__result-block">
                    <h3 className="user-form__result">
                        Your daily calories: <strong>{calories !== '' ? calories : '___'}</strong> kkal
                    </h3>
                </div>
            </form>
            <div className="user-form__target-calories-box">
                <h3 className="user-form__target-calories-title">Get your target calories</h3>
                    <div className="user-form__btns-box">
                        <Button 
                            text='Calc deficit' 
                            className="user-form__btn-target"
                            onClick={()=> targetCalories(0.8)}
                        />
                        <Button 
                            text='Calc surplus' 
                            className="user-form__btn-target"
                            onClick={()=> targetCalories(1.2)}
                        />
                    </div>
                <p className="user-form__target-calories-result">
                    {!userTarget ? 'Calculate your calories' : <>Your target: <strong>{userTarget}</strong> kkal</>}
                </p>
            </div>
        </section>
    )
}