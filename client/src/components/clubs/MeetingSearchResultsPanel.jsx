import React from 'react';
import { Link } from 'react-router-dom';

const NoResults = () => (
  <div style={{ display: 'none' }} id="results-list" className="panel-card" />
);

class MeetingSearchResultsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.selectBook = this.selectBook.bind(this);
  }

  handleLoadBook(result, e) {
    this.selectBook(e);
    this.props.loadBook(result.book_image[0], result.book_title[0])
  }

  selectBook(e) {
    var addclass = 'highlighted';
    var $cols = $('.bks').click(function(e) {
      $cols.removeClass(addclass);
      $(this).addClass(addclass);
    });
  }
  render() {
    return !this.props.results || this.props.results.length === 0 ?
      <NoResults />
      : (
        <div id="results-list" className="panel-card">
          <h3>PLEASE SELECT A BOOK</h3>
          <div className="container mt">
            <div className="row">
              {this.props.results.map((result, id) =>
            (
              <div key={id} className="col-md-4 bks">
                <img className="meeting-book" src={result.book_image[0]} onClick={this.handleLoadBook.bind(this, result)}/>
                <p>{result.book_title[0]}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      );
  }
}


export default MeetingSearchResultsPanel;
