import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves'
import SearhBooks from './SearchBooks'
import { Route } from 'react-router-dom'
import {Link} from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: [],
    filteredBooks: []
  }

  componentDidMount() {
    this.getBooks()
  }

  /**
   * getBooks : Method returns all the books 
   */
  getBooks = () => {
    BooksAPI.getAll().then(response => {      
      this.setState({
        books: response
      })
    })
  }

  /**
   * searchBook : Method search for a list of books based on the query 
   */
  searchBook = (query) => {
    if (query) {
      BooksAPI
        .search(query)
        .then((result) => {
          this.updateSearchResult(result)
          if (result.error !== 'empty query') {
            this.setState({filteredBooks: result})
          } else {
            this.setState({filteredBooks: []})
          }
        })
    } else {
      this.setState({filteredBooks: []})
    }
  }

  /** 
   * updateShelf : Method updates shelf after moving the book 
  */
  updateShelf = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(updated => (BooksAPI.getAll().then((response) => {
        this.setState({books: response})
        this.updateSearchResult(this.state.filteredBooks)
      })))
  }

  /**
   * updateSearchResult : Method updates filteredBooks in the state as per the search result
   */
  updateSearchResult = (values) => {
    for (let value of values) {
      for (let book of this.state.books) {
        if (value.id === book.id) {
          value.shelf = book.shelf
        }
      }
    }
    this.setState({filteredBooks: values})
  }

  render() {
    return (
      <div className="app">
        <div>
          <Route exact path='/' render={() => (  
            <div className="list-books">  
              <BookShelves 
                books={this.state.books}
                updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
              />
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>            
            </div>
          )}/>
          <Route path='/search' render={({ history }) => (
            <SearhBooks 
              filteredBooks={this.state.filteredBooks}
              searchBook={(query) => this.searchBook(query)}
              updateShelf={(book, shelf) => this.updateShelf(book, shelf)}/>
          )}/>
        </div>
      </div>
    )
  }
}

export default BooksApp
