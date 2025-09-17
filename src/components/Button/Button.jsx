import '../Button/button.scss';

export default function Button({text, className="", onClick, type}) {
    return (
        <button 
            className={`button ${className}`} 
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    )
}