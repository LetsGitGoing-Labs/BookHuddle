import React from 'react';

class MeetingSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    e.stopPropagation();
    const term = this.state.term;
    this.props.searchBooks(e, term);
  }

  handleChange(e) {
    const target = e.target.id;
    this.setState({
      [target]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <div >
            <input className="meeting-search-content form-control" type="text" id="term" placeholder="Find a book for the meeting" value={this.state.term} onChange={this.handleChange} />
            <button className="search-form-btn"><i className="fas fa-search"></i></button>
          </div>
        </form>
      </div>
    );
  }
}

export default MeetingSearchbar;

