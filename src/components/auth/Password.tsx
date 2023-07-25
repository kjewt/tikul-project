import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { passwordState } from '../../state/atoms';

const isPasswordValid = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
    return passwordRegex.test(password);
};

interface PasswordCheckProps {
    label: string;
    error?: string;
    placeholder: string;
}

const Password = (): JSX.Element => {
    const [password, setPassword] = useRecoilState(passwordState);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsTyping(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
        console.log('password useEffect 실행됨!');
    }, []);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setIsTyping(!!newPassword);
    };

    useEffect(() => {
        setIsValidPassword(isPasswordValid(password) || !isTyping);
    }, [password, isTyping]);

    return (
        <>
            <div className="form-control" ref={inputRef}>
                <label className="label">
                    <span className="label-text">비밀번호</span>
                    {(!isTyping || password) && !isValidPassword && (
                        <span className="text-sm text-error">대문자, 소문자, 숫자 포함 8~16자 이내</span>
                    )}
                </label>
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    className={`password input input-bordered ${!isValidPassword && isTyping && 'input-error'
                        }`}
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                />
            </div>
        </>
    );
};

export default Password;
