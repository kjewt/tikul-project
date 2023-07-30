import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { accountState, accountDataState, transactionsState } from '../../state/atoms';

const NavBar = () => {
    const [accountData, setAccountData] = useRecoilState(accountDataState);
    const [account, setAccount] = useRecoilState(accountState);
    const [transactions, setTransactions] = useRecoilState(transactionsState);

    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const navigate = useNavigate()
    useEffect(() => {
        // 페이지 로드 시에 스토리지에서 사용자 정보 가져오기
        const storedUser = localStorage.getItem('account');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setAccountData(user)
        }
        console.log('nav useEffect 실행됨!');
    }, []);

    // 로그아웃 시에 실행되는 함수
    const handleLogout = () => {
        // 여기서 emailState, bankNameState, accountDataState, accountState를 초기값으로 돌립니다.
        setAccountData({
            account: "",
            accountPassword: "",
            balance: 0,
            bankName: "",
            email: "",
        }); // 계좌 데이터 초기값으로 설정
        setTransactions([])
        setAccount('')

        localStorage.removeItem('user');
        navigate('/login')
    };



    return (
        <div className="navbar bg-base-100 shadow-md">

            <div className="flex-1">
                <Link to="/home">
                    <button className="btn btn-ghost normal-case text-xl">TIKUL</button>
                </Link>
            </div>
            <div className="flex-none">
                <span className="text-sm mr-2">{accountData ? accountData.email : "로그인해주세요."}</span>

                {/* 프로필 */}

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar flex align-middle">
                        <i className='bx bxs-user text-2xl flex'></i>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40">

                        <li>
                            <button className="p-2" onClick={handleLogout}>
                                로그아웃
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default NavBar;
