import avatar from '../../img/avatar.png';
import '../AvatarPlaceholder/avatarPlaceholder.scss';

export function AvatarPlaceholder({className=""}) {

    return(
        <>
            <div className={`avatar-box ${className}`}>
                <img className={`avatar ${className}`} src={avatar} alt="user avatar" />
            </div>
        </>
    )
};