import React from 'react';

var BookListDashboard = (props) => {
  if (!props.bookList || props.bookList.length === 0) {
    return (
      <div class="ui segment">
        <h3>Recommended Books</h3>
        <div>No recommendations yet!</div>
      </div>
    )
  } else {
    return (
      <div class="ui segment">
        <h3>Recommended Books</h3>

        <div class="ui five link cards">
          {props.bookList.map((book) =>
            <div class="card" onClick = {() => props.onBookClick(book)}>
            })}

            <div class="image">
              <img src={book.image}/>
            </div>

            <div class="content">
              <div class="header">{book.title}</div>
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
