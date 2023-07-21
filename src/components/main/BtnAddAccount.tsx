import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { firebaseAuth, firebaseApp } from '../../../firebase';
import { doc, setDoc, collection, getFirestore } from 'firebase/firestore';
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
    //이 계정에 계좌가 생성되었는지를 알려주는 변수 수정필요 !
    const isRegiste = true

    const checkList = [isEmail, isSamePassport, isAccount, Boolean(bankName), isSameAccount];
    const isAllTrue = checkList.every((value) => value);

    const db = getFirestore(firebaseApp)

    // 지울 영역
    useEffect(() => {
        console.log(account, bankName, accountPassword);
    }, [account, bankName, accountPassword]);

    const Register = async () => {
        try {
            const user = firebaseAuth.currentUser;
            console.log(user)
            console.log(db)
            if (user) {
                const userData = {
                    email: email,
                    account: account,
                    bankName: bankName,
                    accountPassword: accountPassword,
                    balance: 0,
                    details: {},
                };
                console.log(userData)
                const userCollectionRef = collection(db, "users");
                const userDocRef = doc(userCollectionRef, user.uid);
                await setDoc(userDocRef, userData);

                console.log('등록완료');
            }
        } catch (error) {
            console.log('등록 실패', error);
        }
    };

    return (
        <>
            <div className="form-control my-6">
                <Link to="/home"><button
                    className={`btn btn-primary w-full ${isAllTrue ? '' : 'btn-disabled'}`}
                    onClick={Register}>
                    등록하기
                </button>
                </Link>
            </div>
        </>
    );
};

export default BtnAddAccount;
