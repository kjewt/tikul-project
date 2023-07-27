import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { accountState, isAccountState } from '../../state/atoms';

const isAccountValid = (account: string): boolean => {
    const accountRegex = /^[1-9][0-9]{8,13}$/;
    return accountRegex.test(account);
};

const Account = (): JSX.Element => {
    const [account, setAccount] = useRecoilState(accountState);
    const [isAccount, setIsAccount] = useRecoilState(isAccountState);
    const [isValidAccount, setIsValidAccount] = useState(true);
    const [isTyping, setIsTyping] = useState(false)

    const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAccount = event.target.value.replace(/\s/g, '');
        if (!isNaN(Number(newAccount)) && newAccount.length <= 13) {
            setIsValidAccount(isAccountValid(newAccount));
            setAccount(newAccount);
        } else {
            setIsValidAccount(false);
        }
        if (!isNaN(Number(newAccount)) && newAccount.length <= 13 && newAccount.length >= 9) {
            setIsAccount(true);
        }

        setIsTyping(newAccount.length > 0);
    };


    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">계좌 등록</span>
                    {isTyping && (
                        <span className="password-error text-sm text-primary">
                            9~13자리의 숫자로 작성해주세요.
                        </span>
                    )}
                </label>
                <input
                    type="text"
                    placeholder="숫자로 작성해주세요."
                    className={`input input-bordered input-primary ${!isValidAccount ? 'input-error' : ''}`}
                    value={account}
                    onChange={handleAccountChange}
                />
            </div>
        </>
    );
};

export default Account;
