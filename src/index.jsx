import React from 'react';
import PropTypes from 'prop-types';

const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;
const MAX_X = 100;
const MAX_Y = 100;
const FULL_RADIUS = 50;
const CENTER_X = 50;
const CENTER_Y = 50;

/**
 * @see {@link https://codepen.io/gapcode/pen/vEJNZN}
 * @see {@link https://stackoverflow.com/a/44929931/5420369}
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

class CircularProgressbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: props.initialAnimation ? 0 : props.percentage,
    };
  }

  componentDidMount() {
    if (this.props.initialAnimation) {
      this.initialTimeout = setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          this.setState({
            percentage: this.props.percentage,
          });
        });
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percentage: nextProps.percentage,
    });
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

  getPathStyles() {
    const diameter = Math.PI * 2 * this.getPathRadius();
    const truncatedPercentage = Math.min(Math.max(this.state.percentage, MIN_PERCENTAGE), MAX_PERCENTAGE);
    const dashoffset = ((100 - truncatedPercentage) / 100) * diameter;

    return {
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${this.props.counterClockwise ? -dashoffset : dashoffset}px`,
    };
  }

  getPathRadius() {
    // the radius of the path is defined to be in the middle, so in order for the path to
    // fit perfectly inside the 100x100 viewBox, need to subtract half the strokeWidth
    return FULL_RADIUS - (this.props.strokeWidth / 2) - this.getBackgroundPadding();
  }

  render() {
    const {
      percentage,
      className,
      classes,
      styles,
      strokeWidth,
      text,
    } = this.props;
    const pathDescription = this.getPathDescription();

    return (
      <svg
        className={`${classes.root} ${className}`}
        style={styles.root}
        viewBox={`0 0 ${MAX_X} ${MAX_Y}`}
      >
        {
          this.props.background ? (
            <circle
              className={classes.background}
              style={styles.background}
              cx={CENTER_X}
              cy={CENTER_Y}
              r={FULL_RADIUS}
            />
          ) : null
        }

        <path
          className={classes.trail}
          style={styles.trail}
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
        />

        <path
          className={classes.path}
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
          style={Object.assign({}, styles.path, this.getPathStyles())}
        />

        {
          text ? (
            <text
              className={classes.text}
              style={styles.text}
              x={CENTER_X}
              y={CENTER_Y}
              dy={detectIE() ? "0.3em" : undefined }
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
  text: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
  styles: PropTypes.objectOf(PropTypes.object),
  strokeWidth: PropTypes.number,
  background: PropTypes.bool,
  backgroundPadding: PropTypes.number,
  initialAnimation: PropTypes.bool,
  counterClockwise: PropTypes.bool,
};

CircularProgressbar.defaultProps = {
  strokeWidth: 8,
  className: '',
  text: null,
  classes: {
    root: 'CircularProgressbar',
    trail: 'CircularProgressbar-trail',
    path: 'CircularProgressbar-path',
    text: 'CircularProgressbar-text',
    background: 'CircularProgressbar-background',
  },
  styles: {
    root: {},
    trail: {},
    path: {},
    text: {},
    background: {},
  },
  background: false,
  backgroundPadding: null,
  initialAnimation: false,
  counterClockwise: false,
};

export default CircularProgressbar;
