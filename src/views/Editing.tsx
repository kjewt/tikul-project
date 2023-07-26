import React from 'react';
import NavBar from '../components/common/NavBar';
// import { useRecoilState } from 'recoil';
// import { isBankingState } from '../state/atoms';
// import NavBar from '../components/common/NavBar';
// import Banking from '../components/main/Banking';
// import Transfer from '../components/main/Transfer';
// import Summary from '../components/main/Summary';
// import AddMoney from '../components/main/AddMoney';

const Editing = (): JSX.Element => {

    return (
        <>
            <div className="container min-h-screen">
                <NavBar />
                <div className="flex">
                    <div className="card-body w-full">
                        <div className="flex flex-col">
                            <span className="text-center">충전 계좌 추가</span>
                            <div className="">

                                <span className="py-3 mt-8">계좌등록</span>
                                <input type="text" className="input" />
                            </div>
                            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <div className="card-body">
                                    {/* 계좌 입력 */}
                                    {/* 은행선택 드롭다운 */}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body w-full">
                        <div className="flex flex-col">
                            <span>충전 계좌 추가</span>
                            <div className="r">

                                <p className="py-3 mt-8">계좌등록</p>
                            </div>
                            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                <div className="card-body">
                                    {/* 계좌 입력 */}
                                    {/* 은행선택 드롭다운 */}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Editing;
