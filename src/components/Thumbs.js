import React, { Component, Fragment } from 'react';
import './Thumbs.css';

class Thumbs extends Component {
    constructor(props){
        super(props);
        this.onImageSelect = this.onImageSelect.bind(this);
    }

    onImageSelect(event) {
        this.props.selectedCatalog(event.target.id);
    }

  render() {
    return (
        <Fragment>
            {
                this.props.items.map((catalog,idx) => (
                    <span className="catalog item"  onClick={this.onImageSelect} className={'thumb-select'} id={idx} key={idx} data-testid={'thumb_outer_'+idx}>
                        <span className={"thumb-outer " + (idx == this.props.currentIndex ? 'thumb-selected' : ' ')} data-testid={'thumb_'+idx}>
                            <span className="thumb" id={idx} style={{ backgroundImage: 'url('+ catalog.thumb + ')'}} data-testid={'thumb_img_'+idx} />
                        </span>
                    </span>
                ))}

        </Fragment>
    );
  }
}

export default Thumbs;
