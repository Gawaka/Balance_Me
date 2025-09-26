import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import img from '../../img/content.png';
import '../Home/home.scss';

export default function Home() {
    return(
        <section className="home-page">
            <h2>Home page</h2>
            <div className="home-page__welcome">
                <div className="home-page__welcome-container">
                    <h1 className="home-page__welcome-title">Ласкаво просимо до Balance Me!</h1>
                    <p className="home-page__welcome-subtitle">
                        Тут ти зможеш подбати про себе легко й без зайвого стресу.
                        Веди облік харчування, тренувань та знаходь баланс у щоденному житті.
                    </p>
                    <ul className="home-page__welcome-features">
                        <li className="home-page__welcome-feature">Додавати та контролювати прийоми їжі</li>
                        <li className="home-page__welcome-feature">Стежити за калоріями та поживними елементами</li>
                        <li className="home-page__welcome-feature">Планувати й відмічати тренування</li>
                        <li className="home-page__welcome-feature">Ставити особисті цілі й відслідковувати прогрес</li>
                        <li className="home-page__welcome-feature">Отримувати підказки для здорового способу життя</li>
                    </ul>
                </div>
            </div>
            <div className="home-page__content">
                {/* <h2>Контролюй, слідкуй, балансуй</h2> */}
                <div className="home-page__content-wrapper">
                    <div className="homepage__content-anotation"></div>
                    <h3>Дефіцит калорій</h3>
                    <p>Це єдиний спосіб схуднути, ти споживаєш менше калорій, ніж витрачаєш протягом дня.
                        Організм бере енергію з запасів (жиру), і вага поступово знижується.
                        Не обов'язково відмовлятись від солодкого або жирного, 
                        варто просто контролювати прийоми їжі та не переїдати.
                        Скидати вагу потрібно поступово і без зайвого стрессу для організуму, 
                        тому дефіцит не має превищувати 20% від твоєї денної норми калорій. 
                    </p>
                    <img className="home-page__content-img" src={img} alt="food"/>
                    <h3>Профіцит калорій</h3>
                    <p>Це коли ти споживаєш більше калорій, ніж витрачаєш.
                        Надлишок енергії йде на відновлення, ріст м’язів і збільшення маси.
                        Використовується для набору ваги або м’язів.
                        Тут теж треба бути дуже обережним та не переїдати жирами або вуглеводами,
                        профіцит має бути збалансованим і також не має бути більшим ніж 20% від денної норми калорій 
                        (окрім деяких випадків, наприклад: при тренуваннях високої інтенсивності).
                    </p>
                </div>
            </div>
            {/* <div className="home-page__login-box">
                <Link to="/login"><Button text="Sign In"></Button></Link>
                <Link to="/register"><Button text="Sign Up"></Button></Link>
            </div> */}
        </section>
    )
}