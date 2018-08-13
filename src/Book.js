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
                        <select value={this.props.book.shelf || 'none'} onChange={(event) => this.props.onBookShelfChange(this.props.book, event.target.value)}>
                            <option value="" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
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