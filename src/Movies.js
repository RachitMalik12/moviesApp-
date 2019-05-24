import React, {Component} from 'react';

import { getMovies} from './services/fakeMovieService';
import Pagination from './common/pagination';
import paginate from './utils/paginate'; 
import ListGroup from './common/ListGroup';
import {getGenres} from './services/fakeGenreService';
import MoviesTable from './components/moviesTable';
import _ from 'lodash'; 


class Movies extends Component {
    state = { 
        movies: [], 
        count: getMovies().length,
        currentPage: 1, 
        pageSize: 4, 
        genres: [], 
        currentgenre: null, 
        sortColumn: {
            path:'title',
            order:'asc'
        }
       
     }


     componentDidMount(){
         const genres = [{_id: "", name:"All Genres"},...getGenres()]; 
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
   
        this.setState({currentgenre: genre,currentPage:1}); 
     
     }

     handleSort = sortColumn => {
  

         this.setState({sortColumn}); 
     }; 
    getPageddata = () => {


        const {
            pageSize, 
            currentPage,
            currentgenre,
            movies: allMovies,
            sortColumn } = this.state; 
        const filtered = currentgenre && currentgenre._id ? allMovies.filter((movie) => movie.genre._id === currentgenre._id) : allMovies ; 
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]); 
              
        
       
        const movies = paginate(sorted,currentPage, pageSize); 

        return {totalCount: filtered.length, data: movies}; 
    }
     
    render() { 
        
        const {
            pageSize, 
            currentPage,
            genres,
            currentgenre,
            sortColumn } = this.state; 
        if (this.state.count === 0) { 
            return <p align = "center" className = "lead" style = {this.style}> There are no movies </p> 
        }
        
        const {totalCount, data} = this.getPageddata(); 

        return (  
        
   
           
          <div className = "row">
           <div className = "col-3">
              
               <ListGroup onClick = {this.handleListGroupClick} 
               items = {genres}
               currentGenre = {currentgenre}/>
           </div> 

            <div className = "col">     
            <p align = "center" className = "lead" style = {this.style}> Showing {totalCount} movies </p> 
            <MoviesTable movies = {data}
                         onDelete = {this.handleDelete}
                         sortColumn = {sortColumn}
                         onLike = {this.handleLike}
                         onSort = {this.handleSort} />
           
            <Pagination itemsCount = {totalCount}
            pageSize = {pageSize}
            onPageChange = {this.handlePageChange}
            currentPage = {currentPage} />

            </div>
        
        </div>
    
       
            

        );
    }
}
 
export default Movies;