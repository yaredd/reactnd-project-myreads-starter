import React, { Component } from 'react'
import Book from './Book'

class Books extends Component {

    render () {
        return (
            <ol className="books-grid">
                {this.props.books.map((book) => (
                    <li key={book.id}><Book book={book} changeShelf={this.props.changeShelf} /></li>
                ))}
            </ol>
        )
    }
}

export default Books