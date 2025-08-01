import { useState } from 'react';
import '../UserForm/userForm.scss';

export default function UserForm() {
    const [error, setError] = useState(false);
    const [gender, setGender] = useState('');
    const [activity, setActivity] = useState('');
    const [calories, setCalories] = useState('');
    const [formData, setFormData] = useState({
        age: '',
        weight: '',
        height: '',
    });

    let bmr;

    function handleSubmit(e) {
        e.preventDefault();
        const {weight, height, age} = formData;
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

        // localStorage.setItem
    }

    return(
        <section className="user-form">
            <form 
                action="" 
                className="user-form__form"
                onSubmit={handleSubmit}
            >
                <h3 style={{
                        display: !error ? 'none' : 'block',
                        color: 'red',
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
                <button>Сalculate calories</button>
            </form>
            <div className="user-form__result-block">
                <h3 className="user-form__result">
                    Your daily calories: <strong>{calories !== '' ? calories : '___'}</strong> kkal
                </h3>
            </div>
        </section>
    )
}