import React, { Component } from 'react'
import './Slider.css';

export class SliderDuration extends Component {
    render() {
        
            const {slidermonthduration,durationvalue} = this.props;
            return (
                <form >
                    <label htmlFor="customRange">Duration:</label>
                    <span className="badge badge-dark float-right p-2">{durationvalue} month</span>
                    <input type="range" min="6" max="24" className="custom-range slider" value={durationvalue} onChange={slidermonthduration}/>
                </form>
        )
    }
}

export default SliderDuration
