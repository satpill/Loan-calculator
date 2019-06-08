import React, { Component } from 'react'
import './Display.css';

export class DisplayPayment extends Component {
    render() {
        const{paymentduration} = this.props;
        const payment= paymentduration.amount.toString();

        return (
        <React.Fragment>
            <div className="container mb-5">
                <div className="row d-flex justify-content-center">
                   <div className="col-md-8 d-flex-column borderbox mt-5 justify-content-center">
                       <div>
                       <label htmlFor="payment" className="mx-auto">Monthly Payment: $</label>
                       </div>
                      <h1 className="odometer">{payment}</h1>
                   </div>
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default DisplayPayment;
