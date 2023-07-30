import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accountDataState, isCorrectAccountPasswordState } from '../../state/atoms';

const Keypad = () => {
    const [inputValue, setInputValue] = useState('');
    const [isOpenKeypad, setIsOpenKeypad] = useState(false);
    const [password, setPassword] = useState('');
    const [accountData, setAccountData] = useRecoilState(accountDataState);
    const [isCorrectAccountPassword, setIsCorrectAccountPassword] = useRecoilState(isCorrectAccountPasswordState);
    const navigate = useNavigate()
    const openKeypad = () => {
        setIsOpenKeypad((prev) => !prev);
    };

    if (!accountData) {
        setAccountData({
            account: "",
            accountPassword: "",
            balance: 0,
            bankName: "",
            email: "",
        });
        navigate('/not-a-user')
    }



    const handleButtonClick = (num) => {
        if (inputValue.length < 6) {
            setInputValue((prevValue) => prevValue + num);
        }
    };


    const handleBackspaceClick = () => {
        setInputValue((prevValue) => prevValue.slice(0, -1));
    };

    const handleClearClick = () => {
        setInputValue('');
    };

    useEffect(() => {
        // 입력한 값과 Firestore의 accountPassword 값을 비교하여 키패드를 열거나 닫습니다.

        if (inputValue.length === 6) {
            if (inputValue === accountData.accountPassword) {
                setIsOpenKeypad(false);
                setIsCorrectAccountPassword(true);


            } else {
                // 비밀번호가 다르면 1초 후에 inputValue 초기화
                setTimeout(() => {
                    setInputValue('');
                    setIsCorrectAccountPassword(false);
                }, 2000);
            }
        }

        // 콘솔에 출력
        console.log('keyPad useEffect 실행됨!');
    }, [accountData.accountPassword, inputValue, setIsCorrectAccountPassword]);



    return (
        <>
            <input
                readOnly
                type="text"
                value={inputValue}
                onChange={(e) => setPassword(e.target.value)}
                onClick={openKeypad}
                placeholder="6자리 비밀번호를 입력하세요."
                className="input input-bordered input-primary"
            />
            {isCorrectAccountPassword === false && inputValue.length === 6 && (
                <span className="password-error text-sm text-error ml-1 mt-1">
                    비밀번호가 틀렸습니다!
                </span>
            )}
            {isOpenKeypad ? (
                <div className="shadow-xl rounded-xl">
                    <div className="flex mx-3 mt-2">
                        <i className='bx bxs-bell-ring text-primary flex px-1'></i>
                        <span className="text-sm text-primary">키보드 보안 시스템 작동 중입니다.</span>
                    </div>
                    <div className="grid grid-cols-3 grid-rows-4 gap-1 p-2 card-body shadow-">
                        <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(1)}>1</button>
                        <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(2)}>2</button>
                        <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(3)}>3</button>
                        <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(4)}>4</button>
                        <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(5)}>5</button>
                        <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(6)}>6</button>
                        <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(7)}>7</button>
                        <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(8)}>8</button>
                        <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(9)}>9</button>
                        <button className="btn btn-primary btn-sm text-base-100" onClick={handleBackspaceClick}>지우기</button>
                        <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(0)}>0</button>
                        <button className="btn btn-primary btn-sm text-base-100" onClick={handleClearClick}>초기화</button>

                    </div>
                </div>
            ) : ''}
        </>

    );
};

export default Keypad;