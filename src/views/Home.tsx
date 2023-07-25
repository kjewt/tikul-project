import React from 'react';
import { useRecoilState } from 'recoil';
import { isBankingState } from '../state/atoms';
import NavBar from '../components/common/NavBar';
import Banking from '../components/main/Banking';
import Transfer from '../components/main/Transfer';
import Summary from '../components/main/Summary';
import AddMoney from '../components/main/AddMoney';

const Home = (): JSX.Element => {
    const [isBanking, setIsBanking] = useRecoilState(isBankingState);

    return (
        <>
            <div className="container min-h-screen">
                <NavBar />
                <div className="flex">
                    <Summary />
                    {isBanking == 0 ? <Banking /> : isBanking == 1 ? <Transfer /> : <AddMoney />}


                </div>
            </div>
        </>
    );
};

export default Home;
