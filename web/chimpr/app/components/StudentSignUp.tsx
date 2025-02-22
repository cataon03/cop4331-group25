import './style/student-sign-up.css';

import { Button, TextField } from "@mui/material";
import Logo from "./logo";
import { PageType } from '../MainIsland';
import InputFileUpload from './FileUpload';

export default function StudentSignUp(props) {

    const handleGoBackBtnClick = () => {
        props.setCurPage(PageType.LOGIN);
    }

    return <>
             <div className='student-sign-up'>
                <Logo/>
                <div className='student-info'>
                    <div className="s-i-left">
                        <p className="header-text" style={{color: 'black'}}>Student Sign Up</p>
                        <p>General Information</p>
                        <div className='text-buddies'>
                            <TextField required style={{width: '50%'}} label="First Name"/>
                            <TextField required style={{width: '50%'}} label="Last Name"/>
                        </div>
                        <p>Contact Information</p>
                        <div className='text-buddies'>
                            <TextField required style={{width: '50%'}} label="Email"/>
                            <TextField required style={{width: '50%'}} label="Phone"/>
                        </div>

                        <p>Biography</p>
                        <TextField
                            label="Bio"
                            multiline
                            maxRows={4}
                        />

                        <p>Resume</p>
                        <div className='text-buddies'>
                            <InputFileUpload id={"resume-upload"} text={"Upload Resume"} FileType={"application/pdf"}/>
                        </div>
                        
                        <Button variant='contained' style={{width: '100%'}}>Register</Button>
                    </div>
                    <div className='s-i-right'>
                    </div>
                </div>
                <Button onClick={handleGoBackBtnClick} className='go-back-btn'>Go Back</Button>
             </div>
           </>
}