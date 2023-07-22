import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emailState, isTransferState } from '../state/atoms';
import NavBar from '../components/common/NavBar'
import Banking from '../components/main/Banking';
import Transfer from '../components/main/Transfer';
import Summary from '../components/main/Summary';

const Home = (): JSX.Element => {

    const [email, setEmail] = useRecoilState(emailState);
    const [isTransfer, setIsTransfer] = useRecoilState(isTransferState);


    console.log(email)
    return (
        <>
            <div className="container min-h-screen">
                <NavBar />
                <div className="flex">
                    <Summary />

                    {isTransfer ? <Banking /> : <Transfer />}
                </div>
            </div>
        </>
    );
};

export default Home;
