import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { emailState, isEmailState } from '../../state/atoms';

const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const EmailCheck = (): JSX.Element => {
    const [email, setEmail] = useRecoilState(emailState);
    const [isEmail, setIsEmail] = useRecoilState(isEmailState);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsEmail(isEmailValid(email));
    }, [email, setIsEmail]);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setIsValidEmail(true);
    };

    return (
        <>
            <div className="form-control" ref={inputRef}>
                <label className="label">
                    <span className="label-text">이메일</span>
                    {!isValidEmail && <span className="text-sm text-error">유효한 이메일 형식이 아닙니다.</span>}
                </label>
                <input
                    type="text"
                    placeholder="이메일"
                    className={`input input-bordered ${!isValidEmail ? 'input-error' : ''}`}
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
        </>
    );
};

export default EmailCheck;
