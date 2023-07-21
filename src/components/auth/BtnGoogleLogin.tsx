import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emailState, passwordState } from '../../state/atoms';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseAuth } from '../../../firebase';

const BtnGoogleLogin = (): JSX.Element => {
    const navigate = useNavigate();

    const [email, setEmail] = useRecoilState(emailState);
    const [password, setPassword] = useRecoilState(passwordState);

    const provider = new GoogleAuthProvider();

    const Login = async () => {
        try {
            const result = await signInWithPopup(firebaseAuth, provider);
            const user = result.user;

            setEmail(user.email);
            console.log('로그인 성공!');
            console.log('사용자 이메일:', user.email);
            console.log('사용자 이름:', user.displayName);

            // 구글 로그인의 결과로 받아온 사용자 정보를 세션 스토리지에 저장
            sessionStorage.setItem('user', JSON.stringify({
                email: user.email,
                displayName: user.displayName,
            }));

            navigate('/Home');
        } catch (error) {
            alert('로그인에 실패했습니다.');
        }
    };

    return (
        <>
            <div className="form-control mt-6">
                <button className="btn btn-outline btn-primary" onClick={Login}>
                    <div className="flex items-center">
                        <i className="bx bxl-google text-2xl"></i>
                        <span>구글 아이디로 로그인</span>
                    </div>
                </button>
            </div>
        </>
    );
};

export default BtnGoogleLogin;
