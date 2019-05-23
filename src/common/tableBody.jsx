import React, {Component} from 'react';
import _ from 'lodash'; 

 class TableBody extends Component {

    renderCell = (item, col) =>  {
        if (col.content) return col.content(item);
        return _.get(item,col.path);  

    }; 

    createKey = (item, column) => {
        return item._id + (column.path || column.key)

    }
    
     render() { 
         const {data,columns} = this.props;
         return ( 
             <tbody> 
               
                    {data.map( item => <tr key= {item._id}> 
                        {columns.map( column => <td key={this.createKey(item, column)}>{this.renderCell(item, column)} </td>)}
                        </tr>)}
                    
           
             </tbody>

          );
     }
 }
  
 export default TableBody;