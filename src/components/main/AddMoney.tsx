import React from 'react';

import { useRecoilState } from 'recoil';
import { isBankingState, accountDataState } from '../../state/atoms'

import AddMoneyInput from './AddMoneyInput';

const AddMoney = (): JSX.Element => {

    const [accountData, setAccountData] = useRecoilState(accountDataState)
    const [isBanking, setIsBanking] = useRecoilState(isBankingState);


    const handleAddMoneyCancelBtn = () => {
        setIsBanking(0);
    }

    return (
        <div className="container min-h-screen">
            <div className="flex flex-col items-center">
                <div className="text-center">
                    <p className="py-3">충전하기</p>
                </div>

                <div className="card w-96 bg-accent shadow-xl">
                    <div className="m-3 rounded-xl bg-base-100">
                        <button onClick={handleAddMoneyCancelBtn} className="px-4 pt-4 text-sm link-primary underline">이전으로</button>
                        {accountData && (
                            <>
                                <div className="user-account px-4 pt-4 text-sm flex justify-between">
                                    <div>
                                        <span>내 계좌 |</span>
                                        <span className="p-1">{accountData.bankName}</span>
                                        <span className="p-1">{accountData.account}</span>
                                    </div>
                                </div>

                            </>)}
                        <AddMoneyInput />

                    </div>
                </div>

            </div>
        </div>
    );

};

export default AddMoney;
