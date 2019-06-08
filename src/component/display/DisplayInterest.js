import React, { Component } from 'react'
import './Display.css';
export class DisplayInterest extends Component {
   
    render() {

        /*---------------------------------------------------------------------------------
        -------------The following code convert the object into array---------------------
        -----------and map to get the required data and then convert it--------------------
        ---------------------------------into string-------------------------------------------
        ----------------------------------------------------------------------------------*/

        const{interest} = this.props;
        const interestrate = Object.keys(interest).map(res => {
            return interest[res]
        })
        const interestvalue= interestrate.toString();
        return (
            <div className="container mb-5">
                <div className="row d-flex justify-content-center">
                   <div className="col-md-10 d-flex-column borderbox mt-5 justify-content-center">
                         <div>
                         <label htmlFor="payment" className="mx-auto">Interest: %</label>
                         </div>
                        <h1 className="odometer">{interestvalue}</h1>
                   </div>
                </div>
            </div>
        )
    }
}

export default DisplayInterest;
