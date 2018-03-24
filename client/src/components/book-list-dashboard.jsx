import React from 'react';
import '../styles/main.css';

class BookList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (!this.props.bookList || this.props.bookList.length === 0) ?
      (
        <div className="ui segment">
          <h2 className="dashboard-header">Recommended Books</h2>
          <div>No recommendations yet!</div>
        </div>
      ) : (
        <div className="ui segment">
          <h2 className="dashboard-header">Recommended Books:</h2>
          <div className="ui seven link cards">
            {this.props.bookList.map((book, i) =>
              (<a key={i} href={book.book_url} target='blank' className="card">
                <div className="image">
                  <img src={book.book_image[0]}/>
                </div>
                <div className="content">
                  <h2 className="ui sub header">{book.book_title[0].slice(0, 30)}</h2>
                </div>
              </a>)
            )}
          </div>
        </div>
      )
  }
}

export default BookList;
