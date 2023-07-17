import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRecoilState } from 'recoil';
import { accountState, emailState, passwordState, accountPasswordState, isCheckedState } from '../state/atoms';

import DropDown from '../components/common/Dropdown';
import EmailCheck from '../components/auth/EmailCheck';
import PasswordCheck from '../components/auth/PasswordCheck';
import Account from '../components/auth/Account';
import AccountPasswordCheck from '../components/auth/AccountPasswordCheck'
import Checkbox from '../components/auth/Checkbox';
import BtnJoin from '../components/auth/BtnJoin';
const Join = (): JSX.Element => {

    return (
        <>
            <div className="container min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <Link to="/">
                            <h1 className="text-5xl font-bold">Tikul</h1>
                        </Link>
                        <p className="py-3 mt-8">회원가입</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <EmailCheck />

                            <PasswordCheck />

                            {/* 나누기 */}
                            <div className="flex items-center justify-around">
                                <hr className="w-full mt-6"></hr>
                            </div>
                            {/* 계좌 입력 */}
                            <Account />
                            {/* 은행선택 드롭다운 */}
                            <DropDown />
                            <AccountPasswordCheck />
                            {/*약관 동의*/}
                            <Checkbox />
                            {/* 회원가입하기 버튼*/}
                            <BtnJoin />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Join;
