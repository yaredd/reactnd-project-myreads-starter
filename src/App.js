import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import SearchResult from './SearchResult';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    "currentlyReading": [],
    "wantToRead": [],
    "read": []
  }

  componentWillMount = () => {
    this.getBooksOnShelf("currentlyReading")
    this.getBooksOnShelf("wantToRead")
    this.getBooksOnShelf("read")
  }

  getBooksOnShelf = (shelf) => (
    BooksAPI.getAll().then((books) => (
        this.setState({ [shelf]: books.filter( (book) => ( book.shelf === shelf)) })
    ))
  )

  changeShelf = (book, shelf ) => {
      const currShelf = book.shelf
      BooksAPI.update(book, shelf).then((j) => {
          this.getBooksOnShelf(currShelf)
          this.getBooksOnShelf(shelf)
      })
  }

  getShelfFromBook = (book) => {
    const myBooks = this.state.currentlyReading.concat(this.state.wantToRead).concat(this.state.read)
    const found = myBooks.find((b) => book.id === b.id)
    if (found) {
      return found.shelf
    }else {
      return undefined
    }

  }

  closeSearch = (e) => {
    this.setState({ showSearchPage: false })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchResult closeSearch={this.closeSearch} getShelfFromBook={this.getShelfFromBook} changeShelf={this.changeShelf} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf booksOnShelf={this.state.currentlyReading} key='currentlyReading' shelf='currentlyReading' changeShelf={this.changeShelf} />
              <BookShelf booksOnShelf={this.state.wantToRead} key='wantToRead' shelf='wantToRead' changeShelf={this.changeShelf} />
              <BookShelf booksOnShelf={this.state.read} key='read' shelf='read' changeShelf={this.changeShelf} />
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
