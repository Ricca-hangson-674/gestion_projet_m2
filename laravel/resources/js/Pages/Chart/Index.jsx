import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Sprint",
        },
    },
};

export default function Chart(props) {
    const { auth, labelsUpchart, labelsDownchart, datasUpchart, datasDownchart} = props;

    const data = {
        labels: [...labelsUpchart],
        datasets: [
            {
                label: "Up",
                // data: labels.map(() => randomIntFromInterval(-1000, 1000)),
                data: [...datasUpchart],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Down",
                // data: labels.map(() => randomIntFromInterval(-1000, 1000)),
                data: [...datasDownchart],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              
            },
        ],
    };

    console.log(labelsUpchart, labelsDownchart, datasUpchart, datasDownchart)

    return (
        <AdminLayout auth={auth}>
            <Line options={options} data={data} />;
        </AdminLayout>
    );
}
