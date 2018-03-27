import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class NetSignal extends Component {
  propTypes = {
    icon: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    style: React.PropTypes.object

  }

  getDefaultProps () {
    
    return {

      size: 24

    }
  }
 
  _mergeStyles (...args){

    return Object.assign( {}, ...args)
  }

  renderGraphic () {

    switch(this.props.icon) {

      case 'icon-test' :
        return (
          <g> <use xlinkHref = {'./icons/001-medium-wifi-signal-with-two-bars.svg'}></use></g>
      )
    }
  }


  render() {
    
    let styles = {
      width: this.props.size,
      height: this.props.size
    }
    return (
      <div className="home-net-signal">
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fit
          style={this._mergeStyles(styles, this.props.style)}>
            {this.renderGraphic()}
        </svg>
      </div>
    );
  }
}
