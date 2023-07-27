import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { filterMonthSate, filterYearSate } from '../state/atoms'
import NavBar from '../components/common/NavBar';
import TransferList from '../components/main/TransferList';

const TransactionDetail = (): JSX.Element => {

    const today = new Date()

    const [thisYear, setThisYear] = useRecoilState(filterYearSate);
    const [thisMonth, setThisMonth] = useRecoilState(filterMonthSate)
    console.log(thisYear)

    const filterPrevMonth = () => {
        if (thisMonth === 1) {
            setThisMonth(12);
            setThisYear(thisYear - 1);
        } else {
            setThisMonth(thisMonth - 1);
        }
    };

    const filterNextMonth = () => {
        if (thisMonth === 12) {
            setThisMonth(1);
            setThisYear(thisYear + 1);
        } else {
            setThisMonth(thisMonth + 1);
        }
    };
    return (
        <>
            <div className="container min-h-screen">
                <NavBar />
                {/* <Link to="/home">
                    <button className="link link-primary p-2">뒤로 돌아가기</button>
                </Link> */}
                <div className="flex">
                    <div className="card-body w-full">
                        <div className="flex flex-col items-center">
                            <div className="flex gap-2 items-center p-2">
                                <button className="flex btn btn-primary text-base-100" onClick={filterPrevMonth}><i className='bx bxs-left-arrow' ></i></button>
                                <div>
                                    <div className="text-center w-48 flex justify-center">{`${thisYear}년`}</div>
                                    <div className="text-center w-48 flex justify-center">{`${thisMonth}월 거래 내역 자세히보기`}</div>
                                </div>
                                <button className={`flex btn btn-primary text-base-100 ${thisMonth == today.getMonth() + 1 && thisYear === today.getFullYear() ? 'btn-disabled' : ''}`} onClick={filterNextMonth}><i className='bx bxs-right-arrow' ></i></button>
                            </div>
                            <div className="card w-full shadow-2xl bg-base-100">
                                <div className="card-body w-full">
                                    <TransferList detail={true} />


                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default TransactionDetail;
