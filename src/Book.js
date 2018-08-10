import React, { Component } from 'react'

import PropTypes from 'prop-types'

import defaultThumbnail from './img/nope.png';

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookShelfChange: PropTypes.func.isRequired
    }

    render() {

        let thumbnail = defaultThumbnail
        if (this.props.book.imageLinks != null) {
            thumbnail = this.props.book.imageLinks.thumbnail
        }

        let authors = ["Unknow author"]
        if (this.props.book.authors != null) {
            authors = this.props.book.authors
        }

        return (

            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + thumbnail + ')', }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => this.props.onBookShelfChange(this.props.book, event.target.value)}>
                            <option value="">Move to...</option>
                            {this.props.book.shelf !== 'currentlyReading' && (
                                <option value="currentlyReading">Currently Reading</option>
                            )}
                            {this.props.book.shelf === 'currentlyReading' && (
                                <option value="currentlyReading" disabled>Currently Reading</option>
                            )}

                            {this.props.book.shelf !== 'wantToRead' && (
                                <option value="wantToRead">Want to Read</option>
                            )}
                            {this.props.book.shelf === 'wantToRead' && (
                                <option value="wantToRead" disabled>Want to Read</option>
                            )}

                            {this.props.book.shelf !== 'read' && (
                                <option value="read">Read</option>
                            )}
                            {this.props.book.shelf === 'read' && (
                                <option value="read" disabled>Read</option>
                            )}

                            {this.props.book.shelf != null && (
                                <option value="none">None</option>
                            )}
                            {this.props.book.shelf == null && (
                                <option value="none" disabled>None</option>
                            )}

                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>

        )
    }
}



export default Book