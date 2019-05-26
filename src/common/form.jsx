import React, {Component} from 'react';
import Joi from 'joi-browser'; 
import Input from './input';
import DropDown from './dropdown';

class Form extends Component {
    state = { 
        data: {}, 
        errors: {}
     }


    validateProperty = ({name, value}) => {
        const obj = {[name]:value}; 
        const schema = {[name]:this.schema[name]};
        const {error} = Joi.validate(obj,schema); 
        return error? error.details[0].message : null; 
      
    };


    validate = () => {
        const options = {abortEarly: false}; 
        const {error} = Joi.validate(this.state.data,this.schema,options );
       
        if (!error) return null; 
        const errors = {}; 
        for (let i of error.details)
             errors[i.path[0]] = i.message;
        
         return errors; 
    };
  

    handleSubmit = event => {
        event.preventDefault(); 
        const errors = this.validate(); 
        console.log(errors); 
        this.setState({errors: errors || {} }); 
        if(errors) return; 
        //Call the server 
        
        this.doSubmit();
    };


    handleChange = ({currentTarget:input})=> {
        const errors = {...this.state.errors}; 
        const errorMessage = this.validateProperty(input); 
        if(errorMessage) errors[input.name] = errorMessage; 
        else delete errors[input.name]; 
        const data ={...this.state.data};
        data[input.name] =input.value; 
        this.setState({data,errors}); 

    };

    renderButton(label) {

        return(
               
        <button disabled = {this.validate} className="btn btn-primary">{label}</button>);
    }


    renderInput(name,label,type ="text") {
        return(
        <Input
        type = {type} 
        name = {name} 
        value = {this.state.data[name]}
        label = {label}
        onChange = {this.handleChange}
        error = {this.state.errors[name]} />
        ); 
    }

     renderDropDown(name,label,options) {
        return(
        <DropDown
        name = {name} 
        value = {this.state.data[name]}
        label = {label}
        onChange = {this.handleChange}
        options = {options}
        error = {this.state.errors[name]} />
        ); 
    }


}
 
export default Form;