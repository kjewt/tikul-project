import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { passwordState, isSamePassportState } from '../../state/atoms';

const isPasswordValid = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
    return passwordRegex.test(password);
};

const PasswordCheck = (): JSX.Element => {
    const [password, setPassword] = useRecoilState(passwordState);
    const [isSame, setIsSame] = useRecoilState(isSamePassportState);
    const [prePassword, setPrePassword] = useState('');
    const [comparingPassword, setComparingPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [isTyping2, setIsTyping2] = useState(false);

    const handlePrePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrePassword(event.target.value);
        setIsValidPassword(isPasswordValid(event.target.value) && comparingPassword === event.target.value);
        setIsTyping(true);
        setIsSame(false); // Reset setIsSame to false when prePassword is changed
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setComparingPassword(newPassword);
        setIsValidPassword(isPasswordValid(newPassword) && newPassword === prePassword);
        setIsTyping2(true);
        setIsTyping(true);
        setIsSame(false); // Reset setIsSame to false when comparingPassword is changed
    };

    useEffect(() => {
        setIsValidPassword(isPasswordValid(password) && password === prePassword);
        setIsSame((comparingPassword === prePassword) && comparingPassword.length > 1);
        if (isSame) {
            setPassword(comparingPassword);
        } else {
            setPassword(null);
        }

        console.log('Passwordcheck: useEffect 실행됨!');
    }, [comparingPassword, isSame, password, prePassword, setPassword]);

    useEffect(() => {
        if (!isPasswordValid(prePassword)) {
            setPassword('');
        }
    }, [prePassword, setPassword]);
    // console.log(password)
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
                    className="input input-bordered input-primary"
                    value={prePassword}
                    onChange={handlePrePasswordChange}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">비밀번호 재확인</span>
                    {!isValidPassword && isTyping && isTyping2 && (
                        <span className="text-sm text-error">비밀번호가 일치하지 않습니다.</span>
                    )}
                </label>
                <input
                    type="password"
                    placeholder="비밀번호 재확인"
                    className={`password input input-bordered input-primary ${!isValidPassword && isTyping && isTyping2 && 'input-error'}`}
                    value={comparingPassword}
                    onChange={handlePasswordChange}
                    disabled={!isPasswordValid(prePassword)}
                    {...(!isPasswordValid(prePassword) && { value: '' })}
                />
            </div>
        </>
    );
};

export default PasswordCheck;
