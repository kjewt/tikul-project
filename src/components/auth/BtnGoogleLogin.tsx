import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emailState, passwordState, accountDataState } from '../../state/atoms';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseAuth, db } from '../../../firebase';

import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

const BtnGoogleLogin = (): JSX.Element => {
    const navigate = useNavigate();

    const [email, setEmail] = useRecoilState(emailState);
    const [password, setPassword] = useRecoilState(passwordState);
    const [accountData, setAccountData] = useRecoilState(accountDataState)

    const provider = new GoogleAuthProvider();

    const Login = async () => {
        try {
            const result = await signInWithPopup(firebaseAuth, provider);
            const user = result.user;

            if (user) {
                const userData = {
                    email: user.email,
                };
                const userRef = doc(db, "users", user.uid);

                // 사용자 정보를 Firestore에 저장
                await setDoc(userRef, userData, { merge: true });

                // 데이터를 가져와서 bankName이 있는지 확인
                const accountDoc = await getDoc(userRef);
                const data = accountDoc.data();
                setAccountData(data);

                if (!data.bankName) {
                    // bankName이 없는 경우, 추가 정보 입력 페이지로 이동
                    navigate('/add');
                } else {
                    // bankName이 있는 경우, Home 페이지로 이동
                    navigate('/Home');
                }
            }

            setEmail(user.email);
            console.log('로그인 성공!');
            console.log('사용자 이메일:', user.email);
            console.log('사용자 이름:', user.displayName);

            // 구글 로그인의 결과로 받아온 사용자 정보를 세션 스토리지에 저장
            sessionStorage.setItem('user', JSON.stringify({
                email: user.email,
                displayName: user.displayName,
                user: user.uid
            }));
        } catch (error) {
            alert('로그인에 실패했습니다.', error);
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
