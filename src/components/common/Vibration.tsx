import React from 'react'

const Vibration = (target: Element) => {
    target.classList.add("vibration");

    setTimeout(function () {
        target.classList.remove("vibration");
    }, 400);
    //0.4초 딜레이
}

export default Vibration