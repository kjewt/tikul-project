import React, { useState } from 'react';

const Modal = (props) => {
    const [isHidden, setIsHidden] = useState(false);

    const close = () => {
        setIsHidden(true);
    };
    console.log(isHidden)
    return (
        <div className={`modal-overlay ${isHidden ? 'hidden' : ''}`}>
            <form method="dialog" className="modal-box Modal border">
                <h3 className="font-bold text-lg">{props.title}</h3>
                <p className="py-4">{props.content}</p>
                <div className="modal-action">
                    <button className="btn btn-primary text-base-100" onClick={close}>
                        닫기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Modal;
