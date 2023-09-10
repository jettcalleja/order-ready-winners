// src/CountdownToMidnight.js
import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const CountdownToMidnight = (props) => {
    const [timeLeft, setTimeLeft] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            // Get current time in Manila
            const manilaTime = moment.tz("Asia/Manila");

            // Get the time remaining until 12 AM in Manila
            const nextMidnight = manilaTime.clone().add(1, 'day').startOf('day');
            const msLeft = nextMidnight.diff(manilaTime);

            setTimeLeft(msLeft);
        }, 1000);

        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, []);

    const formatTimeLeft = (ms) => {
        const duration = moment.duration(ms);
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    console.log(props.winner);

    return (
        <div>
            {timeLeft <= 0 ? (props.winner && `Congratulations ${props.winner}!!`) || '' : `Time left: ${formatTimeLeft(timeLeft)}`}
        </div>
    );
};

export default CountdownToMidnight;
