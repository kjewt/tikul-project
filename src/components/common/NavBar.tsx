import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { accountDataState, transactionsState } from '../../state/atoms';

const NavBar = () => {
    const [accountData, setAccountData] = useRecoilState(accountDataState);
    const [transactions, setTransactions] = useRecoilState(transactionsState);

    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const navigate = useNavigate()
    console.log(accountData)
    useEffect(() => {
        // 페이지 로드 시에 스토리지에서 사용자 정보 가져오기
        const storedUser = localStorage.getItem('account');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            console.log(user.userData)
            setAccountData(user)
        }
        console.log('nav useEffect 실행됨!');
    }, []);

    // 로그아웃 시에 실행되는 함수
    const handleLogout = () => {
        // 여기서 emailState, bankNameState, accountDataState, accountState를 초기값으로 돌립니다.
        setAccountData(null); // 계좌 데이터 초기값으로 설정
        setTransactions([])

        // 로그아웃 로직 추가 (예를 들어, 세션 스토리지 삭제)
        localStorage.removeItem('user');
        navigate('/login')
    };

    const handleSetting = () => {
        navigate('/editing')
    }

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

                        <li><button className="p-2" onClick={handleSetting}>설정</button></li>
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
