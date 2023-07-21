import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emailState } from '../state/atoms';
import NavBar from '../components/common/NavBar'
import Banking from '../components/main/Banking';
import Summary from '../components/main/Summary';

const Login = (): JSX.Element => {

    const [email, setEmail] = useRecoilState(emailState);


    console.log(email)
    return (
        <>
            <div className="container min-h-screen">
                <NavBar />
                <div className="flex">
                    <Summary />
                    <Banking />
                </div>
            </div>
        </>
    );
};

export default Login;
