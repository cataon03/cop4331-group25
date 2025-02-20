import Logo from './components/logo';
import BusinessMonkey from './style/img/businessman.png';


export default function Login() {
    return <>
                <div className="main">
                    <div className="bg"></div>
                        <div className="bg bg2"></div>
                        <div className="bg bg3"></div>
                        <div className="content">
                    </div>
                    <div className="island">
                        <div className="login-main">
                             <Logo />
                             <h1>Login</h1>
                        </div>
                        <div className="login-side">
                            <p className='header-text'>Welcome!</p>
                            <img src={BusinessMonkey.src}/>
                            <p>New Here?</p>
                            <button>Register</button>
                        </div>
                    </div>
                </div>
            </>
}