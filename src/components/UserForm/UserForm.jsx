import { useState } from 'react';
import '../UserForm/userForm.scss';

export default function UserForm() {
    const [gender, setGender] = useState(null);
    const [activity, setActivity] = useState(null);
    const [formData, setFormData] = useState({
        age: '',
        weight: '',
        height: '',
    });

    return(
        <section className="user-form">
            <form action="" className="user-form__form">
                <input 
                    type="text" 
                    placeholder="your age" 
                    value={formData.age}                                                          // // показую що в полі
                    onChange={(e)=> setFormData({...formData, age: e.target.value})}              // // оновлюю стан
                />
                <input 
                    type="text" 
                    placeholder="your weight(kg)" 
                    value={formData.weight}
                    onChange={(e)=> setFormData({...formData, weigth: e.target.value})}
                />
                <input 
                    type="text" 
                    placeholder="your height(sm)" 
                    value={formData.height}
                    onChange={(e)=> setFormData({...formData, height: e.target.value})}
                />
                <select className="user-form__select-gender" name="gender" id="">
                    <option value="male">Man</option>
                    <option value="female">Woman</option>
                </select>
                <select name="activity" id="">
                    <option value="1.2">Minimal</option>
                    <option value="1.375">Small</option>
                    <option value="1.55">Medium</option>
                    <option value="1.725">High</option>
                    <option value="1.9">Very high</option>
                </select>
                <button>Сalculate calories</button>
            </form>
        </section>
    )
}