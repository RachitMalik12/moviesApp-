import React, { Component } from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';
import DropDown from '../common/dropdown';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, getMovies,saveMovie } from '../services/fakeMovieService';


class MovieForm extends Form {

 

    state ={
        data: { title:'',genreId:'',numberInStock:'' ,dailyRentalRate:''},
        errors:{},
        genres:[]

    };

    schema = {
        _id: Joi.string(), 
      
        title: Joi.string().required().label("Title"), 
        genreId: Joi.string().required().label("Genre"),
        numberInStock:Joi.number().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"), 

    }
   doSubmit = () =>{
       saveMovie(this.state.data); 
       this.props.history.push("/movies"); 


    
   }
    componentDidMount = () => {
        const {match,history} = this.props; 
        const genres = getGenres(); 
        this.setState({genres});

        if(match.params.id === "new") return; 

         const movie = getMovie(match.params.id)
         if (!movie){
            history.replace("/not-found"); 
            return; 
            
         } 

         this.setState({data:this.getMovieDetails(movie) })

    }

    getMovieDetails = movie => {
        return {
            _id: movie._id, 
            title: movie.title, 
            genreId: movie.genre._id, 
            numberInStock: movie.numberInStock, 
            dailyRentalRate: movie.dailyRentalRate

        }
    }
  

    render() { 
        const {genres} = this.state; 
        return (  
            
           <React.Fragment>
            <h1> Movie Form </h1>
            <form onSubmit = {this.handleSubmit}>
            {this.renderInput('title','Title')}
            {this.renderDropDown('genreId','Genre',genres)}
            {this.renderInput( 'numberInStock','Number in Stock','number')}
            {this.renderInput('dailyRentalRate','Rate','number')}
            {this.renderButton("Save")}
            </form>

            
            </React.Fragment>
        
        );
    }
}
 
export default MovieForm;
