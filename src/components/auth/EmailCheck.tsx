import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { emailState } from '../../state/atoms';

const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const EmailCheck = (): JSX.Element => {
    const [email, setEmail] = useRecoilState(emailState)
    const [isValidEmail, setIsValidEmail] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                if (!isValidEmail) {
                    setEmail('');
                    setIsValidEmail(true);
                }
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isValidEmail]);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        const isValid = isEmailValid(newEmail);
        setEmail(newEmail);
        setIsValidEmail(isValid);
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
