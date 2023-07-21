import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { emailState } from '../../state/atoms';

const NavBar = () => {
    const [email, setEmail] = useRecoilState(emailState);
    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        // 페이지 로드 시에 스토리지에서 사용자 정보 가져오기
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setEmail(user.email);
        }
    }, [setEmail]);




    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-none">
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </Link>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">TIKUL</a>
            </div>
            <div className="flex-none">
                <span className="text-sm mr-2">{email}</span>

                {/* 프로필 */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <button className="btn btn-circle btn-ghost">
                            <i className='bx bxs-user text-2xl' ></i>
                        </button>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><Link to="/add">Settings</Link></li>
                        <li><Link to="/">Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
