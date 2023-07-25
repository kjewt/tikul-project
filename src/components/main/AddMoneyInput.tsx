
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { doc, collection, query, where, getDocs, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db, firebaseAuth } from '../../../firebase';
import { useRecoilState } from 'recoil';
import { transferBankNameState, isBankingState, balanceState, transactionsState, accountDataState } from '../../state/atoms';
import DropDown from '../common/Dropdown';
import Keypad from '../common/KeyPad';


const AddMoneyInput = (): JSX.Element => {
    // const navigate = useNavigate()
    const [accountNumber, setAccountNumber] = useState('');
    const [accountData, setAccountData] = useRecoilState(accountDataState)
    const [transferAmount, setTransferAmount] = useState('');
    const [transferBankName, setTransferBankName] = useRecoilState(transferBankNameState);
    const [transactions, setTransactions] = useRecoilState(transactionsState);
    const [isBanking, setIsBanking] = useRecoilState(isBankingState);
    const [isComplete, setIsComplete] = useState(false)

    const handleAddMoney = async () => {
        try {

            // 송금하는 현재 유저의 "details" 컬렉션에 송금 내역 추가
            const user = firebaseAuth.currentUser;
            const currentUserDocRef = doc(db, 'users', user.uid);

            // 문서 데이터 가져오기
            const currentUserDocSnap = await getDoc(currentUserDocRef);
            const currentUserData = currentUserDocSnap.data();

            const currentUserDetailsRef = collection(db, 'users', user.uid, 'details');
            const addTransaction = {
                amount: transferAmount,
                description: "",
                isWithdrawal: false,
                category: "송금",
                date: new Date(),
            }
            await addDoc(currentUserDetailsRef, addTransaction);
            setTransactions((prevDetails) => [...prevDetails, addTransaction]);

            await updateDoc(currentUserDocRef, {
                balance: currentUserData.balance + Number(transferAmount),
            });

            setIsComplete(true)
            console.log('충전완료')


        } catch (error) {
            console.log('충전 실패', error)
        }
    }


    const handelToHome = () => {
        setIsComplete(false);
        setIsBanking(0)
    }


    return (
        <>
            {isComplete ? (<div className="card-body">
                <hr />
                <div className="text-center p-4"> 충전을 완료했습니다! 🎉</div>
                <div className="btn-banking p-4 flex justify-around gap-1">
                    <button onClick={handelToHome} className="btn btn-outline btn-primary w-1/2 btn-hover">이전화면으로</button>
                </div>
            </div>) :
                (<div className="card-body p-4">
                    <hr />
                    <DropDown transfer="true" onBankSelected={setTransferBankName} />
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">어디서 가져올까요?</span>
                        </label>
                        <input
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="9~13자리 숫자로 입력해주세요."
                            className="input input-bordered w-full input-primary"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">얼마를 가져올까요?</span>
                        </label>
                        <input
                            type="number"
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(e.target.value)}
                            placeholder=""
                            className="input input-primary w-full input-bordered"
                        />


                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">계좌 비밀번호</span>
                        </label>
                        <Keypad />
                    </div>
                    <div className="form-control my-6">
                        <button className="btn btn-primary w-full text-base-100" onClick={handleAddMoney}>
                            충전!
                        </button>
                    </div>
                </div>)
            }
        </>
    );
};

export default AddMoneyInput;