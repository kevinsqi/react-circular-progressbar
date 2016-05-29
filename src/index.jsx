import React, { PropTypes } from 'react';

class CircularProgressbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const radius = 50;
    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;
    return (
      <svg
        className="CircularProgressbar"
        viewBox="0 0 100 100"
      >
        <path
          d={pathDescription}
          stroke="#cccccc"
          strokeWidth={10}
          fillOpacity="0"
        />
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
