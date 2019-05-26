import React from 'react';

const Search = ({value,onChange}) => {
    return ( 
        <input  style = {{marginBottom:20}} 
        className = "form-control" 
        type ="text" 
        name ="query"
        value = {value}
        placeholder="Search.."
        onChange = {e => onChange(e.currentTarget.value)}>
            
      </input>

     );
}
 
export default Search;