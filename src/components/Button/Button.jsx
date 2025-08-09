import '../Button/button.scss';

export default function Button({text, className="", onClick}) {
    return (
        <button 
            className={`button ${className}`} 
            onClick={onClick}
        >
            {text}
        </button>
    )
}