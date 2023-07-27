import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accountDataState } from '../state/atoms';

import DropDown from '../components/common/Dropdown';
import Account from '../components/auth/Account';
import AccountPasswordCheck from '../components/auth/AccountPasswordCheck'
import BtnAddAcount from '../components/main/BtnAddAccount';

const Join = (): JSX.Element => {
    const [accountData, setAccountData] = useRecoilState(accountDataState);
    return (
        <>
            <div className="container min-h-screen">
                <div className="flex flex-col items-center">
                    <span>이메일</span>
                    <span>{accountData.email}</span>
                    <div className="text-center">
                        <Link to="/home">
                            <h1 className="text-5xl font-bold">Tikul</h1>
                        </Link>
                        <p className="py-3 mt-8">계좌등록</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            {/* 계좌 입력 */}
                            <Account />
                            {/* 은행선택 드롭다운 */}
                            <DropDown transfer={false} />
                            <AccountPasswordCheck />
                            {/* 회원가입하기 버튼*/}
                            <BtnAddAcount />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Join;
