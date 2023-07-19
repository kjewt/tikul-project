import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emailState } from '../state/atoms';
import NavBar from '../components/common/NavBar'

const Login = (): JSX.Element => {

    const [email, setEmail] = useRecoilState(emailState);

    console.log(email)
    return (
        <>
            <div className="container min-h-screen">
                <NavBar />
            </div>
        </>
    );
};

export default Login;
