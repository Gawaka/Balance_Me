import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { getFromStorage, saveToStorage } from '../../services/dataBase';

import '../Tracker/tracker.scss';

export default function Tracker() {
    const [userProfile, setUserProfile] = useState(null);
    const [meals, setMeals] = useState([]);
    const [mealName, setMealName] = useState('');
    const [mealCalories, setMealCalories] = useState('');

    const profile = getFromStorage('userProfile');
    const {activity, age, calories, caloriesTarget, gender, height, weight} = profile;
    const totalMealsCalories = meals.reduce((sum, meal)=> sum + meal.caloriesMeal, 0);

        useEffect(()=> {
            const savedMeals = getFromStorage('meals');
            if (savedMeals) {
                setMeals(savedMeals)
            }
        }, []);

        useEffect(()=> {
            saveToStorage('meals', meals);
        }, [meals]);

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
        saveToStorage('meals', updatedMeals);

        setMealName('');
        setMealCalories('');
    };

    function calcLeftCalories(total, target) {
        return total - target
    };

    function deleteMeal(id) {
        const newMeals = meals.filter(meal=> meal.id !== id);
        setMeals(newMeals);
        saveToStorage('meals', newMeals);
    };

    return(
        <section className="tracker">
            <h2>Tracker</h2>
            <div className="tracker__box">
                    <div className="tracker__profile">
                        <h3>your personal data</h3>
                        <p>Gender: {gender === 'male' ? 'man' : 'woman'}</p>
                        <p>{age}</p>
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
                                <li className="tracker__meals-list-item" key={item.id}>
                                    <div className="tracker__meals-text-box">
                                        <p>{item.nameMeal}</p>
                                        <p>{item.caloriesMeal} kkal</p>
                                    </div>
                                    <div className="tracker__meals-btns-box">
                                        <button>✏️</button>
                                        <button onClick={()=> deleteMeal(item.id)}>🗑️</button>
                                    </div>
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