import React from 'react';

const Keypad = () => {
    const handleButtonClick = (n: number) => {

    };

    return (
        <div className="shadow-xl rounded-xl">
            <div className="flex mx-3 mt-2">
                <i className='bx bxs-bell-ring text-primary flex px-1'></i>
                <span className="text-sm text-primary">키보드 보안 시스템 작동 중입니다.</span>
            </div>
            <div className="grid grid-cols-3 grid-rows-4 gap-1 p-2 card-body shadow-">
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(1)}>1</button>
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(2)}>2</button>
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(3)}>3</button>
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(3)}>4</button>
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(3)}>5</button>
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(3)}>6</button>
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(3)}>7</button>
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(3)}>8</button>
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(3)}>9</button>
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(3)}>지우기</button>
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(3)}>0</button>
                <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick(3)}>초기화</button>

            </div>
        </div>
    );
};

export default Keypad;