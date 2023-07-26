
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { doc, collection, query, where, getDocs, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db, firebaseAuth } from '../../../firebase';
import { useRecoilState } from 'recoil';
import { transferBankNameState, isBankingState, balanceState, transactionsState, accountDataState } from '../../state/atoms';
import DropDown from '../common/Dropdown';
import Keypad from '../common/KeyPad';


const TransferInput = (): JSX.Element => {
    const [accountNumber, setAccountNumber] = useState('');
    const [accountData, setAccountData] = useRecoilState(accountDataState)
    const [transferAmount, setTransferAmount] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [transferBankName, setTransferBankName] = useRecoilState(transferBankNameState);
    const [transactions, setTransactions] = useRecoilState(transactionsState);
    const [isBanking, setIsBanking] = useRecoilState(isBankingState);
    const [isComplete, setIsComplete] = useState(false)

    const handleTransfer = async () => {
        try {
            // 입력된 은행 이름과 계좌번호로 유저 검색
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('bankName', '==', transferBankName), where('account', '==', accountNumber));
            const querySnapshot = await getDocs(q);

            // 입력한 은행 이름과 계좌번호와 일치하는 유저가 찾아지면
            if (!querySnapshot.empty) {



                // 송금하는 현재 유저의 "details" 컬렉션에 송금 내역 추가
                const user = firebaseAuth.currentUser;
                const currentUserDocRef = doc(db, 'users', user.uid);

                // 문서 데이터 가져오기
                const currentUserDocSnap = await getDoc(currentUserDocRef);
                const currentUserData = currentUserDocSnap.data();

                const currentUserDetailsRef = collection(db, 'users', user.uid, 'details');
                const addTransaction = {
                    amount: transferAmount,
                    description: description,
                    isWithdrawal: 0, // 0은 송금
                    category: "송금",
                    date: new Date(),
                }
                await addDoc(currentUserDetailsRef, addTransaction);
                setTransactions((prevDetails) => [...prevDetails, addTransaction]);

                await updateDoc(currentUserDocRef, {
                    balance: currentUserData.balance - Number(transferAmount),
                });
                // const userDoc = querySnapshot.docs[0].ref;
                const userDoc = querySnapshot.docs[0];
                const userRef = doc(db, 'users', userDoc.id);

                // 돈 받는 유저의 "details" 컬렉션에 송금 내역 추가
                const detailsRef = collection(db, 'users', userDoc.id, 'details');
                await addDoc(detailsRef, {
                    amount: transferAmount,
                    description: description,
                    isWithdrawal: 1, //1는 입금 
                    category: "입금",
                    date: new Date(),
                });
                await updateDoc(userRef, {
                    balance: userDoc.data().balance + Number(transferAmount),
                });





                // 송금 성공 후 입력 필드 초기화
                setAccountNumber('');
                setTransferAmount('');
                setPassword('');
                setIsComplete(true);
                console.log('송금 성공! 유저에게 내역이 추가되었습니다.');

            } else {
                console.log('입력한 은행 이름과 계좌번호와 일치하는 유저를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.log('송금 실패:', error);
        }
    };



    const handelToHome = () => {
        setIsComplete(false);
        setIsBanking(0)
    }


    return (
        <>
            {isComplete ? (<div className="card-body">
                <hr />
                <div className="text-center p-4"> 송금을 완료했습니다! 🎉</div>
                <div className="btn-banking p-4 flex justify-around gap-1">
                    <button onClick={handelToHome} className="btn btn-outline btn-primary w-1/2 btn-hover">이전화면으로</button>
                </div>
            </div>) :
                (<div className="card-body p-4">
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
                            className={`input input-bordered ${Number(transferAmount) > accountData.balance ? "input-error" : "input-primary"}`}
                        />

                        {Number(transferAmount) > accountData.balance && (
                            <span className="password-error text-sm text-error ml-1 mt-1">
                                출금계좌 잔고 부족. 현재 잔고는 {accountData.balance}원 입니다.
                            </span>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">메모를 남겨주세요!</span>
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="(option)"
                            className="input input-bordered w-full input-primary"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">계좌 비밀번호</span>
                        </label>
                        <Keypad />
                    </div>
                    <div className="form-control my-6">
                        <button className={`btn btn-primary w-full text-base-100 ${Number(transferAmount) > accountData.balance ? "btn-disabled" : ""}`} onClick={handleTransfer}>
                            송금
                        </button>
                    </div>
                </div>)
            }
        </>
    );
};

export default TransferInput;