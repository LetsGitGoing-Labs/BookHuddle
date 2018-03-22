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
        <h2 className="dashboard-header">Recommended Books</h2>
        <p></p>
        <div className="ui five link cards">
          {props.bookList.map((book) =>
            <div class="card" onClick = {() => props.onBookClick(book)}>
            })}

            <div className="image">
              <img src={book.image}/>
            </div>

            <div className="content">
              <div className="header">{book.title}</div>
            </div>

            {/*author? description? */}
          </div>
          )}
        </div>
      </div>
    )
  }
}

export default BookListDashboard;
