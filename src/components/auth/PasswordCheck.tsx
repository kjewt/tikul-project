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

const PasswordCheck = (props: PasswordCheckProps): JSX.Element => {
    const [password, setPassword] = useRecoilState(passwordState);
    const [prePassword, setPrePassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [isTyping2, setIsTyping2] = useState(false);
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
    }, []);

    const handlePrePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrePassword(event.target.value);
        setIsTyping(true);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setIsTyping2(true);
    };

    useEffect(() => {
        setIsValidPassword(isPasswordValid(password) && password === prePassword);
    }, [password, prePassword]);

    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">비밀번호</span>
                    {!isPasswordValid(prePassword) && isTyping && (
                        <span className="password-error text-sm text-primary">
                            대문자, 소문자, 숫자 포함 8~16자 이내
                        </span>
                    )}
                </label>
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    className="input input-bordered"
                    value={prePassword}
                    onChange={handlePrePasswordChange}
                />
            </div>

            <div className="form-control" ref={inputRef}>
                <label className="label">
                    <span className="label-text">비밀번호 재확인</span>
                    {!isValidPassword && isTyping && isTyping2 && (
                        <span className="text-sm text-error">입력된 비밀번호와 일치하지 않습니다.</span>
                    )}
                </label>
                <input
                    type="password"
                    placeholder="비밀번호 재확인"
                    className={`password input input-bordered ${!isValidPassword && isTyping && isTyping2 && 'input-error'}`}
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={!isPasswordValid(prePassword)}
                />
            </div>
        </>
    );
};

export default PasswordCheck;
