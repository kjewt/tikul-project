import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
    isEmailState,
    isSamePassportState,
    isAccountState,
    bankNameState,
    isSameAccountPassportState,
    isCheckedState,
} from '../../state/atoms';

const BtnJoin = (): JSX.Element => {
    const [isEmail, setIsEmail] = useRecoilState(isEmailState);
    const [isSamePassport, setIsSamePassport] = useRecoilState(isSamePassportState);
    const [isAcount, setIsAccount] = useRecoilState(isAccountState);
    const [bankName, setBankName] = useRecoilState(bankNameState);
    const [isSameAcount, setIsSameAcount] = useRecoilState(isSameAccountPassportState);
    const [isChecked, setIsChecked] = useRecoilState(isCheckedState);

    const checkList = [isEmail, isSamePassport, isAcount, Boolean(bankName), isSameAcount, isChecked];
    const isAllTrue = checkList.every((value) => value);

    useEffect(() => {
        console.log(checkList);
    });

    return (
        <>
            <div className="form-control my-6">
                <button className={`btn btn-primary ${isAllTrue ? '' : 'btn-disabled'}`}>
                    회원가입하기
                </button>
            </div>
        </>
    );
};

export default BtnJoin;
