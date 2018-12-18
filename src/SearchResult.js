import React , { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

class SearchResult extends Component {
    state = {
        books: []
    }

    handleSearch = (e) => {
        const queryString = e.target.value
        if (queryString.length === 0) {
            this.setState({books: []})
        }else {
            BooksAPI.search(queryString).then((books) => {
                if (books.length > 0) {
                  this.setState( () => ({ books: books.map((book) => { 
                      book.shelf = this.props.getShelfFromBook(book)
                      return book
                  })}))
                }else {
                    this.setState({books: []})
                }
            })
        }
    }

    render () {

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={this.props.closeSearch}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by subject" onChange={this.handleSearch}/>

                <Books changeShelf={this.props.changeShelf} books={this.state.books} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
            </div>
        )
    }
}

export default SearchResult