
import React, { useState } from 'react';
import { doc, getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { firebaseApp, firebaseAuth } from '../../../firebase';
import { useRecoilState } from 'recoil';
import { transferBankNameState, isTransferState } from '../../state/atoms';
import DropDown from '../common/Dropdown';
import { updateCurrentUser } from 'firebase/auth';

const TransferInput = (): JSX.Element => {
    const db = getFirestore(firebaseApp);
    const [accountNumber, setAccountNumber] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [password, setPassword] = useState('');
    const [transferBankName, setTransferBankName] = useRecoilState(transferBankNameState);
    const [isTransfer, setIsTransfer] = useRecoilState(isTransferState)
    const handleTransfer = async () => {
        try {
            // 입력된 은행 이름과 계좌번호로 유저 검색
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('bankName', '==', transferBankName), where('account', '==', accountNumber));
            const querySnapshot = await getDocs(q);

            // 입력한 은행 이름과 계좌번호와 일치하는 유저가 찾아지면
            if (!querySnapshot.empty) {
                // 결과가 여러 개일 수 있지만 이 예시에서는 하나의 유저만 찾는 것으로 가정합니다.
                const userDoc = querySnapshot.docs[0];
                const userRef = doc(db, 'users', userDoc.id);

                // 유저의 "details" 컬렉션에 송금 내역 추가
                const detailsRef = collection(db, 'users', userDoc.id, 'details');
                await addDoc(detailsRef, {
                    amount: transferAmount,
                    description: "",
                    isWithdrawal: false,
                    category: "입금",
                    date: new Date(),
                });
                // 유저의 "details" 컬렉션에 송금 내역 추가
                const user = firebaseAuth.currentUser
                const currentUserDetailsRef = collection(db, 'users', user.uid, 'details');
                await addDoc(currentUserDetailsRef, {
                    amount: transferAmount,
                    description: "",
                    isWithdrawal: true,
                    category: "송금",
                    date: new Date(),
                });


                // 송금 성공 후 입력 필드 초기화
                setAccountNumber('');
                setTransferAmount('');
                setPassword('');

                console.log('송금 성공! 유저에게 내역이 추가되었습니다.');
                setIsTransfer(prev => !prev);
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
                        type="number"
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

export default TransferInput;