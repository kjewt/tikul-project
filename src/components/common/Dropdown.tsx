import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { bankNameState, transferBankNameState } from '../../state/atoms';

const DropDown = (props): JSX.Element => {
    const [selectedItem, setSelectedItem] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [bankName, setBankName] = useRecoilState(bankNameState);
    const [transferBankName, setTransferBankName] = useRecoilState(transferBankNameState);

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
        if (props.transfer) {
            setTransferBankName(item);
        } else {
            setBankName(item);
        }
        setIsOpen(false);
    };

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* 은행선택 드롭다운 */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">은행 선택</span>
                </label>
                <div className="dropdown" >
                    <label tabIndex={0} className="btn btn-outline justify-between text-accent w-full" onClick={toggleDropDown}>
                        <span className="label-text">{selectedItem}</span>
                        <i className='bx bx-chevron-down text-xl'></i>
                    </label>
                    <ul tabIndex={0} className={`dropdown-content overflow-y-auto h-52 w-full z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ${isOpen ? '' : 'hidden'}`}>
                        <li><a onClick={() => handleItemClick('NH농협')}>NH농협</a></li>
                        <li><a onClick={() => handleItemClick('KB국민')}>KB국민</a></li>
                        <li><a onClick={() => handleItemClick('신한')}>신한</a></li>
                        <li><a onClick={() => handleItemClick('우리')}>우리</a></li>
                        <li><a onClick={() => handleItemClick('IBK기업')}>IBK기업</a></li>
                        <li><a onClick={() => handleItemClick('하나')}>하나</a></li>
                        <li><a onClick={() => handleItemClick('새마을금고')}>새마을금고</a></li>
                        <li><a onClick={() => handleItemClick('카카오뱅크')}>카카오뱅크</a></li>
                        <li><a onClick={() => handleItemClick('토스뱅크')}>토스뱅크</a></li>
                        <li><a onClick={() => handleItemClick('케이뱅크')}>케이뱅크</a></li>
                        <li><a onClick={() => handleItemClick('부산')}>부산</a></li>
                        <li><a onClick={() => handleItemClick('대구')}>대구</a></li>
                        <li><a onClick={() => handleItemClick('신협')}>신협</a></li>
                        <li><a onClick={() => handleItemClick('SC제일')}>SC제일</a></li>
                        <li><a onClick={() => handleItemClick('씨티')}>씨티</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default DropDown;
