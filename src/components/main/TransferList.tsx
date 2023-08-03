import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { filteredTransactionsState } from '../../state/atoms';
import Fitering from '../common/Fitering';
import Pagination from "react-js-pagination";
import '../../assets/css/paging.css'

const TransferList = ({ detail }: { detail: boolean }): JSX.Element => {
    const dateFormatter = detail
        ? new Intl.DateTimeFormat('ko', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
        : new Intl.DateTimeFormat('en', {
            month: '2-digit',
            day: '2-digit',
        });

    // 필터필터필터
    const [filteredTransactions, setFilteredTransactions] = useRecoilState(filteredTransactionsState)
    const [count, setCount] = useState(0); // 아이템 총 개수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 1로 설정
    const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수 

    const [indexOfLastPost, setIndexOfLastPost] = useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(1);
    interface Transaction {
        date: Date;
        description: string;
        amount: number;
        category: string;
        isWithdrawal: number;
    }
    const [currentTransactions, setCurrentTransactions] = useState<Transaction[]>([]);



    useEffect(() => {
        setCount(filteredTransactions.length);
        setIndexOfLastPost(currentPage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentTransactions(filteredTransactions.slice(indexOfFirstPost, indexOfLastPost));
    }, [currentPage, indexOfFirstPost, indexOfLastPost, filteredTransactions, postPerPage]);


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };




    return (
        <>
            <div className="card-body mx-3 my-3 px-4 py-2 pb-4 rounded-xl bg-base-100">
                <div className="flex justify-end gap-2 text-sm">
                    <div className="lg:tooltip tooltip-primary text-sm" data-tip="추가하기">
                    </div>
                </div>
                <Fitering />
                <hr></hr>
                {Array.isArray(currentTransactions) && currentTransactions.length > 0 ? (
                    currentTransactions.map((transaction, index: number) => (
                        <div key={index}>
                            <div className="transaction flex justify-between text-info">
                                <div className="transaction-info text-sm flex gap-2">
                                    <span className="text-[12px] flex items-center">{dateFormatter.format(transaction.date)}</span>

                                    <span className="">{transaction.description}</span>
                                    <span className={`badge badge-primary px-1 text-sm text-base-100 
                                    ${transaction.isWithdrawal === 0 ? 'badge-secondary' : transaction.isWithdrawal === 1 ? 'badge-primary' : 'badge-success'}`}>
                                        {transaction.isWithdrawal === 0 ? '송금' : transaction.isWithdrawal === 1 ? '입금' : '충전'}
                                    </span>
                                </div>
                                <div>
                                    {detail ? (<span className="px-4 text-sm"> {transaction.category} |</span>) : ''}
                                    <span className="text-sm">{Boolean(transaction.isWithdrawal) ? '+' : '-'}</span>
                                    <span className="text-sm">{transaction.amount.toLocaleString()}원</span>
                                </div>

                            </div>
                            <hr className="m-1" />
                        </div>
                    ))
                ) : (
                    <div className="text-sm text-center text-primary">거래내역이 없습니다.</div>
                )
                }


            </div >
            <div>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={5}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={handlePageChange}

                />
            </div>
        </>
    );
};

export default TransferList;
