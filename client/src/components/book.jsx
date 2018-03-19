import React from 'react';

class Book extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="carousel-card">
        <img className="carousel-card-img" src={this.props.book.cover} alt="" />
        <h3 className="card-title">{this.props.book.title}</h3>
        <p><em>by {this.props.book.author}</em></p>
      </div>
    );
  }
}

export default Book;