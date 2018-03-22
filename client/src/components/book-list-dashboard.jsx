import React from 'react';
import '../styles/main.css';

var BookListDashboard = (props) => {
  if (!props.bookList || props.bookList.length === 0) {
    return (
      <div className="ui segment">
        <h2 className="dashboard-header">Recommended Books</h2>
        <div>No recommendations yet!</div>
      </div>
    )
  } else {
    return (
      <div className="ui segment">
        <h2 className="dashboard-header">Recommended Books:</h2>
        <p></p>
        <div className="ui seven link cards">
          {props.bookList.map((book) =>
            <div className="card" onClick = {() => props.onBookClick(book)}>

            <div className="image">
              <img src={book.book_image[0]}/>
            </div>

            <div className="content">
              <h2 className="ui sub header">{book.book_title[0].slice(0, 30)}</h2>
            </div>
          </div>
          )}
        </div>
      </div>
    )
  }
}

export default BookListDashboard;
