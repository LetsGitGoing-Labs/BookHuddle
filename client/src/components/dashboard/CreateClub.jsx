import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import AlgoliaPlaces from 'algolia-places-react';

class CreateClub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubName: '',
      description: '',
      clubCity: '',
      genre: '',
      userID: this.props.userID,
    };
    this.onChange = this.onChange.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  onChange(e) {
    const target = e.target.name;
    this.setState({
      [target]: e.target.value,
    });
  }

  setLocation(e) {
    this.setState({
      clubCity: (`${e.suggestion.name}, ${e.suggestion.administrative}`),
    });
  }

  onSelect(e) {
    const target = e.target.options;
    this.setState({
      genre: target[e.target.selectedIndex].text,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const clubData = JSON.stringify(this.state);

    const query = `mutation HandleClubCreate($clubData: String) {
      handleClubCreate(clubData: $clubData)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: {
          clubData,
        },
      }),
      success: (data) => {
        console.log('success');
        this.setState({
          isSubmitted: true,
        });
      },
      error: (data) => {
        console.log(data);
      },
    });
  }

  render() {
    return this.state.isSubmitted ? (<Redirect to="/dashboard" />) :
      (
        <div id="create-club-form" className="col-md-9">
          <div className="container mt centered">
            <h3>Create a Club</h3>
            <form className="container mt create-form" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <input type="text" className="form-control" id="inputClubName" placeholder="Club name" name="clubName" value={this.state.clubName} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <textarea className="form-control" id="inputClubDescription" rows="3" name="description" placeholder="Add a brief description to attract club members"value={this.state.description} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <AlgoliaPlaces placeholder="Location by city" onChange={e => this.setLocation(e)} />
              </div>
              <div className="form-group">
                <select className="form-control" id="inputClubGenres" name="genre" onChange={this.onSelect.bind(this)}>
                  <option defaultValue>Choose a Genre</option>
                  <option>Arts Photography</option>
                  <option>Biographies Memoirs</option>
                  <option>Business Money</option>
                  <option>Children's eBooks</option>
                  <option>Comics Graphic Novels</option>
                  <option>Computers Technology</option>
                  <option>Cookbooks, Food Wine</option>
                  <option>Crafts, Hobbies Home</option>
                  <option>Education Teaching</option>
                  <option>Engineering Transportation</option>
                  <option>Foreign Languages</option>
                  <option>Health, Fitness Dieting</option>
                  <option>History</option>
                  <option>Humor Entertainment</option>
                  <option>Law</option>
                  <option>Lesbian, Gay, Bisexual Transgender eBooks</option>
                  <option>Literature Fiction</option>
                  <option>Medical eBooks</option>
                  <option>Mystery, Thriller Suspense</option>
                  <option>Nonfiction</option>
                  <option>Parenting Relationships</option>
                  <option>Politics Social Sciences</option>
                  <option>Reference</option>
                  <option>Religion Spirituality</option>
                  <option>Romance</option>
                  <option>Science Math</option>
                  <option>Science Fiction Fantasy</option>
                  <option>Self-Help</option>
                  <option>Sports Outdoors</option>
                  <option>Teen Young Adult</option>
                  <option>Travel</option>
                </select>
              </div>
              <input type="submit" className="btn btn-primary form-btn" value="Submit" />
            </form>
          </div>
        </div>
      );
  }
}

export default CreateClub;
