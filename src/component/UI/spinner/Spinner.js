import React, { Component } from 'react'
import './Spinner.css';
export class spinner extends Component {
    render() {
        return (
            <React.Fragment>
              <div className="loader">Loading...</div>
              <h1 className="text-center">sorry,something went wrong...</h1>
            </React.Fragment>
            
        )
    }
}

export default spinner;
