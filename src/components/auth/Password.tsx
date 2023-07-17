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

const Password = (props: PasswordCheckProps): JSX.Element => {
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
                    <span className="label-text">{props.label}</span>
                    {(!isTyping || password) && !isValidPassword && (
                        <span className="text-sm text-error">{props.error}</span>
                    )}
                </label>
                <input
                    type="password"
                    placeholder={props.placeholder}
                    className={`password input input-bordered ${!isValidPassword && isTyping && 'input-error'
                        }`}
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
        </>
    );
};

export default Password;
