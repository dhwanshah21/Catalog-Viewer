import React, { Component } from 'react';
import './Viewer.css';

class Viewer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="catalog-view">
          <img data-testid="catalog-view" className="catalog-image" src={this.props.catalog}/>
        </div>
    );
  }
}

export default Viewer;
