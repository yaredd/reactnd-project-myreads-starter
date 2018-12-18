import React, { Component } from 'react'
import Books from './Books'

class BookShelf extends Component {

    render () {
        const shelfSelector = {'currentlyReading': 'Currently Reading', 'wantToRead': 'Want to Read', 'read': 'Read'}
        const { shelf, booksOnShelf, changeShelf} = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfSelector[shelf]}</h2>
                <div className="bookshelf-books">
                    <Books shelf={shelf} books={booksOnShelf} changeShelf={changeShelf} />
                </div>
            </div>
        )
    }
}

export default BookShelf