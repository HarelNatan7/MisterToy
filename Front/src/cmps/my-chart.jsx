import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale,ArcElement, Tooltip, Legend);



export function MyChart() {
    const data = {
        labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"],
        datasets: [
            {
                label: 'Toys Amount',
                data: [12, 7, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };
    return (
        <div style={{width:'60%', margin:'auto'}}>
            <Doughnut data={data} />
        </div>
    )
}
