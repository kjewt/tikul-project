import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { firebaseAuth, firebaseApp } from '../../../firebase';
import { useRecoilState } from 'recoil';
import { isTransferState, balanceState, accountDataState, bankNameState } from '../../state/atoms'

import TransferInput from './TransferInput';

const Transfer = (): JSX.Element => {
    const db = getFirestore(firebaseApp);
    const [user, setUser] = useState(null);
    const userRef = user ? doc(db, 'user', user.uid) : null;

    const [accountData, setAccountData] = useRecoilState(accountDataState)
    const [bankName, setBankName] = useRecoilState(bankNameState)
    const [balance, setBalance] = useRecoilState(balanceState);
    const [isTransfer, setIsTransfer] = useRecoilState(isTransferState)

    const authStateChanged = (currentUser: any) => {
        setUser(currentUser)
    }
    useEffect(() => {
        // Firebase 인증 상태 변경 이벤트 리스너 등록
        const unsubscribe = firebaseAuth.onAuthStateChanged(authStateChanged);

        return () => {
            // 컴포넌트가 언마운트 될 때 이벤트 리스너 해제
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!userRef) return; // If userRef is null, return early without fetching data

        const fetchAccountData = async () => {
            try {
                const accountDoc = await getDoc(userRef);
                if (accountDoc.exists()) {
                    const data = accountDoc.data();
                    setAccountData(data);
                    setBankName(data.bankName);
                    setBalance(data.balance);
                    console.log('데이터 가져오기 성공')
                }
            } catch (error) {
                console.log('계좌 데이터 가져오기 실패', error);
            }
        };
        fetchAccountData();
    }, []);

    const handleTransferCancelBtn = () => {
        setIsTransfer(prev => !prev);
    }

    return (
        <div className="container min-h-screen">
            <div className="flex flex-col items-center">
                <div className="text-center">
                    <p className="py-3">송금하기</p>
                </div>

                <div className="card w-96 bg-accent shadow-xl">
                    <div className="m-3 rounded-xl bg-base-100">
                        <button onClick={handleTransferCancelBtn} className="px-4 pt-4 text-sm link-primary underline">이전으로</button>
                        {accountData && (
                            <>
                                <div className="user-account p-4 text-sm flex justify-between">
                                    <div>
                                        <span>내 계좌 |</span>
                                        <span className="p-1">{bankName}</span>
                                        <span className="p-1">{accountData.account}</span>
                                    </div>
                                </div>
                                <div className="account-balance px-4 text-right text-xl">{balance}원</div>

                            </>)}
                        <TransferInput />

                    </div>
                    {/* 거래내역 */}
                </div>

            </div>
        </div>
    );

};

export default Transfer;
