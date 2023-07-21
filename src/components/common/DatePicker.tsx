import React, { ChangeEventHandler, useRef, useState } from 'react';

import { format, isValid, parse } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { DayPicker } from 'react-day-picker';
import { usePopper } from 'react-popper';

import '../../assets/css/day-picker.css'
import { useRecoilState } from 'recoil';
import { selectedDateState } from '../../state/atoms';

export default function DatePicker() {
    const [selected, setSelected] = useRecoilState(selectedDateState);
    const [inputValue, setInputValue] = useState<string>('');
    const [isPopperOpen, setIsPopperOpen] = useState(false);

    const popperRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
        null
    );

    const popper = usePopper(popperRef.current, popperElement, {
        placement: 'bottom-start'
    });

    const closePopper = () => {
        setIsPopperOpen(false);
        buttonRef?.current?.focus();
    };

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.currentTarget.value);
        const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());
        if (isValid(date)) {
            setSelected(date);
        } else {
            setSelected(undefined);
        }
    };

    const handleButtonClick = () => {
        setIsPopperOpen(true);
    };

    const handleDaySelect = (date: Date) => {
        setSelected(date);
        if (date) {
            setInputValue(format(date, 'MM-dd'));
            closePopper();
        } else {
            setInputValue('');
        }
    };

    return (
        <div className="border-b-2 border-primary w-1/5">
            <div ref={popperRef} className="flex relative">
                <input
                    size={10}
                    type="text"
                    placeholder={format(new Date(), 'MM-dd')}
                    value={inputValue}
                    onChange={handleInputChange}
                    className="input input-sm p-0 w-12 text-sm text-neutral"
                />
                <button
                    ref={buttonRef}
                    type="button"
                    aria-label="Pick a date"
                    onClick={handleButtonClick}
                >
                    <i className='bx bxs-calendar text-xl text-primary absolute left-10 top-1.5' ></i>
                </button>
            </div>
            {isPopperOpen && (
                <FocusTrap
                    active
                    focusTrapOptions={{
                        initialFocus: false,
                        allowOutsideClick: true,
                        clickOutsideDeactivates: true,
                        onDeactivate: closePopper,
                        fallbackFocus: buttonRef.current
                    }}
                >
                    <div
                        tabIndex={-1}
                        style={popper.styles.popper}
                        className="dialog-sheet"
                        {...popper.attributes.popper}
                        ref={setPopperElement}
                        role="dialog"
                        aria-label="DayPicker calendar"
                    >
                        <DayPicker
                            initialFocus={isPopperOpen}
                            mode="single"
                            defaultMonth={selected}
                            selected={selected}
                            onSelect={handleDaySelect}
                        />
                    </div>
                </FocusTrap>
            )}
        </div>
    );
}