import {ReactComponent as Logo} from '../../components/logo.svg';
import React, { useEffect } from 'react';
import Navbar from '../../components/navbar';
import {ReactComponent as Text1} from '../../components/text1.svg';
import {ReactComponent as Text2} from '../../components/text2.svg';

export default function LandingPage() {
    useEffect(() => {
        document.body.style.backgroundColor = '#222222';
    }, []);
    return (        
        <div>
            <Navbar />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
                <div style={{ fontFamily: "Inter", color: 'white', fontSize: '4rem'}}>
                    <Text1 />
</div>
                <div style={{ fontFamily: "Solid", color: 'white', fontSize: '2rem', marginTop: '1rem'}}>
                    <Text2 />
</div>
                <Logo style={{ width: '100px', height: '100px'}} />
            </div>
        </div>
    );
}

