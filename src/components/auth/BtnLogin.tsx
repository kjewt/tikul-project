import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
    emailState,
    passwordState,
    accountDataState
} from '../../state/atoms';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, collection, CollectionReference } from 'firebase/firestore';
import { firebaseAuth, db } from '../../../firebase';
import Modal from '../common/Modal';

const BtnLogin = (): JSX.Element => {
    const navigate = useNavigate();

    const [email, setEmail] = useRecoilState(emailState);
    const [password, setPassword] = useRecoilState(passwordState);
    const [accountData, setAccountData] = useRecoilState(accountDataState);
    const [isLogin, setIsLogin] = useState(true);
    const [details, setDetails] = useState<CollectionReference>()
    const user = firebaseAuth.currentUser;
    const userRef = user ? doc(db, "users", user.uid) : null; // 예외 처리



    const Login = async () => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            console.log('로그인 성공!');
            setIsLogin(true);
            if (userRef) {

                const accountDoc = await getDoc(userRef);
                const data = accountDoc.data();
                const detail = collection(userRef, 'details');
                if (data) {
                    setAccountData({
                        account: "",
                        accountPassword: "",
                        balance: 0,
                        bankName: "",
                        email: "",
                    });
                }
                setDetails(detail)


                navigate('/Home'); // 회원가입 성공 후 로그인 페이지로 이동
            }
        } catch (error) {
            console.log('로그인 실패', error);
            setIsLogin(false);
        }
    };



    if (user) {
        localStorage.setItem('account', JSON.stringify(accountData));
        localStorage.setItem('uid', JSON.stringify(user.uid));
        console.log(accountData)
        console.log('저장성공!')
    }
    console.log('btnLogin useEffect 실행됨!');

    console.log(isLogin);



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
