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
     

       /*------------------------------------------------------------------------------
       ----------It fetch the data from the API and  in immutable it store the data----
       ---------------------------------in state--------------------------------------
       ------------------------------------------------------------------------------- */
     
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


       /*------------------------------------------------------------------------------
       ----- When component mount it call a function to fetch the data------------------
       ------------------------------------------------------------------------------- */
       componentDidMount(){
         this.getLoanStatus();
       }


       /*------------------------------------------------------------------------------
       ----- set the state api value with updated api value and call a function to------
       -------------------fetch the data from API---------------------------------------
       ------------------------------------------------------------------------------- */

       getInterestPaymentData = () => {
        const{amountvalue,monthduration,baseapi,nummonth} = this.state;

         this.setState({
          api: `${baseapi}${amountvalue}${nummonth}${monthduration}`
         }, () => {
          this.getLoanStatus();
        })
       }



       /*------------------------------------------------------------------------------
       -----AmountValue value set when slider component of sliderDuration change and 
       --------------call a function to update the UI with updated value---------------
       ------------------------------------------------------------------------------- */
       sliderAmountValue = (e) => {
      
            this.setState({
                amountvalue:e.target.value,
          
        },() => {
          this.getInterestPaymentData();
        })
       }


       /*------------------------------------------------------------------------------
       -----Monthduration value set when slider component of sliderDuration change and 
       --------------call a function to update the UI with updated value---------------
       ------------------------------------------------------------------------------- */
       sliderMonthDuration = (e) => {        
            
        this.setState({
          monthduration:e.target.value
        },() => {
          this.getInterestPaymentData();
        })
       }
       


    render() {

      /*-Initially when data is not available at that time spinner is loaded--*/
      let LoanDisplay = <Spinner />


      /*--If data is available it load the following JSX code --*/

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
                 <div className="col-md-6 col-lg-6  mx-auto">
                 <SliderAmount slidervalue={this.sliderAmountValue} amountvalue={this.state.amountvalue} />
                 </div>
                 <div className="col-md-6 col-lg-6  mx-auto">
                 <SliderDuration slidermonthduration={this.sliderMonthDuration} durationvalue={this.state.monthduration} />
                 </div>
              </div>
          </div>
          </React.Fragment>
         )
      }
      
      /*--when there is a error the following code load the spinner and error message--*/

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
