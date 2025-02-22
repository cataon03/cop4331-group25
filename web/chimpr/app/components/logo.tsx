import './style/logo.css';
import LogoImg from './style/img/monkey.png'

export default function Logo() {
    return (
        <div className="logo">
            <img src={LogoImg.src}/>
            <p className='logo-text'>ChimpR</p>
        </div>
    );
}