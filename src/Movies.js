import React, {Component} from 'react';
import Like from './common/Like';
import { getMovies} from './services/fakeMovieService';
import Pagination from './common/pagination';
import paginate from './utils/paginate'; 
import ListGroup from './common/ListGroup';
import {getGenres} from './services/fakeGenreService';

class Movies extends Component {
    state = { 
        movies: [], 
        count: getMovies().length,
        currentPage: 1, 
        pageSize: 4, 
        genres: [], 
        currentgenre: null
       
     }


     componentDidMount(){
         const genres = [{name:"All Genres"},...getGenres()]; 
         this.setState({genres, movies: getMovies()});  
     }

     style = {
         padding: "40px"
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
     handleListGroupClick = genre =>
     {
         console.log("clicked", genre);
        this.setState({currentgenre: genre,currentPage:1}); 
     
     }

     
    render() { 
        
        const {pageSize, currentPage,genres,currentgenre,movies: allMovies} = this.state; 
        if (this.state.count === 0) { 
            return <p align = "center" className = "lead" style = {this.style}> There are no movies </p> 
        }
        const filtered = currentgenre && currentgenre._id ? allMovies.filter((movie) => movie.genre._id === currentgenre._id) : allMovies ; 
              
        
       
        const movies = paginate(filtered,currentPage, pageSize); 


        return (  
           
          <div className = "row">
           <div className = "col-3">
              
               <ListGroup onClick = {this.handleListGroupClick} 
               items = {genres}
               currentGenre = {currentgenre}/>
           </div> 

            <div className = "col">     
            <p align = "center" className = "lead" style = {this.style}> Showing {filtered.length} movies </p> 
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
            <Pagination itemsCount = {filtered.length}
            pageSize = {pageSize}
            onPageChange = {this.handlePageChange}
            currentPage = {currentPage} />

            </div>
        
        </div>
       
            

        );
    }
}
 
export default Movies;