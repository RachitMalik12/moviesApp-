import React, { Component } from 'react';

class ListGroup extends Component {
   
    render() { 
        const {items,currentGenre,valueProperty, textProperty} = this.props; 
        return (
            <ul className = "list-group">

            {items.map(
                item => ( (item ===currentGenre)? <li
                className = "clickable" key = {item[valueProperty]} 
                onClick = {() => this.props.onClick(item)} className="list-group-item active">{item[textProperty]}</li> : 
                <li className = "clickable" key = {item[valueProperty]}  onClick = {()=> this.props.onClick(item)} className = "list-group-item"> {item[textProperty]} </li> ))}
                
        
            
            </ul>
         );
    }
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}; 
 
export default ListGroup;