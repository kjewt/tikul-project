import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { firebaseAuth, firebaseApp } from '../../../firebase';
import { isTransferState, balanceState, accountDataState, bankNameState } from '../../state/atoms'
import { useRecoilState } from 'recoil';

import TransferList from './TransferList';

const Banking = (): JSX.Element => {
    const db = getFirestore(firebaseApp);
    const [user, setUser] = useState<any>(null);
    const [accountData, setAccountData] = useRecoilState(accountDataState)
    const [bankName, setBankName] = useRecoilState(bankNameState)
    const [balance, setBalance] = useRecoilState(balanceState);
    const [isTransfer, setIsTransfer] = useRecoilState(isTransferState);
    const navigate = useNavigate();

    const authStateChanged = (currentUser: any) => {
        setUser(currentUser);
    };



    useEffect(() => {
        // Firebase 인증 상태 변경 이벤트 리스너 등록
        const unsubscribe = firebaseAuth.onAuthStateChanged(authStateChanged);

        // 컴포넌트가 언마운트 될 때 이벤트 리스너 해제
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        // fetchUserData 함수 내에서 userRef를 참조할 때에만 실행되도록 함
        const fetchUserData = async () => {
            if (user) {
                await fetchAccountData(user.uid);
            }
        };

        fetchUserData();
    }, [user]); // bal가 변경될 때마다 실행

    const fetchAccountData = async (uid: string) => {
        try {
            const userRef = doc(db, 'users', uid);
            const accountDoc = await getDoc(userRef);
            if (accountDoc.exists()) {
                const data = accountDoc.data();

                setAccountData(data);
                setBankName(data.bankName);
                setBalance(data.balance);
                console.log('데이터 가져오기 성공');
            }
        } catch (error) {
            console.log('계좌 데이터 가져오기 실패', error);
        }
    };

    const handleTransferBtn = () => {
        setIsTransfer(prev => !prev);
    }


    return (
        <div className="container min-h-screen">
            <div className="flex flex-col items-center">
                <div className="text-center">
                    <p className="py-3">Banking</p>
                </div>
                {accountData && (
                    <div className="card w-96 bg-accent shadow-xl">
                        <div className="mx-3 mt-3 rounded-xl bg-base-100">
                            <div className="user-account p-4 text-sm">
                                <span>내 계좌 |</span>
                                <span className="p-1">{bankName}</span>
                                <span className="p-1">{accountData.account}</span>
                            </div>
                            <div className="account-balance px-4 text-right text-xl">{balance}원</div>
                            <div className="btn-banking p-4 flex justify-around gap-1">
                                <button onClick={handleTransferBtn} className="btn btn-primary text-base-100 w-1/2">송금</button>
                                <button className="btn btn-outline btn-primary w-1/2 btn-hover">충전</button>
                            </div>
                        </div>
                        {/* 거래내역 */}
                        <TransferList />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banking;