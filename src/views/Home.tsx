import React from 'react';
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { isBankingState, accountDataState } from '../state/atoms';
import NavBar from '../components/common/NavBar';
import Banking from '../components/main/Banking';
import Transfer from '../components/main/Transfer';
import Summary from '../components/main/Summary';
import AddMoney from '../components/main/AddMoney';

const Home = (): JSX.Element => {
    const [isBanking, setIsBanking] = useRecoilState(isBankingState);
    const [accountData, setAccountData] = useRecoilState(accountDataState)

    return (
        <>
            <div className="container min-h-screen">
                {accountData ? (
                    <>

                        <NavBar />
                        <div className="flex">
                            <Summary />
                            {isBanking == 0 ? <Banking /> : isBanking == 1 ? <Transfer /> : <AddMoney />}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col p-10 items-center">
                        <span>사용자 정보가 없습니다.</span>
                        <Link to="/login">
                            <button className="btn btn-primary  w-40 text-base-100 m-6">로그인</button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
