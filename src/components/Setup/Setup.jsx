import UserForm from '../UserForm/UserForm';
import '../Setup/setup.scss';

export default function Setup() {
    return(
        <div className="setup">
            <h2>Calculate</h2>
            <UserForm/>
        </div>
    )
}