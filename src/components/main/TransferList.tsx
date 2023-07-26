import React, { useEffect, useState } from 'react';
import { doc, getDoc, addDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { firebaseAuth, db } from '../../../firebase';
import { useRecoilState } from 'recoil';
import { selectedDateState, transactionsState } from '../../state/atoms';
import axios from "axios";

import 'react-day-picker/dist/style.css';
import DatePicker from '../common/DatePicker';
import Paging from '../common/Paging';

const TransferList = (): JSX.Element => {
    const user = firebaseAuth.currentUser;
    const userRef = user ? doc(db, "users", user.uid) : null;
    const dateFormatter = new Intl.DateTimeFormat('en', { month: '2-digit', day: '2-digit' });

    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [showAddContent, setShowAddContent] = useState<boolean>(false);
    const [isWithdrawal, setIsWithdrawal] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

    const [transactions, setTransactions] = useRecoilState(transactionsState);
    const [count, setCount] = useState(0); // 아이템 총 개수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 1로 설정
    const [postPerPage] = useState(10); // 한 페이지에 보여질 아이템 수 

    const [indexOfLastPost, setIndexOfLastPost] = React.useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(0);
    interface Transaction {
        date: Date;
        description: string;
        amount: number;
        category: string;
        isWithdrawal: boolean;
    }
    const [currentTransactions, setCurrentTransactions] = useState<Transaction[]>([]);

    const fetchTransactions = async () => {
        try {
            const detailsCollectionRef = collection(userRef, 'details');
            const detailsQuerySnapshot = await getDocs(detailsCollectionRef);
            const transactionsArray = detailsQuerySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    ...data,
                    date: data.date.toDate(),
                };
            });

            setTransactions(transactionsArray);
            setCount(transactionsArray.length); // 거래 내역 개수를 설정
        } catch (error) {
            console.log('거래내역 불러오기 실패', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const toggleWithdrawal = () => {
        setIsWithdrawal((prev) => !prev);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    const addTransaction = async () => {
        if (!user || !selectedDate || !description || !amount) {
            console.log('날짜, 내역, 금액은 필수 입력 사항입니다.');
            return;
        }

        try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const data = userDoc.data();
                const balance = data.balance || 0;

                const detailsCollectionRef = collection(userRef, 'details');
                const newTransaction = {
                    date: selectedDate,
                    description: description,
                    amount: amount,
                    category: '카테고리', // 여기서 원하는 카테고리를 추가해주세요.
                    isWithdrawal: isWithdrawal, // 변경된 isWithdrawal 값으로 설정
                };
                // 새로운 거래 내역을 Firestore에 추가합니다.
                await addDoc(detailsCollectionRef, newTransaction);
                setTransactions((prevDetails) => [...prevDetails, newTransaction]);
                setCount((prevCount) => prevCount + 1); // 거래 내역 개수 업데이트

                // 업데이트할 balance 값
                const updatedBalance = isWithdrawal ? balance - amount : balance + amount;
                await updateDoc(userRef, { balance: updatedBalance });

                // 입력 필드 초기화
                setSelectedDate(new Date());
                setDescription('');
                setAmount(0);
                setShowAddContent(false); // 거래 내역 추가 영역을 닫습니다.
            }
        } catch (error) {
            console.log('거래내역 추가 실패', error);
        }
    };
    React.useEffect(() => {
        setIndexOfLastPost(currentPage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentTransactions(transactions.slice(indexOfFirstPost, indexOfLastPost)); // currentPosts를 currentTransactions로 수정
    }, [currentPage, indexOfFirstPost, indexOfLastPost, transactions, postPerPage]);


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };



    return (
        <>
            <div className="card-body mx-3 my-3 px-4 py-2 pb-4 rounded-xl bg-base-100">
                <div className="flex justify-end gap-2 text-sm">
                    <button><i className='bx bxs-edit-alt text-2xl text-primary'></i></button>

                    <div className="lg:tooltip tooltip-primary text-sm" data-tip="추가하기">
                        <button onClick={() => setShowAddContent((prev) => !prev)}>
                            <i className='bx bx-list-plus text-3xl text-primary'></i>
                        </button>
                    </div>
                </div>
                <div className="banking-filter flex justify-between">
                    <div className="flex gap-2 text-sm text-info">
                        <button>전체</button>
                        <button>이번달</button>
                        <button>최신순</button>
                    </div>
                    <button><i className='flex bx bx-search text-info text-lg'></i></button>
                </div>
                <hr></hr>


                {showAddContent && (
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-end  items-center gap-1">
                            <DatePicker />
                            <input
                                type="text"
                                placeholder="내역"
                                className="input input-bordered input-xs w-1/2 max-w-xs"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                            <input
                                type="text"
                                placeholder="금액"
                                className="input input-bordered input-xs w-1/4 max-w-xs "
                                value={amount}
                                onChange={handleAmountChange}
                            />
                            <label className="swap" >
                                {/* this hidden checkbox controls the state */}
                                <input type="checkbox" />
                                <button onClick={toggleWithdrawal} className="checkbox btn-primary text-base-100">
                                    {isWithdrawal ? "-" : "+"}
                                </button>
                            </label>
                            <button onClick={addTransaction} className="checkbox btn-primary text-base-100">✓</button>
                        </div>

                    </div>
                )}


                {Array.isArray(currentTransactions) && currentTransactions.length > 0 ? (
                    currentTransactions.map((transaction, index: number) => (
                        <div key={index}>
                            <div className="transaction flex justify-between text-info">
                                <div className="transaction-info text-sm flex gap-2">
                                    <span>{dateFormatter.format(transaction.date)}</span>

                                    <span>{transaction.description}</span>
                                    <span className="badge badge-primary px-1 text-sm text-base-100">
                                        {transaction.isWithdrawal ? '지출' : '입금'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-sm">{transaction.isWithdrawal ? '-' : '+'}</span>
                                    <span className="text-sm">{transaction.amount.toLocaleString()}원</span>
                                </div>

                            </div>
                            <hr className="m-1" />
                        </div>
                    ))
                ) : (
                    <div className="text-sm text-center text-primary">이번 달 거래내역이 없습니다.</div>
                )}


            </div>
            <Paging page={currentPage} count={Math.ceil(count / postPerPage)} setPage={handlePageChange} />
        </>
    );
};

export default TransferList;
