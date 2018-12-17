import React, { Component } from 'react'
//import * as BooksAPI from './BooksAPI'

class Book extends Component {

    handleShelfChanger = (e) => {
        this.props.changeShelf(this.props.book, e.target.value)
    }
    
    render () {
        const { book } = this.props

        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={this.handleShelfChanger}>
                        <option value='move' disabled>Move</option>
                        <option value='currentlyReading' >Currently Reading</option>
                        <option value='wantToRead' >Want to Read</option>
                        <option value='read' >Read</option>
                        <option value='none' >None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

export default Book