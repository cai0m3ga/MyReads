import React, { Component } from 'react'

import PropTypes from 'prop-types'

import Book from './Book'

import sortBy from 'sort-by'

class BookShelf extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onBookShelfChange: PropTypes.func.isRequired
    }

    render() {

        let orderedBooks = this.props.books.sort(sortBy('title'))
        return (

            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookShelfTittle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {orderedBooks.map((book) => (

                            <li key={book.id}>

                                <Book
                                    onBookShelfChange={this.props.onBookShelfChange}
                                    book={book} />

                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            
        )
    }

}



export default BookShelf
