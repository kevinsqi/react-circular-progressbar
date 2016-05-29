import React, { PropTypes } from 'react';

class CircularProgressbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const radius = (50 - this.props.strokeWidth / 2);
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
          strokeWidth={this.props.strokeWidth}
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
  strokeWidth: 8,
};

export default CircularProgressbar;
