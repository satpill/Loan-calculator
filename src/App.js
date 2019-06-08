import React, {Component} from 'react';
import LoanCalc from './container/LoanCalc';
import './App.css';

export class App extends Component {
  render(){
  return (
      <React.Fragment>
        <LoanCalc />
      </React.Fragment>
    );
  }  
  }
 
export default App;
