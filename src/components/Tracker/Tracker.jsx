import { useEffect, useState } from 'react';
import auth, { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { getFromStorage, saveToStorage } from '../../services/dataBase';

import '../Tracker/tracker.scss';

export default function Tracker() {
    const [meals, setMeals] = useState([]);
    const [mealName, setMealName] = useState('');
    const [mealCalories, setMealCalories] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editCalories, setEditCalories] = useState('');
    const [editName, setEditName] = useState('');

    const profile = getFromStorage('userProfile');
    // const userName = localStorage.getItem('userName');
    const totalMealsCalories = meals.reduce((sum, meal)=> sum + meal.caloriesMeal, 0);

        // useEffect(()=> {
        //     const savedMeals = getFromStorage('meals');
        //     if (savedMeals) {
        //         setMeals(savedMeals)
        //     }
        // }, []);

        useEffect(()=> {
            saveToStorage('meals', meals);
        }, [meals]);

        // console.log(meals);

    if (!profile) {
    return (
        <div className="tracker">
            <h2>Tracker</h2>
            <Link to="/setup">
                <Button text='choose your target'/>
            </Link>
        </div>
    );
};

    function handleAddMeal(e) {
        e.preventDefault();

        if(!mealName || !mealCalories) return;

        const newMeals = {
            id: Date.now(),
            nameMeal: mealName,
            caloriesMeal: Number(mealCalories)
        };

        const updatedMeals = [...meals, newMeals];

        setMeals(updatedMeals);
        setMealName('');
        setMealCalories('');

        const userRef = doc(db, "users", auth.currentUser.uid);

        updateDoc(userRef, {meals: updatedMeals})
            .then(()=> {
                console.log('User meals updated in Firestore')
            })
            .catch((error) => {
                console.error("Error updating user profile: ", error);
            });
    };

    function calcLeftCalories(total, target) {
        return total - target
    };

    function resetEditState() {
        setEditingId(null);
        setEditName('');
        setEditCalories('');
    };

    function deleteMeal(id) {
        const newMeals = meals.filter(meal=> meal.id !== id);
        setMeals(newMeals);
    };

    function editMeal(meal) {
        setEditingId(meal.id);
        setEditCalories(String(meal.caloriesMeal));
        setEditName(meal.nameMeal);
    };

    function editSave() {
        setMeals(prev=> prev.map(item=> (
            item.id === editingId ? {...item, nameMeal: editName, caloriesMeal: Number(editCalories)} : item
        )));

        resetEditState();
    }

    console.log(meals);

    const {activity, age, calories, caloriesTarget, gender, height, weight} = profile;

    return(
        <section className="tracker">
            <h2>Tracker</h2>
            <div className="tracker__box">
                    <div className="tracker__profile">
                        <h3>your personal data</h3>
                        {/* <p>{userName}</p> */}
                        <p>Gender: {gender === 'male' ? 'man' : 'woman'}</p>
                        <p>{age} years</p>
                        <p>{weight} kg</p>
                        <p>{height} sm</p>
                        <p>{activity === 1.2 
                            ? 'minimal' 
                            : 1.375 
                            ? 'small' 
                            : 1.55 
                            ? 'Medium' 
                            : 1.725 
                            ? 'High' 
                            : 1.9 
                            ? 'Very high' 
                            : 'null'}
                        </p>
                        <p>Daily intake <span>{calories}</span> kkal</p>
                        <p>Your target <span>{caloriesTarget}</span> kkal</p>
                </div>
                <div className="tracker__meals">
                    <h4>Enter your meals</h4>
                    <form 
                        className="tracker__meals-form" 
                        action=""
                        onSubmit={handleAddMeal}
                    >
                        <input
                            type="text" 
                            placeholder="meal name"
                            onChange={(e)=> setMealName(e.target.value)}
                            value={mealName}
                        />
                        <input 
                            type="number" 
                            placeholder="calories"
                            onChange={(e)=> setMealCalories(e.target.value)}
                            value={mealCalories}
                        />
                        <Button text="Add to list"/>
                    </form>
                    <ul className="tracker__meals-list">
                        <h4>Your meals</h4>
                        {
                            meals.map((item, id)=> (
                                <li className="tracker__meals-list-item" key={id}>
                                    {
                                        editingId === item.id 
                                            ? (
                                                <div className="tracker__meals-text-box--edit-mode"
                                                    onBlur={(e)=> {
                                                        if (!e.currentTarget.contains(e.relatedTarget)) {
                                                            resetEditState();
                                                        }
                                                    }}
                                                    tabIndex={-1}
                                                >
                                                    <input 
                                                        type='text'
                                                        placeholder={item.nameMeal}
                                                        onChange={e=> setEditName(e.target.value)}
                                                    />
                                                    <input 
                                                        type='number' 
                                                        placeholder={item.caloriesMeal}
                                                        onChange={e=> setEditCalories(e.target.value)}
                                                    />
                                                    <div>
                                                        <button 
                                                            type='button' 
                                                            className='tracker__meals-confirm'
                                                            onClick={editSave}
                                                        >✅</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="tracker__meals-text-box">
                                                        <p>{item.nameMeal}</p>
                                                        <p>{item.caloriesMeal} kkal</p>
                                                    </div>
                                                    <div className="tracker__meals-btns-box">
                                                    <button
                                                        type='button'
                                                        onClick={()=> editMeal(item)}
                                                    >✏️</button>
                                                    <button
                                                        type='button'
                                                        onClick={()=> deleteMeal(item.id)}
                                                    >🗑️</button>
                                                    </div>
                                                </>
                                            )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                    <div className="tracker__meals-summary">
                        <p>Total calories<strong>: {totalMealsCalories}</strong> kkal</p>
                        <p style={{color: totalMealsCalories > profile.caloriesTarget ? '#bc333cff' : 'black'}}>Calories left
                            <strong>:  {calcLeftCalories(profile.caloriesTarget, totalMealsCalories)}</strong> kkal
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};