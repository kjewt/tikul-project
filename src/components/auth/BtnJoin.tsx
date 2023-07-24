import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
    emailState,
    passwordState,
    bankNameState,
    accountState,
    accountPasswordState,
    isEmailState,
    isSamePassportState,
    isAccountState,
    isSameAccountPassportState,
    isCheckedState,
} from '../../state/atoms';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firebaseApp } from '../../../firebase';
import { doc, setDoc, getFirestore } from 'firebase/firestore'

const BtnJoin = (): JSX.Element => {
    const navigate = useNavigate();
    const [isEmail, setIsEmail] = useRecoilState(isEmailState);
    const [isSamePassport, setIsSamePassport] = useRecoilState(isSamePassportState);
    const [isAccount, setIsAccount] = useRecoilState(isAccountState);
    const [bankName, setBankName] = useRecoilState(bankNameState);
    const [isSameAccount, setIsSameAccount] = useRecoilState(isSameAccountPassportState);
    const [isChecked, setIsChecked] = useRecoilState(isCheckedState);

    const [email, setEmail] = useRecoilState(emailState);
    const [password, setPassword] = useRecoilState(passwordState);
    const [account, setAccount] = useRecoilState(accountState);
    const [accountPassword, setAccountPassword] = useRecoilState(accountPasswordState);

    const checkList = [isEmail, isSamePassport, isAccount, Boolean(bankName), isSameAccount, isChecked];
    const isAllTrue = checkList.every((value) => value);

    // 지울 영역

    const db = getFirestore(firebaseApp)

    const Signup = async () => {
        try {
            // Firebase 인증
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
            console.log('회원가입 성공');

            // 사용자 정보 Firestore에 저장
            const user = firebaseAuth.currentUser;
            console.log(user.uid)

            if (user) {
                const userData = {
                    email: email,
                    account: account,
                    bankName: bankName,
                    accountPassword: accountPassword,
                    balance: 0,
                };
                await setDoc(doc(db, "users", user.uid), userData);

                navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
            }
        } catch (error) {
            console.log('회원가입 실패', error);
        }
    };

    return (
        <>
            <div className="form-control my-6">
                <button
                    className={`btn btn-primary ${isAllTrue ? '' : 'btn-disabled'}`}
                    onClick={Signup}>
                    회원가입하기
                </button>
            </div>
        </>
    );
};

export default BtnJoin;
