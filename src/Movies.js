import React, {Component} from 'react';
import Like from './common/Like';
import { getMovies} from './services/fakeMovieService';
import Pagination from './common/pagination';
import paginate from './utils/paginate'; 

class Movies extends Component {
    state = { 
        movies: getMovies(), 
        count: getMovies().length,
        currentPage: 1, 
        pageSize: 4
       
     }

     style = {
         padding: "20px"
     };

     handleDelete = (movie) => {
           const movies = this.state.movies.filter(m => m._id !== movie._id);
           this.setState({movies});
           this.setState({count: this.state.count - 1});
           

         

     }

     handlePageChange = page => {
         console.log(this.state.currentPage);
         this.setState({currentPage: page}); 
         
     }

     handleLike = (movie) => {
         
         const movies = [...this.state.movies]; 
         const index = movies.indexOf(movie);
         movies[index] = {...movies[index]}; 
         movies[index].liked = !movies[index].liked; 
         this.setState({ movies}); 
     }

     
    render() { 
        
        const {pageSize, currentPage} = this.state; 
        if (this.state.count === 0) { 
            return <p align = "center" className = "lead" style = {this.style}> There are no movies </p> 
        }
        const movies = paginate(this.state.movies,currentPage, pageSize); 


        return (  
           

           

            <React.Fragment>     
            <p align = "center" className = "lead" style = {this.style}> Showing {this.state.count} movies </p> 
            <table className = "table"> 
             
                <thead>
                    <tr> 
                       <th scope = "col"> Title </th> 
                       <th scope = "col"> Genre </th> 
                       <th scope = "col"> Stock </th> 
                       <th scope = "col"> Rate </th> 
                       <th> </th>
                    </tr> 
                 </thead> 
                 <tbody> 
               
                        
                        {movies.map( movie => {
                            return(<tr key = {movie._id}>
                                <td> {movie.title} </td> 
                                <td> {movie.genre.name} </td> 
                                <td> {movie.numberInStock} </td> 
                                <td> {movie.dailyRentalRate}</td>
                                <td> <Like liked = {movie.liked}
                                           onClick = {() => this.handleLike(movie)} /> </td>
                                
                                <td> <button onClick= {() => this.handleDelete(movie)} className = "btn btn-danger btn-sm "> Delete </button> </td> 
                            </tr>); 

                        })} 
                        

                     
                 </tbody>
            </table>
            <Pagination itemsCount = {this.state.count}
            pageSize = {pageSize}
            onPageChange = {this.handlePageChange}
            currentPage = {currentPage} />
            </React.Fragment>
       
            

        );
    }
}
 
export default Movies;