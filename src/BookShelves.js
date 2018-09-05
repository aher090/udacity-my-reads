import React, {Component} from 'react'
import ListOfBooks from './ListOfBooks'

class BookShelves extends Component{
    render(){
        const {books, updateShelf} = this.props;
        return(
            <div>
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div>
                    <ListOfBooks shelf="Currently Reading" books={
                        books.filter((book) => book.shelf === "currentlyReading")
                    } updateShelf={updateShelf} />
                    <ListOfBooks shelf="Want to read" books={
                        books.filter((book) => book.shelf === "wantToRead")
                    } updateShelf={updateShelf} />
                    <ListOfBooks shelf="Read" books={
                        books.filter((book) => book.shelf === "read")
                    } updateShelf={updateShelf} />
                </div>        
            </div>
        )
    }
}

export default BookShelves
