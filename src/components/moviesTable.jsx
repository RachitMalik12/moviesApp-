
import React, { Component } from 'react';
import Like from '../common/Like'; 
import TableHeader from '../common/tableHeader';
import TableBody from '../common/tableBody';

class MoviesTable extends Component {
    coloumns = [
        {path:'title',label:'Title'},
        {path:'genre.name',label:'Genre'},
        {path:'numberInStock',label:'Stock'},
        {path:'dailyRentalRate',label:'Rate'},
        {key: 'like',
         content: movie => <Like liked = {movie.liked}
         onClick = {() => this.props.onLike(movie)} />},
        {key: 'delete',
        content: movie =>  <button onClick= {() => this.props.onDelete(movie)} className = "btn btn-danger btn-sm "> Delete </button>}
    ]
    
    
    render() { 
        
        const {movies,sortColumn,onSort} = this.props; 
        return (  
            <table className = "table"> 
                 
             <TableHeader coloumns = {this.coloumns}
                          onSort = {onSort}
                          sortColumn = {sortColumn} />
            <TableBody data = {movies} 
                        columns = {this.coloumns}/>

           
          
        </table>
        );
    }
}
 


export default MoviesTable;