import React from 'react';

class Searchbar extends React.Component {
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
    const term = this.state.term;
    this.props.search(term);
  }

  handleChange(e) {
    const target = e.target.id;
    this.setState({
      [target]: e.target.value,
    });
  }

  render() {
    return (
      <div className="searchbar">
        <form onSubmit={this.handleSearch}>
          <div class="searchbar-content">
            <input type="text" id="term" placeholder="Search for clubs" value={this.state.term} onChange={this.handleChange} />
            <button type="submit" class="search-form-btn"><i class="fas fa-search"></i></button>
          </div>
        </form>
      </div>
    );
  }
}

export default Searchbar;

