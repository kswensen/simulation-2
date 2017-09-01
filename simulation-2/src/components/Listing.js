import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class Listing extends Component{
    constructor(props){
        super(props);

        this.state = {
            stepIndex: 0,
            finished: false,
            properties: [],
            propertyName: '',
            propertyDescription: '',
            address: '',
            city: '',
            state: '',
            zip: null,
            imgURL: '',
            loanAmount: 0,
            monthlyMortgage: 0,
            desiredRent: 0,
            filteredRent: null
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3021/api/properties").then(res => {       
            this.setState({
                properties: res.data
            })
        })
    }

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    handleCancel = () => {
        this.setState({
            stepIndex: 0,
            propertyName: '',
            propertyDescription: '',
            address: '',
            city: '',
            state: '',
            zip: null,
            imgURL: '',
            loanAmount: 0,
            monthlyMortgage: 0,
            desiredRent: 0
        })
    }

    filterInput = (rent) => {
        this.setState({
            filteredRent: rent
        })
    }

    filter = () =>{
        axios.get(`http://localhost:3021/api/properties/filter?value=${this.state.filteredRent}`).then(res => {
            this.setState({
                properties: res.data
            })
        })
    }

    reset = () => {
        axios.get("http://localhost:3021/api/properties").then(res => {       
            this.setState({
                properties: res.data,
                filteredRent: 0
            })
        })
    }

    propertyNameInput = (input) => {
        this.setState({
            propertyName: input
        })
    }

    propertyNameInput = (input) => {
        this.setState({
            propertyName: input
        })
    }

    propertyDescriptionInput = (input) => {
        this.setState({
            propertyDescription: input
        })
    }

    addressInput = (input) => {
        this.setState({
            address: input
        })
    }

    cityInput = (input) => {
        this.setState({
            city: input
        })
    }

    stateInput = (input) => {
        this.setState({
            state: input
        })
    }

    zipInput = (input) => {
        this.setState({
            zip: input
        })
    }

    imgURLInput = (input) => {
        this.setState({
            imgURL: input
        })
    }

    loanAmountInput = (input) => {
        this.setState({
            loanAmount: input
        })
    }
    
    monthlyMortgageInput = (input) => {
        this.setState({
            monthlyMortgage: input
        })
    }

    desiredRentInput = (input) => {
        this.setState({
            desiredRent: input
        })
    }

    deleteListing = (id) => {
        axios.delete('http://localhost:3021/api/properties/' + id).then(deleted => {
            if(deleted.status === 200){
                axios.get('http://localhost:3021/api/properties').then(prop => {
                    this.setState({
                        properties: prop.data
                    })
                })
            }
        })
    }

    handleContinue = () => {
        const config = {
            propertyName: this.state.propertyName,
            propertyDescription: this.state.propertyDescription,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            imgURL: this.state.imgURL,
            loanAmount: this.state.loanAmount,
            monthlyMortgage: this.state.monthlyMortgage,
            desiredRent: this.state.desiredRent
        }
        axios.post('http://localhost:3021/api/properties', config).then(res => {
            if(res.status === 200){
                axios.get('http://localhost:3021/api/properties').then(prop => {
                    this.setState({
                        properties: prop.data,
                        stepIndex: 0,
                        propertyName: '',
                        propertyDescription: '',
                        address: '',
                        city: '',
                        state: '',
                        zip: null,
                        imgURL: '',
                        loanAmount: 0,
                        monthlyMortgage: 0,
                        desiredRent: 0
                    })
                })
            }
        })
    }

    render(){
        const mappedProps = this.state.properties.map((property, index) => {
            return(<ul key={index} className="yourlistings" >
                    <img className="img" src={property.imgurl} />
                    <div className="nameAndDescription">
                        <h4>{property.propertyname}</h4>
                        <p>{property.propertydescription}</p>
                    </div>
                    <div className="otherInfo">
                        <p><b>Loan:</b> {property.loanamount}</p>
                        <p><b>Monthly Mortgage: </b> {property.monthlymortgage}</p>
                        <p><b>Desired Rent: </b> {property.desiredrent}</p>
                        <p><b>Address:</b> {property.address}</p>
                        <p><b>City:</b> {property.city}</p>
                        <p> <b>State:</b> {property.state}</p>
                        <p><b>Zip: </b>{property.zip}</p>
                    </div>
                    <div className="close" onClick={()=> this.deleteListing(property.id)}>X</div>
                </ul>
            )
        })
        return(
            <div className="App">
                {(this.state.stepIndex === 0) ?
                <div className="mainScreen">
                    <button className="addProp" onClick={() => this.handleNext()}>Add new property</button>
                    <h5>List properties with "desired rent" greator than: $</h5>
                    <input value={this.state.filteredRent} className="filterInput" onChange={(e) => this.filterInput(parseInt(e.target.value, 10))}/>
                    <button className="filterButton" onClick={() => this.filter()}>Filter</button>
                    <button className="reset" onClick={() => this.reset()}>Reset</button>
                    {mappedProps}
                </div>
                :
                (this.state.stepIndex === 1) ?
                <div className="step1">
                    <input value={this.state.propertyName} placeholder="Property Name" className="propNameInput" onChange={(e) => this.propertyNameInput(e.target.value)}/>
                    <input value={this.state.propertyDescription} placeholder="Property Description" className="propDesInput" onChange={(e) => this.propertyDescriptionInput(e.target.value)}/>
                    <button className="cancel" onClick={() => this.handleCancel()}>Cancel</button>
                    <button className="nextStep" onClick={() => this.handleNext()}>Next Step</button>
                </div>
                :
                (this.state.stepIndex === 2) ?
                <div className="step2">
                    <input value={this.state.address} placeholder="Address" className="propNameInput" onChange={(e) => this.addressInput(e.target.value)}/>
                    <input value={this.state.city} placeholder="City" className="propNameInput" onChange={(e) => this.cityInput(e.target.value)}/>
                    <input value={this.state.state} placeholder="State" className="propNameInput" onChange={(e) => this.stateInput(e.target.value)}/>
                    <input value={this.state.zip} placeholder="Zip" className="propNameInput" onChange={(e) => this.zipInput(parseInt(e.target.value, 10))}/>
                    <button className="cancel" onClick={() => this.handleCancel()}>Cancel</button>
                    <button className="prevStep" onClick={() => this.handlePrev()}>Previous Step</button>
                    <button className="nextStep" onClick={() => this.handleNext()}>Next Step</button>   
                </div>
                :
                (this.state.stepIndex === 3) ?
                <div className="step3">
                    <input value={this.state.imgURL} placeholder="Image URL" className="propNameInput" onChange={(e) => this.imgURLInput(e.target.value)}/>
                    <button className="cancel" onClick={() => this.handleCancel()}>Cancel</button>
                    <button className="prevStep" onClick={() => this.handlePrev()}>Previous Step</button>
                    <button className="nextStep" onClick={() => this.handleNext()}>Next Step</button>   
                </div>
                :
                (this.state.stepIndex === 4) ?
                <div className="step4">
                    <input value={this.state.loanAmount} placeholder="Loan Amount" className="propNameInput" onChange={(e) => this.loanAmountInput(parseInt(e.target.value, 10))}/>
                    <input value={this.state.monthlyMortgage} placeholder="Monthly Mortgage" className="propNameInput" onChange={(e) => this.monthlyMortgageInput(parseInt(e.target.value, 10))}/>
                    <button className="cancel" onClick={() => this.handleCancel()}>Cancel</button>
                    <button className="prevStep" onClick={() => this.handlePrev()}>Previous Step</button>
                    <button className="nextStep" onClick={() => this.handleNext()}>Next Step</button>   
                </div>
                :
                <div className="step5">
                    <input value={this.state.desiredRent} placeholder="Desired Rent" className="propNameInput" onChange={(e) => this.desiredRentInput(parseInt(e.target.value, 10))}/>
                    <button className="cancel" onClick={() => this.handleCancel()}>Cancel</button>
                    <button className="prevStep" onClick={() => this.handlePrev()}>Previous Step</button>
                    <button className="nextStep" onClick={() => this.handleContinue()}>Finish</button>   
                </div> }

            </div>
        )
    }
}
export default Listing;