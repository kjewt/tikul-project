import React, { useState, useEffect } from 'react';
import { getDocs, collection, doc, } from 'firebase/firestore';
import { db, firebaseAuth } from '../../../firebase';
import { useRecoilState } from 'recoil';
import { accountDataState, transactionsState, filteredTransactionsState, filterYearSate, filterMonthSate } from '../../state/atoms';

const Filtering = (): JSX.Element => {
    const [dropdownFilterName, setDropdownFilterName] = useState('입출금');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [userUID, setUserUID] = useState()
    //각 필터들 클릭 변수
    const [filterClicked, setFilterClicked] = useState(0) //0은 클릭 안 함 , 1은  전체, 2는 이번달, 3번은 최신순 4 출금, 5 입금
    //recoil
    const [accountData, setAccountData] = useRecoilState(accountDataState);
    const [transactions, setTransactions] = useRecoilState(transactionsState);
    const [filteredTransactions, setFilteredTransactions] = useRecoilState(filteredTransactionsState);
    const [thisYear, setThisYear] = useRecoilState(filterYearSate);
    const [thisMonth, setThisMonth] = useRecoilState(filterMonthSate)
    // const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
    //여기서 filteredTransactions에 담아서 내보내주기.
    //TransferList에서는 정보 바로 가져오지 않기! 
    // const [user, setUser] = useState(null); // 유저 상태를 추가합니다.
    const user = firebaseAuth.currentUser;
    const [userRef, setUserRef] = useState(user ? doc(db, "users", user.uid) : null);

    useEffect(() => {
        const filterTransactionsByYearAndMonth = () => {
            // 현재 선택한 년도와 달에 해당하는 거래 목록만 필터링하여 저장
            const filteredData = transactions.filter((transaction) => {
                const transactionDate = new Date(transaction.date);
                return (
                    transactionDate.getFullYear() === thisYear &&
                    transactionDate.getMonth() === thisMonth - 1 // getMonth()는 0부터 시작하므로 -1 처리
                );
            });

            // 최신 업데이트 순으로 정렬하여 filteredTransactions에 저장
            const sortedTransactions = [...filteredData].sort((a, b) => b.date - a.date);
            setFilteredTransactions(sortedTransactions);
        };

        // thisYear와 thisMonth가 변경될 때마다 필터링 함수를 호출합니다.
        filterTransactionsByYearAndMonth();
    }, [thisYear, thisMonth, transactions]);
    useEffect(() => {
        const storedUser = localStorage.getItem('account');
        // const uid = localStorage.getItem('uid')
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setAccountData(user);
            console.log('로컬 스토리지 저장 useEffect 실행됨!');
        }
        // if (uid) {
        //     const UID = JSON.parse(uid);
        //     setUser(UID)
        // }
    }, []);

    useEffect(() => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            setUserRef(userRef);
            console.log('userRef 저장 useEffect 실행됨!');
        }
    }, [user]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                if (userRef) {
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
                    setFilteredTransactions(transactionsArray);
                }
            } catch (error) {
                console.log('거래내역 불러오기 실패', error);
            }
        };

        fetchTransactions();
        console.log('거래내역 저장 데이터 불러오기 useEffect 실행됨!');
    }, [userRef]);

    const sortTransactionsByLatest = () => {
        const sortedTransactions = [...transactions].sort((a, b) => b.date - a.date);
        setFilteredTransactions(sortedTransactions);
    };

    //filter 함수들
    const filterInit = () => {
        setFilterClicked(1);
        setFilteredTransactions(transactions);
        sortTransactionsByLatest()
    };

    const filterThisMonth = () => {
        setFilterClicked(2);

        const currentDate = new Date(); // 현재 날짜
        const currentMonth = currentDate.getMonth(); // 현재 달 (0부터 시작)
        const currentYear = currentDate.getFullYear(); // 현재 연도

        // 이번 달의 시작일과 마지막일 구하기
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

        // transactions에서 이번 달의 거래 내역만 필터링하여 sortedTransactions에 저장
        const filteredData = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= firstDayOfMonth && transactionDate <= lastDayOfMonth;
        });

        // 이번 달의 거래 내역을 최신 업데이트 순으로 정렬하여 setFilteredTransactions에 저장
        const sortedTransactions = [...filteredData].sort((a, b) => b.date - a.date);
        setFilteredTransactions(sortedTransactions);
    };

    const filterLatest = () => {
        setFilterClicked(3);
        setFilteredTransactions(transactions);
        sortTransactionsByLatest()

    };

    const filterWithdrawal = () => {
        setDropdownFilterName('송금');
        setIsDropdownOpen((prev) => !prev);
        setFilterClicked(4);

        const filteredData = transactions.filter((transaction) => {
            return transaction.category === '송금';
        });

        setFilteredTransactions(filteredData);
    };

    const filterDeposit = () => {
        setDropdownFilterName('입금');
        setIsDropdownOpen((prev) => !prev);
        setFilterClicked(5);

        const filteredData = transactions.filter((transaction) => {
            return transaction.category === '입금';
        });

        setFilteredTransactions(filteredData);
    };

    const filterCharge = () => {
        setDropdownFilterName('충전');
        setIsDropdownOpen((prev) => !prev);
        setFilterClicked(6);

        const filteredData = transactions.filter((transaction) => {
            return transaction.category === '충전';
        });

        setFilteredTransactions(filteredData);
    };


    const handleModal = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <>
            <div className="banking-filter flex justify-between">
                <div className="flex gap-2 text-sm text-info">
                    <button onClick={filterInit} className={filterClicked === 1 ? 'text-primary' : ''}>
                        전체
                    </button>
                    |
                    <button onClick={filterThisMonth} className={filterClicked === 2 ? 'text-primary' : ''}>
                        이번달
                    </button>
                    |
                    <button onClick={filterLatest} className={filterClicked === 3 ? 'text-primary' : ''}>
                        최신순
                    </button>
                    |
                    <div className="dropdown">
                        <label tabIndex={0} className={`cursor-pointer ${filterClicked === 4 || filterClicked === 5 || filterClicked === 6 ? 'text-primary' : ''}`} onClick={handleModal}>
                            {dropdownFilterName}
                        </label>
                        {isDropdownOpen === true ? (
                            <ul tabIndex={0} className="dropdown-content  z-[1] menu  shadow bg-base-100 rounded-box w-20">
                                <li>
                                    <button onClick={filterWithdrawal} >
                                        송금
                                    </button>
                                </li>
                                <li>
                                    <button onClick={filterDeposit} >
                                        입금
                                    </button>
                                </li>
                                <li>
                                    <button onClick={filterCharge} >
                                        충전
                                    </button>
                                </li>
                            </ul>
                        ) : (
                            ''
                        )}
                    </div>
                </div>

            </div>
        </>
    );
};

export default Filtering;
