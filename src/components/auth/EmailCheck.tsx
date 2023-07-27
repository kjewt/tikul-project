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
        const handleOutsideClick = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                if (!isValidEmail) {
                    setEmail('');
                    setIsValidEmail(true)
                    setIsEmail(true);
                }
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
        console.log(' EmailCheckuseEffect 실행됨!');
    }, [isValidEmail, setEmail]);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setIsValidEmail(true);
        setIsEmail(true)
        if (!isEmailValid(newEmail)) {
            setIsValidEmail(false);
            setIsEmail(false)
        }
    };

    return (
        <>
            <div className="form-control" ref={inputRef}>
                <label className="label">
                    <span className="label-text">이메일</span>
                    {!isValidEmail && <span className="text-sm text-primary">이메일 형식으로 작성해주세요.</span>}
                </label>
                <input
                    type="text"
                    placeholder="이메일"
                    className={`input input-bordered  input-primary ${!isValidEmail ? 'input-error' : ''}`}
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="email"
                />
            </div>
        </>
    );
};

export default EmailCheck;
