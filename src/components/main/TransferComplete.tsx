import React from 'react';
import { useRecoilState } from 'recoil';
import { isBankingState } from '../../state/atoms'


const TransferComplete = (): JSX.Element => {
    const [isBanking, setIsBanking] = useRecoilState(isBankingState);
    const handelToHome = () => {
        setIsBanking(0)

    }

    return (
        <div className="card-body">
            <hr />
            <div className="text-center p-4"> 송금을 완료했습니다! 🎉</div>
            <div className="btn-banking p-4 flex justify-around gap-1">
                <button onClick={handelToHome} className="btn btn-outline btn-primary w-1/2 btn-hover">이전화면으로</button>
            </div>
        </div>
    );
};

export default TransferComplete;
