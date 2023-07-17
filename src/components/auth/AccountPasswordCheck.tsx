import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { accountPasswordState, isSameAccountPassportState } from '../../state/atoms';

const isPasswordValid = (password: string): boolean => {
    const passwordRegex = /^[0-9]{6}$/;
    return passwordRegex.test(password);
};

const PasswordCheck = (): JSX.Element => {
    const [accountPassword, setAccountPassword] = useRecoilState(accountPasswordState);
    const [isSame, setIsSame] = useRecoilState(isSameAccountPassportState);
    const [prePassword, setPrePassword] = useState('');
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [isTyping2, setIsTyping2] = useState(false);

    const handlePrePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value.replace(/\D/g, '').slice(0, 6);
        setPrePassword(newPassword);
        setIsTyping(true)
    };

    const handleAccountPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value.replace(/\D/g, '').slice(0, 6);
        setPassword(newPassword);
        setIsTyping2(true);
    };

    useEffect(() => {
        setIsValidPassword(isPasswordValid(password) && password === prePassword);
        setIsSame((password === prePassword) && prePassword.length > 1);
        if (isSame) {
            setAccountPassword(password);
        } else {
            setAccountPassword(null);
        }
    });

    useEffect(() => {
        if (!isPasswordValid(prePassword)) {
            setPassword('');
        }
    }, [prePassword]);

    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">계좌 비밀번호</span>
                </label>
                <input
                    type="password"
                    placeholder="숫자 6자리로 입력해주세요."
                    className="input input-bordered"
                    value={prePassword}
                    onChange={handlePrePasswordChange}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">계좌 비밀번호 확인</span>
                    {!isValidPassword && isTyping && isTyping2 && (
                        <span className="text-sm text-error">비밀번호가 일치하지 않습니다.</span>
                    )}
                </label>
                <input
                    type="password"
                    placeholder="계좌 비밀번호 확인"
                    className={`password input input-bordered ${!isValidPassword && isTyping && isTyping2 && 'input-error'}`}
                    value={password}
                    onChange={handleAccountPasswordChange}
                    disabled={!isPasswordValid(prePassword)}
                    {...(!isPasswordValid(prePassword) && { value: '' })}
                />
            </div>

            <div className="flex items-center justify-around">
                <hr className="w-full mt-6"></hr>
            </div>
        </>
    );
};

export default PasswordCheck;
