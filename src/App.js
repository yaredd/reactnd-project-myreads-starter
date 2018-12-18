import React from 'react'
import './App.css'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import SearchResult from './SearchResult';
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
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
        <Route path='/search' render={ ({history}) => (
          <SearchResult closeSearch={this.closeSearch} getShelfFromBook={this.getShelfFromBook} changeShelf={this.changeShelf} />
        )}/>
        <Route exact path='/' render={ ({history}) => (
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
              <Link to='/search' >Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
