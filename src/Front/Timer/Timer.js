import React from 'react';

const timer = (props) => {
    const timeLeft = props.timeLeft;
    let minutes = parseInt(timeLeft / 60, 10);
    let seconds = parseInt(timeLeft % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return (
    <div className="section-timer">
        {minutes}:{seconds}
    </div>
    )

}

export default timer;