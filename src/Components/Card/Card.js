import React from 'react'
import './Card.css'

const Card = (props) => {
    return (
        <>
            <div className="card mt-5">
                <div className="title"><p>{props.place !== '' ? props.place : "Unknown" }</p></div>
                <div className='row'>
                    <div className='col'>
                        <p className='me-3'>{props.weather}</p>
                    </div>
                    <div className='col'>
                        <span className="icon">
                            <img alt={"icon"} src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} />
                        </span>
                    </div>
                </div>
                <div className="temp">{props.currTemp}<sup>°</sup>C</div>
                <div className="row">
                    <div className="col-4">
                        <div className="header">Minimum</div>
                        <div className="value">{props.minTemp}<sup>°</sup>C</div>
                    </div>
                    <div className="col-4">
                        <div className="header">Humidity</div>
                        <div className="value">{props.humidity}%</div>
                    </div>
                    <div className="col-4">
                        <div className="header">Maximum</div>
                        <div className="value">{props.maxTemp}<sup>°</sup>C</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card