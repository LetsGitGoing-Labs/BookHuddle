import React from 'react';
import { Link } from 'react-router-dom';

const NoResults = () => (
  <div style={{ display: 'none' }} id="results-list" className="panel-card" />
);

class SearchResultsPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return !this.props.results || this.props.results.length === 0 ?
      <NoResults />
      : (
        <div id="results-list" className="panel-card">
          <h3>CLUBS THAT MATCH YOUR SEARCH</h3>
          <div className="row">
            {this.props.results.map((result, id) =>
          (
            <div key={id} className="col-md-4">
              <Link to={`/dashboard/${result.id}`}>
                <img className="book-cover" src={`http://covers.openlibrary.org/b/isbn/${result.current_book_isbn}-M.jpg`} />
                <p>{result.club_name}</p>
              </Link>
            </div>
          ))}
          </div>
        </div>
      );
  }
}

export default SearchResultsPanel;
