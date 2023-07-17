import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isCheckedState } from '../../state/atoms';


const Checkbox = (): JSX.Element => {
    const [isChecked, setIsChecked] = useRecoilState(isCheckedState);

    const handleCheckboxChange = () => {
        const checkbox1 = document.getElementById('checkbox1') as HTMLInputElement;
        const checkbox2 = document.getElementById('checkbox2') as HTMLInputElement;

        if (checkbox1.checked && checkbox2.checked) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    };

    useEffect(() => {
        handleCheckboxChange();
    }, [isChecked]);

    return (
        <>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        id="checkbox1"
                        onChange={handleCheckboxChange}
                    />
                    <span className="label-text">만 14세 이상입니다.</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        id="checkbox2"
                        onChange={handleCheckboxChange}
                    />
                    <span className="label-text">서비스 정책에 동의합니다.</span>
                </label>
            </div>
        </>
    );
};

export default Checkbox;
