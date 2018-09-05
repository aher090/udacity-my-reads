import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component{
    render(){
        const {searchBook, filteredBooks, updateShelf} = this.props
        return(
            <div className="search-books">
            <div className="search-books-bar">
            <Link 
                className='close-search'
                to='/'>
                Close
            </Link>
            <div className="search-books-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search by title or author"                    
                    onChange={(e) => searchBook(e.target.value)}
                />
            </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
            {
                filteredBooks.map(book => (
                    <Book book={book} key={book.id} updateShelf={updateShelf}/>
                ))
            }
            </ol>
            </div>
        </div>
      )
    }
}

export default SearchBooks 
