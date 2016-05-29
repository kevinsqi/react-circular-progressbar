import React, { PropTypes } from 'react';

class CircularProgressbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg
        className="CircularProgressbar"
        viewBox="0 0 100 100"
      >
        <text>Hello</text>
      </svg>
    );
  }
}

CircularProgressbar.propTypes = {

};

CircularProgressbar.defaultProps = {

};

export default CircularProgressbar;
