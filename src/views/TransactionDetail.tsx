import React from 'react';
import { Link } from 'react-router-dom'
import NavBar from '../components/common/NavBar';
import TransferList from '../components/main/TransferList';
// import { useRecoilState } from 'recoil';
// import { isBankingState } from '../state/atoms';
// import NavBar from '../components/common/NavBar';
// import Banking from '../components/main/Banking';
// import Transfer from '../components/main/Transfer';
// import Summary from '../components/main/Summary';
// import AddMoney from '../components/main/AddMoney';

const TransactionDetail = (): JSX.Element => {

    return (
        <>
            <div className="container min-h-screen">
                <NavBar />
                {/* <Link to="/home">
                    <button className="link link-primary p-2">뒤로 돌아가기</button>
                </Link> */}
                <div className="flex">

                    <div className="card-body w-full">
                        <div className="flex flex-col">
                            <span className="text-center p-4">거래 내역 자세히보기</span>
                            <div className="card w-full shadow-2xl bg-base-100">
                                <div className="card-body w-full">
                                    <TransferList />


                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default TransactionDetail;
