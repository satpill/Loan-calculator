import React, { Component } from 'react'
import SliderAmount from '../component/slider/SliderAmount';
import SliderDuration from '../component/slider/SliderDuration';
import DisplayInterest from '../component/display/DisplayInterest';
import DisplayPayment from '../component/display/DisplayPayment';
import axios from 'axios';
import './LoanCalc.css';
import Spinner from '../component/UI/spinner/Spinner';

export class loanCalc extends Component {
    state = {
        loanData:{
         interestRate:"",
         monthlyPayment:{
           amount:"",
           currency:'USD'
         },
         numPayments:"",
         principal:{
           amount:"",
           currency:'USD'
         }
       },
        api: "https://ftl-frontend-test.herokuapp.com/interest?amount=500&numMonths=6",
        baseapi: "https://ftl-frontend-test.herokuapp.com/interest?amount=",
        nummonth: "&numMonths=",
        amountvalue: 500,
        monthduration: 6,
        error: false
       }
     
     
        getLoanStatus = () => {
          
             axios.get(this.state.api).then(res => {
             this.setState(prevState => (({
               loanData:{
                 ...prevState.loanData,
                 interestRate: {
                   ...prevState.loanData.interestRate,
                    interestRate: res.data.interestRate
                 },
                 monthlyPayment: {
                   ...prevState.loanData.monthlyPayment,
                   amount: res.data.monthlyPayment.amount,
                   currency: res.data.monthlyPayment.currency
                 },
                 numPayments: {
                   ...prevState.loanData.numPayments,
                    numPayments: res.data.numPayments
                 },
                 principal: {
                   ...prevState.loanData.principal,
                   amount: res.data.principal.amount,
                   currency: res.data.principal.currency
                 }
               }}))
             )})
             .catch(error => {
               if(error){
                 this.setState({
                   error: true
                 })
               }
             })
            
          
        }
    
       componentDidMount(){
         this.getLoanStatus();
       }

       getInterestPaymentData = () => {
        const{amountvalue,monthduration,baseapi,nummonth} = this.state;

         this.setState({
          api: `${baseapi}${amountvalue}${nummonth}${monthduration}`
         }, () => {
          this.getLoanStatus();
        })
       }

       sliderAmountValue = (e) => {
      
            this.setState({
                amountvalue:e.target.value,
          
        },() => {
          this.getInterestPaymentData();
        })
       }

       sliderMonthDuration = (e) => {
            
        this.setState({
          monthduration:e.target.value
        },() => {
          this.getInterestPaymentData();
        })
       }
       

    render() {
      let LoanDisplay = <Spinner />

      if(this.state.loanData){
        LoanDisplay = (
          <React.Fragment>
          <h1 className="text-center mx-auto my-4 textcolor">Loan calculator</h1>
          <div className="container">
              <div className="row">
                 <div className="col-md-6">
                 <DisplayInterest interest={this.state.loanData.interestRate}/>
                 </div>
  
                 <div className="col-md-6">
                 <DisplayPayment paymentduration={this.state.loanData.monthlyPayment}/>
                 </div>
              </div>
          </div>
  
          <div className="container">
              <div className="row">
                 <div className="col-md-6">
                 <SliderAmount slidervalue={this.sliderAmountValue} amountvalue={this.state.amountvalue} />
                 </div>
                 <div className="col-md-6">
                 <SliderDuration slidermonthduration={this.sliderMonthDuration} durationvalue={this.state.monthduration} />
                 </div>
              </div>
          </div>
          </React.Fragment>
         )
      }
      
         
       if(this.state.error){
          LoanDisplay = <Spinner/>
                         
                        
       }
        return (
            <React.Fragment>
              {LoanDisplay}
            </React.Fragment>
        )
    }
}

export default loanCalc;
