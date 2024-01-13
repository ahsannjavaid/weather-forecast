import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = (props) => {
    let date = new Date().getDate()
    const data = [
        {
            Temperature: props.data.day1Temp,
            day: date++
        },
        {
            Temperature: props.data.day2Temp,
            day: date++
        },
        {
            Temperature: props.data.day3Temp,
            day: date++
        },
        {
            Temperature: props.data.day4Temp,
            day: date++
        },
        {
            Temperature: props.data.day5Temp,
            day: date++
        },
    ];
    return (
        <>
            <div className="my-chart">
                <LineChart className='pt-2'
                    width={340}
                    height={280}
                    data={data}
                >
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Temperature" stroke="blueviolet" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        </>
    )
}

export default Chart