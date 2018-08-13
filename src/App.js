import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import { Link } from 'react-router-dom' 
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: [],
    filter: ''
  }

  componentDidMount(){
    BooksAPI.getAll().then((item) => {
      this.setState({ books: item });
    })
  }

  bookShelfChange = (book, shelf) => {

    BooksAPI.update(book,shelf);
    this.setState((state) => ({ books: [ ...state.books.filter(item => item.id !== book.id),{...book,shelf}]}));

  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>

              <BookShelf 
                      onBookShelfChange={this.bookShelfChange}
                      bookShelfTittle="Currently Reading"
                      books={this.state.books.filter((book) => book.shelf === "currentlyReading")} />

              <BookShelf 
                      onBookShelfChange={this.bookShelfChange}
                      bookShelfTittle="Want to Read"
                      books={this.state.books.filter((book) => book.shelf === "wantToRead")} />

              <BookShelf 
                      onBookShelfChange={this.bookShelfChange}
                      bookShelfTittle="Read"
                      books={this.state.books.filter((book) => book.shelf === "read")} />

            </div>
          </div>
          <div className="open-search">
          <Link 
          to="/search">
          Add a book
          </Link>    
          </div>
        </div>
        )} />

        <Route exact path="/search" render={() => (
              <Search 
              onBookShelfChange={this.bookShelfChange}
              books={this.state.books} />
        )} />
      </div>
    )
  }
}

export default BooksApp
