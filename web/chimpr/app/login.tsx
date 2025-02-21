"use client";

import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import Logo from './components/logo';
import BusinessMonkey from './style/img/businessman.png';
import { useState } from 'react';


export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

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
                            <div className='login-area'>
                                {/* Login */}
                                <p style={{color:'black'}} className='header-text'>Sign In</p>
                                <TextField required id="standard-basic" style={{width: '20vw'}} label="Username" />
                                
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <TextField required id="standard-basic" style={{width: '20vw'}} type={showPassword ? "" : "password"} label="Password" />
                                    <FormControlLabel label="Show Password" control={<Checkbox onChange={() => {setShowPassword(!showPassword)}}/>}/>
                                </div>

                                <Button variant='contained' style={{width: '20vw'}}>Login</Button>
                                
                                {/* Or Sign Up */}
                                <p>Don't have an account?</p> <Button>Sign Up</Button>
                            </div>
                        </div>
                        <div className="login-side">
                            <img src={BusinessMonkey.src}/>
                            <div style={{textAlign: 'center'}}>
                                <p className='header-text'>Welome To The Future of Recruiting</p>
                                <p>We put the fair in career fair</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
}