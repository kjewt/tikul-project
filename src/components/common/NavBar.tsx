import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { emailState } from '../../state/atoms';

const NavBar = () => {
    const [email, setEmail] = useRecoilState(emailState);

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">TIKUL</a>
            </div>
            <div className="flex-none">
                <span className="text-sm">{email}</span>
                <button className="btn btn-circle btn-ghost">
                    <i className='bx bxs-user text-2xl' ></i>
                </button>
                <button className="btn btn-circle btn-ghost">
                    <i className='bx bx-cog text-2xl' ></i>
                </button>
            </div>
        </div>
    );
};

export default NavBar;
