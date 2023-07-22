import React, { useState, useEffect } from 'react';
import { doc, getFirestore, collection, query, where, getDocs, addDoc, updateDoc, increment } from 'firebase/firestore';
import { firebaseApp, firebaseAuth } from '../../../firebase';
import { useRecoilState } from 'recoil';
import { transferBankNameState, isTransferState } from '../../state/atoms';
import DropDown from '../common/Dropdown';
import { updateCurrentUser } from 'firebase/auth';

const TransferInput = (): JSX.Element => {
    const db = getFirestore(firebaseApp);
    const [user, setUser] = useState(null)
    const [accountNumber, setAccountNumber] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [password, setPassword] = useState('');
    const [transferBankName, setTransferBankName] = useRecoilState(transferBankNameState);
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
    const handleTransfer = async () => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('bankName', '==', transferBankName), where('account', '==', accountNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userRef = doc(db, 'users', userDoc.id);

                // 송금 받는 유저의 "details" 컬렉션에 송금 내역 추가
                const detailsRef = collection(db, 'users', userDoc.id, 'details');
                await addDoc(detailsRef, {
                    amount: transferAmount,
                    description: "",
                    isWithdrawal: false,
                    category: "입금",
                    date: new Date(),
                });

                // 송금받는 유저의 계좌에 transferAmount 더하기
                await updateDoc(userRef, {
                    balance: increment(parseFloat(transferAmount)),
                });

                // 송금하는 유저 정보 가져오기
                const currentUser = firebaseAuth.currentUser;
                if (currentUser) {
                    const currentUserRef = doc(db, 'users', currentUser.uid);
                    const currentUserSnapshot = await getDocs(currentUserRef);

                    if (currentUserSnapshot.exists()) {
                        const currentUserDoc = currentUserSnapshot.data();
                        const currentUserBalance = currentUserDoc.balance || 0;
                        const updatedCurrentUserBalance = currentUserBalance - parseFloat(transferAmount);

                        // 송금 하는 유저의 계좌에 transferAmount 빼기
                        await updateDoc(currentUserRef, {
                            balance: updatedCurrentUserBalance,
                        });

                        // 송금 성공 후 입력 필드 초기화
                        setAccountNumber('');
                        setTransferAmount('');
                        setPassword('');

                        console.log('송금 성공! 유저에게 내역이 추가되었습니다.');
                        setIsTransfer((prev) => !prev);
                    } else {
                        console.log('송금하는 유저 정보를 찾을 수 없습니다.');
                    }
                } else {
                    console.log('사용자 정보를 찾을 수 없습니다. 로그인 되어 있는지 확인해주세요.');
                }
            } else {
                console.log('입력한 은행 이름과 계좌번호와 일치하는 유저를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.log('송금 실패:', error);
        }
    };

    return (
        <>
            <div className="card-body p-4">
                <hr />
                <DropDown transfer="true" onBankSelected={setTransferBankName} />
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">송금할 계좌 번호</span>
                    </label>
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder="9~13자리 숫자로 입력해주세요."
                        className="input input-bordered input-primary"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">얼마를 보낼까요?</span>
                    </label>
                    <input
                        type="text"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder=""
                        className="input input-bordered input-primary"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">비밀번호</span>
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=""
                        className="input input-bordered input-primary"
                    />
                </div>
                <div className="form-control my-6">
                    <button className="btn btn-primary w-full text-base-100" onClick={handleTransfer}>
                        송금
                    </button>
                </div>
            </div>
        </>
    );
};


export default TransferInput