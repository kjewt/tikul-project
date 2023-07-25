import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { firebaseAuth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
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

const BtnAddAccount = (): JSX.Element => {
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

    const isRegiste = true;
    const checkList = [isSamePassport, isAccount, Boolean(bankName)];
    const isAllTrue = checkList.every((value) => value);


    useEffect(() => {
        console.log(account, bankName, accountPassword);
    }, [account, bankName, accountPassword]);

    const Register = async () => {
        try {
            const user = firebaseAuth.currentUser;
            if (user) {
                const userData = {
                    account: account,
                    bankName: bankName,
                    accountPassword: accountPassword,
                    balance: 0,
                };
                const userRef = doc(db, "users", user.uid);
                await setDoc(userRef, userData);

                console.log('등록완료');
            }
        } catch (error) {
            console.log('등록 실패', error);
        }
    };

    return (
        <>
            <div className="form-control my-6">
                <Link to="/home">
                    <button className="btn btn-primary w-full" onClick={Register}>
                        등록하기
                    </button>
                </Link>
            </div>
        </>
    );
};

export default BtnAddAccount;
