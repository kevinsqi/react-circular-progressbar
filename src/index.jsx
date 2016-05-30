import React, { PropTypes } from 'react';

class CircularProgressbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: props.initialAnimation ? 0 : props.percentage,
    };
  }

  componentDidMount() {
    if (this.props.initialAnimation) {
      setTimeout(() => {
        this.setState({
          percentage: this.props.percentage,
        });
      }, 10);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percentage: this.props.percentage,
    });
  }

  render() {
    const radius = (50 - this.props.strokeWidth / 2);
    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

    const diameter = Math.PI * 2 * radius;
    const progressStyle = {
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${((100 - this.state.percentage) / 100 * diameter)}px`,
    };

    return (
      <svg
        className={`CircularProgressbar ${this.props.classForPercentage ? this.props.classForPercentage(this.props.percentage) : ''}`}
        viewBox="0 0 100 100"
      >
        <path
          className="CircularProgressbar-trail"
          d={pathDescription}
          strokeWidth={this.props.strokeWidth}
          fillOpacity={0}
        />

        <path
          className="CircularProgressbar-path"
          d={pathDescription}
          strokeWidth={this.props.strokeWidth}
          fillOpacity={0}
          style={progressStyle}
        />

        <text
          className="CircularProgressbar-text"
          x={50}
          y={50}
        >
          {this.props.textForPercentage(this.props.percentage)}
        </text>
      </svg>
    );
  }
}

CircularProgressbar.propTypes = {

};

CircularProgressbar.defaultProps = {
  strokeWidth: 8,
  textForPercentage: (percentage) => `${percentage}%`,
  initialAnimation: false,
};

export default CircularProgressbar;
