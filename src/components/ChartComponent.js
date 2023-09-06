import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Top Referrals',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};


const ChartComponent = () => {
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        fetch('https://api.orderreadyapp.com/winners')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFetchedData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const chartData = {
        labels: [],
        datasets: [{
            label: 'Referrals in %',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    };

    if (fetchedData) {
        fetchedData.data.topReferrals.forEach(referral => {
            chartData.labels.push(referral.name);
            chartData.datasets[0].data.push(referral.percentage);
        });
    }

    return (
        <div>
            {fetchedData ? <Bar data={chartData} options={{ maintainAspectRatio: true }} /> : <p>Loading...</p>}
        </div>
    );
}

export default ChartComponent;
