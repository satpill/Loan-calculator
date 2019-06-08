import React, { Component } from 'react';
import './Slider.css';

export class SliderAmount extends Component {

    render() {
        const {slidervalue,amountvalue} = this.props;
        return (
            <form >
                <label htmlFor="customRange">Amount:</label>
                <span className="badge badge-dark float-right p-2">$ {amountvalue}</span>
                <input type="range" min="500" max="5000" className="custom-range slider" value={amountvalue} onChange={slidervalue}/>
            </form>
           
        )
    }
}

export default SliderAmount;
