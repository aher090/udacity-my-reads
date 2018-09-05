import React, {Component} from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component{
    render(){
        const {book, updateShelf} = this.props;
        const {imageLinks={}, title, shelf, authors=[]} = book;
        const {thumbnail} = imageLinks;
        return(
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                    <BookShelfChanger book={book} shelf={shelf} updateShelf={updateShelf} />
                    </div>
                    <div className="book-title">{title}</div>                    
                    {   
                        authors.map((author, index) => (
                            <div key={index} className="book-authors">{author}</div>
                        ))
                    }
                </div>
            </li>
        )
    }
}

export default Book