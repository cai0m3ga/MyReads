import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input';

class Search extends Component {

    state = {
        searchBooks: []
    }

    onBookShelfChange = (book,shelf) =>{
        this.props.onBookShelfChange(book,shelf);
        this.setState((state) => ({ searchBooks: [ ...state.searchBooks.filter(item => item.id !== book.id),{...book,shelf}]}));
    }

    onSearch = (filter) => {
        if (filter === '') {
            this.setState({ searchBooks: [] });
        } else {
            BooksAPI.search(filter).then((item) => {
                let allBooks = [];
                if (item != null) {
                    if (item.error == null) {
                        allBooks = item.map((book) => {
                            let temp = this.props.books.filter(x => x.id === book.id)
                            if (temp.length === 0) {
                                return book;
                            } else {
                                return temp[0];
                            }
                        });
                    }
                }
                this.setState({ searchBooks: allBooks });
            })
        }
    }



    static propTypes = {
        books: PropTypes.array.isRequired,
        onBookShelfChange: PropTypes.func.isRequired
    }

    render() {

        let orderedBooks = this.state.searchBooks.sort(sortBy('title'))

        return (
            <div className="search-books">
                <div className="search-books-bar">

                    <Link className="close-search" to="/">Close</Link>

                    <div className="search-books-input-wrapper">

                        <DebounceInput
                            minLength={1}
                            debounceTimeout={500}
                            onChange={event => this.onSearch(event.target.value)} />
                        
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">

                        {orderedBooks.map((book) => (

                            <li key={book.id}>

                                <Book
                                    onBookShelfChange={this.onBookShelfChange}
                                    book={book} />

                            </li>
                            
                        ))}

                    </ol>
                </div>
            </div>
        )
    }
}



export default Search