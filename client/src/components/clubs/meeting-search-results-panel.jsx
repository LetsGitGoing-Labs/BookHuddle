import React from 'react';
import { Link } from 'react-router-dom';

const NoResults = () => (
  <div style={{ display: 'none' }} id="results-list" className="panel-card" />
);

class MeetingSearchResultsPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLoadBook(result) {
    this.props.loadBook(result.book_image[0], result.book_title[0])
  }

  render() {
    return !this.props.results || this.props.results.length === 0 ?
      <NoResults />
      : (
        <div id="results-list" className="panel-card">
          <h3>PLEASE SELECT A BOOK FOR THE MEETING</h3>
          <div className="row">
            {this.props.results.map((result, id) =>
          (
            <div key={id} className="col-md-4">
              <img className="book-cover" src={result.book_image[0]} onClick={this.handleLoadBook.bind(this, result)}/>
              <p>{result.book_title[0].slice(0, 30)}</p>
            </div>
          ))}
          </div>
        </div>
      );
  }
}


export default MeetingSearchResultsPanel;
