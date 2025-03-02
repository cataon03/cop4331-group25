import { useState } from 'react';
import './style/RecruiterLanding.css';
import RecruiterWelcome from './components/RecruiterWelcome';

export enum RecruiterPageType {
    WELCOME = 0,
    ABOUT   = 1,
    JOBS    = 2,
    EVENTS  = 3
}

export default function RecruiterLanding() {

    const [curPage, setCurPage] = useState(RecruiterPageType.WELCOME);
    switch(curPage) {
        case RecruiterPageType.WELCOME:
            return <RecruiterWelcome setCurPage={setCurPage}/>
        case RecruiterPageType.ABOUT:
            return <></>;
        case RecruiterPageType.JOBS:
            return <></>;
        case RecruiterPageType.EVENTS:
            return <></>;
        default:
            return <></>;
    }
}