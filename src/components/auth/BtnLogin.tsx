import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
    emailState,
    passwordState,
} from '../../state/atoms';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../../firebase';
import Modal from '../common/Modal';
import Cookies from 'js-cookie';

const BtnLogin = (): JSX.Element => {
    const navigate = useNavigate();

    const [email, setEmail] = useRecoilState(emailState);
    const [password, setPassword] = useRecoilState(passwordState);
    const [isLogin, setIsLogin] = useState(true);


    const Login = async () => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            console.log('로그인 성공!');
            console.log(firebaseAuth);
            setIsLogin(true);

            // 쿠키에 사용자 정보 저장
            Cookies.set('user', { email });

            navigate('/Home'); // 회원가입 성공 후 로그인 페이지로 이동
        } catch (error) {
            console.log('로그인 실패', error);
            setIsLogin(false);
        }
    };
    console.log(isLogin);
    useEffect(() => {
        if (email) {
            sessionStorage.setItem('user', JSON.stringify({ email }));
        }
    }, []);


    return (
        <>
            {!isLogin && (
                <Modal
                    title="로그인 실패"
                    content="이메일이나 비밀번호가 틀렸습니다."
                />
            )}

            <div className="form-control my-6">
                <button className="btn btn-primary" onClick={Login}>Login</button>
                <label className="label justify-center mt-2">
                    <span className="text-sm mr-2">아직 회원이 아니라면 지금 바로</span>
                    <Link to="join" className="link-hover text-sm text-primary">가입하세요</Link>
                </label>
            </div>
        </>
    );
};

export default BtnLogin;
