import React from 'react';
import $ from 'jquery';

class TriviaQInputs extends React.Component {
  
  render() {
    return (
     <div>
      <h5>Question {this.props.number + 1}</h5>
      <div className="form-group">
        <input type="text" className="form-control xs-8" id="inputQuestion" placeholder="Write a multiple choice question" name="q" value={this.props.q} onChange={this.props.onChange} />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" id="a" placeholder="Option 'A'" name="a" value={this.props.a} onChange={this.props.onChange} />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" id="b" placeholder="Option 'B'" name="b" value={this.props.b} onChange={this.props.onChange} />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" id="c" placeholder="Option 'C'" name="c" value={this.props.c} onChange={this.props.onChange} />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" id="d" placeholder="Option 'D'" name="d" value={this.props.d} onChange={this.props.onChange} />
      </div>
      <div className="form-group">
        <select className="form-control" id="inputAnswer" name="ans" onChange={this.props.onChange}>
          <option disabled defaultValue>Choose correct answer...</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
        </select>
      </div>
      </div>
    );
  }
}

export default TriviaQInputs;
  