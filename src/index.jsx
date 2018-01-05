import React from 'react';
import PropTypes from 'prop-types';

const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;
const MAX_X = 100;
const MAX_Y = 100;
const FULL_RADIUS = 50;
const CENTER_X = 50;
const CENTER_Y = 50;
const STACK_PREFIX = 'CircularProgressbar-path';

class CircularProgressbar extends React.Component {
  constructor(props) {
    super(props);

    let state = {
      percentage: props.initialAnimation ? 0 : props.percentage,
    }

    if (props.stackPercentages && Array.isArray(props.stackPercentages)) {
      props.stackPercentages.forEach((p, idx) => {
        state[`path-${idx}`] = props.initialAnimation ? 0 : p;
      })
    }

    this.state = state;
  }

  componentDidMount() {
    if (this.props.initialAnimation) {
      this.initialTimeout = setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          let state = {
            percentage: this.props.percentage,
          }

          if (this.props.stackPercentages && Array.isArray(this.props.stackPercentages)) {
            this.props.stackPercentages.forEach((p, idx) => (state[`path-${idx}`] = p))
          }

          this.setState(state);
        });
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    let state = {
      percentage: nextProps.percentage,
    }

    if (nextProps.stackPercentages && Array.isArray(nextProps.stackPercentages)) {
      nextProps.stackPercentages.forEach((p, idx) => (state[`path-${idx}`] = p))
    }

    this.setState(state);
  }

  componentWillUnmount() {
    clearTimeout(this.initialTimeout);
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }

  getBackgroundPadding() {
    if (this.props.background) {
      // default padding to be the same as strokeWidth
      // compare to null because 0 is falsy
      if (this.props.backgroundPadding == null) {
        return this.props.strokeWidth;
      }
      return this.props.backgroundPadding;
    }
    // don't add padding if not displaying background
    return 0;
  }

  getPathDescription() {
    const radius = this.getPathRadius();
    const rotation = this.props.counterClockwise ? 1 : 0;

    // Move to center of canvas
    // Relative move to top canvas
    // Relative arc to bottom of canvas
    // Relative arc to top of canvas
    return `
      M ${CENTER_X},${CENTER_Y}
      m 0,-${radius}
      a ${radius},${radius} ${rotation} 1 1 0,${2 * radius}
      a ${radius},${radius} ${rotation} 1 1 0,-${2 * radius}
    `;
  }

  getProgressStyle(percentage=this.state.percentage, stackOffsetPercent=0) {
    const diameter = Math.PI * 2 * this.getPathRadius();
    const truncatedPercentage = Math.min(Math.max(percentage, MIN_PERCENTAGE), MAX_PERCENTAGE);
    const dashoffset = ((100 - truncatedPercentage) / 100) * diameter;
    const stackOffsetDegrees = (stackOffsetPercent/100) * 360;

    return {
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${this.props.counterClockwise ? -dashoffset : dashoffset}px`,
      transformOrigin: 'center',
      transform: `rotate(${stackOffsetDegrees}deg)`
    };
  }

  getPathRadius() {
    // the radius of the path is defined to be in the middle, so in order for the path to
    // fit perfectly inside the 100x100 viewBox, need to subtract half the strokeWidth
    return FULL_RADIUS - (this.props.strokeWidth / 2) - this.getBackgroundPadding();
  }

  render() {
    const { percentage, stackPercentages, textForPercentage, className, classes, strokeWidth } = this.props;
    const classForPercentage = this.props.classForPercentage ? this.props.classForPercentage(percentage) : '';
    const pathDescription = this.getPathDescription();
    const text = textForPercentage ? textForPercentage(percentage) : null;

    const stackPercentagesPaths = stackPercentages ? (
      stackPercentages.map((p, idx) => {
        let stackOffset = idx > 0 ? stackPercentages.slice(0, idx).reduce((acc, cur) => (acc + cur)) : 0;

        return (
          <path key={`path-${idx}`}
            className={`${classes.stackPaths && classes.stackPaths[idx] || (STACK_PREFIX + `-${idx}`)}`}
            d={pathDescription}
            strokeWidth={strokeWidth}
            fillOpacity={0}
            style={this.getProgressStyle(this.state[`path-${idx}`], stackOffset)}
          />
        )
      })
    ) : null

    return (
      <svg
        className={`${classes.root} ${className} ${classForPercentage}`}
        viewBox={`0 0 ${MAX_X} ${MAX_Y}`}
      >
        {
          this.props.background ? (
            <circle
              className={classes.background}
              cx={CENTER_X}
              cy={CENTER_Y}
              r={FULL_RADIUS}
            />
          ) : null
        }

        <path
          className={classes.trail}
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
        />

        { stackPercentagesPaths }

        <path
          className={classes.path}
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
          style={this.getProgressStyle()}
        />

        {
          text ? (
            <text
              className={classes.text}
              x={CENTER_X}
              y={CENTER_Y}
            >
              {text}
            </text>
          ) : null
        }
      </svg>
    );
  }
}

CircularProgressbar.propTypes = {
  percentage: PropTypes.number.isRequired,
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
  strokeWidth: PropTypes.number,
  background: PropTypes.bool,
  backgroundPadding: PropTypes.number,
  initialAnimation: PropTypes.bool,
  counterClockwise: PropTypes.bool,
  classForPercentage: PropTypes.func,
  textForPercentage: PropTypes.func,
};

CircularProgressbar.defaultProps = {
  strokeWidth: 8,
  className: '',
  classes: {
    root: 'CircularProgressbar',
    trail: 'CircularProgressbar-trail',
    path: 'CircularProgressbar-path',
    text: 'CircularProgressbar-text',
    background: 'CircularProgressbar-background',
    stackPaths: []
  },
  background: false,
  backgroundPadding: null,
  initialAnimation: false,
  counterClockwise: false,
  classForPercentage: null,
  textForPercentage: (percentage) => `${percentage}%`,
};

export default CircularProgressbar;
