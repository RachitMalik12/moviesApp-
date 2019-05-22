import React from 'react';
import PropTypes from 'prop-types'; 


const Pagination = props => {
    const {itemsCount, pageSize, currentPage, onPageChange } = props; 
    console.log(currentPage); 
    const pagesCount = Math.ceil(itemsCount/pageSize);
    if (pagesCount === 1) return null; 
    const pages = []; 
    for (var i = 0; i<pagesCount; i++){
        pages[i] = i+1; 
    }


return (
     <nav className = "pagination">
         {pages.map(
             page => (
                 
                <li key= {page} className = {page === currentPage ? 'page-item active' 
            : 'page-item'}> 
            <a  href= "#" onClick = {() => onPageChange(page) }
            className = "page-link"> {page}</a> 
                </li>

             
         ))}
         
     </nav> 

);


}

// eslint-disable-next-line no-unreachable
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currrentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired 

     
}; 

export default Pagination;