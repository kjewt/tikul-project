import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { transactionsState, filterYearSate, filterMonthSate } from '../../state/atoms';

const Summary = (): JSX.Element => {
    const today = new Date();
    const thisMonth = today.getMonth() + 1;
    const thisYear = today.getFullYear()
    const [transactions, setTransactions] = useRecoilState(transactionsState);
    const [thisyear, setThisYear] = useRecoilState(filterYearSate);
    const [thismonth, setThisMonth] = useRecoilState(filterMonthSate)


    // 이번 달 송금, 입금, 충전 금액의 총 합을 계산하는 함수
    const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
            transactionDate.getFullYear() === thisYear &&
            transactionDate.getMonth() === thisMonth - 1 // getMonth()는 0부터 시작하므로 -1 처리
        );
    });

    const totalWithdrawal = filteredTransactions.reduce((acc, transaction) => {
        if (transaction.category === '송금') {
            return acc + Number(transaction.amount);
        }
        return acc;
    }, 0);

    const totalDeposit = filteredTransactions.reduce((acc, transaction) => {
        if (transaction.category === '입금') {
            return acc + Number(transaction.amount);
        }
        return acc;
    }, 0);

    const totalCharge = filteredTransactions.reduce((acc, transaction) => {
        if (transaction.category === '충전') {
            return acc + Number(transaction.amount);
        }
        return acc;
    }, 0);

    // return { totalWithdrawal, totalDeposit, totalCharge };

    const handelToDetail = () => {
        setThisMonth(thisMonth);
        setThisYear(thisYear)
    }



    return (
        <>
            <div className="container min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <p className="py-3">이번 달 통계</p>
                    </div>

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body text-md">
                            <div className="category">
                                <div className="edit flex gap-2 justify-end">

                                    <Link to="/detail">
                                        <button onClick={handelToDetail} className="link link-primary pb-2 ">자세히보기</button>
                                    </Link>

                                </div>
                                <div className="category-content flex justify-between p-4">
                                    <span>송금</span>
                                    <span>{totalWithdrawal}원</span>
                                </div>
                                <hr></hr>
                            </div>
                            <div className="category">
                                <div className="category-content flex justify-between p-4">
                                    <span>입금</span>
                                    <span>{totalDeposit}원</span>
                                </div>
                                <hr></hr>
                            </div>
                            <div className="category">
                                <div className="category-content flex justify-between p-4">
                                    <span>충전</span>
                                    <span>{totalCharge}원</span>
                                </div>
                                <hr></hr>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Summary