import React, { Component } from 'react'
//import * as BooksAPI from './BooksAPI'

class Book extends Component {
    state = {
        shelf: undefined
    }

    handleShelfChanger = (e) => {
        this.props.changeShelf(this.props.book, e.target.value)
        this.setState({shelf: e.target.value})
    }

    getBooksShelf = () => {
        if (this.props.book.shelf) {
            return this.props.book.shelf
        }else if (this.state.shelf) {
            return this.state.shelf
        }else {
            return 'none'
        }
    }

    getAuthors = () => {
        const authors = this.props.book.authors
        if (authors) {
            return authors.join(', ')
        }else {
            return ''
        }
    }

    getCoverUrl = () => {
        const cover = this.props.book.imageLinks
        if (cover) {
            return cover.thumbnail
        }else {
            return '#'
        }
    }
    
    render () {
        const { book } = this.props

        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${this.getCoverUrl()})` }}></div>
                <div className="book-shelf-changer">
                    <select value={this.getBooksShelf()} onChange={this.handleShelfChanger}>
                        <option value='move' disabled>Move</option>
                        <option value='currentlyReading' >Currently Reading</option>
                        <option value='wantToRead' >Want to Read</option>
                        <option value='read' >Read</option>
                        <option value='none' >None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{this.getAuthors()}</div>
            </div>
        )
    }
}

export default Book