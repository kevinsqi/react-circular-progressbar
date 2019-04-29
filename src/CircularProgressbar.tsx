import React from 'react';
import {
  VIEWBOX_WIDTH,
  VIEWBOX_HEIGHT,
  VIEWBOX_HEIGHT_HALF,
  VIEWBOX_CENTER_X,
  VIEWBOX_CENTER_Y,
} from './constants';
import Path from './Path';

type CircularProgressbarDefaultProps = {
  strokeWidth: number;
  className: string;
  text: string;
  background: boolean;
  backgroundPadding: number;
  initialAnimation: boolean;
  counterClockwise: boolean;
  circleRatio: number;
  classes: {
    root: string;
    trail: string;
    path: string;
    text: string;
    background: string;
  };
  styles: {
    root?: object;
    trail?: object;
    path?: object;
    text?: object;
    background?: object;
  };
};

type CircularProgressbarProps = CircularProgressbarDefaultProps & {
  percentage: number;
};

type CircularProgressbarState = {
  percentage: number;
};

class CircularProgressbar extends React.Component<
  CircularProgressbarProps,
  CircularProgressbarState
> {
  initialTimeout: number | undefined = undefined;
  requestAnimationFrame: number | undefined = undefined;

  static defaultProps: CircularProgressbarDefaultProps = {
    strokeWidth: 8,
    className: '',
    text: '',
    background: false,
    backgroundPadding: 0,
    initialAnimation: false,
    counterClockwise: false,
    circleRatio: 1,
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
  };

  constructor(props: CircularProgressbarProps) {
    super(props);

    this.state = {
      percentage: props.initialAnimation ? 0 : props.percentage,
    };
  }

  componentDidMount() {
    if (this.props.initialAnimation) {
      this.initialTimeout = window.setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          this.setState({
            percentage: this.props.percentage,
          });
        });
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps: CircularProgressbarProps) {
    this.setState({
      percentage: nextProps.percentage,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.initialTimeout);
    if (this.requestAnimationFrame) {
      window.cancelAnimationFrame(this.requestAnimationFrame);
    }
  }

  getBackgroundPadding() {
    if (this.props.background) {
      // Default padding to be the same as strokeWidth
      // Compare to null because 0 is falsy
      if (this.props.backgroundPadding == null) {
        return this.props.strokeWidth;
      }
      return this.props.backgroundPadding;
    }
    // Don't add padding if not displaying background
    return 0;
  }

  getPathRadius() {
    // The radius of the path is defined to be in the middle, so in order for the path to
    // fit perfectly inside the 100x100 viewBox, need to subtract half the strokeWidth
    return VIEWBOX_HEIGHT_HALF - this.props.strokeWidth / 2 - this.getBackgroundPadding();
  }

  render() {
    const {
      className,
      classes,
      counterClockwise,
      percentage,
      styles,
      strokeWidth,
      text,
      circleRatio,
    } = this.props;

    const pathRadius = this.getPathRadius();

    return (
      <svg
        className={`${classes.root} ${className}`}
        style={styles.root}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      >
        {this.props.background ? (
          <circle
            className={classes.background}
            style={styles.background}
            cx={VIEWBOX_CENTER_X}
            cy={VIEWBOX_CENTER_Y}
            r={VIEWBOX_HEIGHT_HALF}
          />
        ) : null}

        <Path
          className={classes.trail}
          counterClockwise={counterClockwise}
          pathRadius={pathRadius}
          percentage={100 * circleRatio}
          strokeWidth={strokeWidth}
          style={styles.trail}
        />

        <Path
          className={classes.path}
          counterClockwise={counterClockwise}
          pathRadius={pathRadius}
          percentage={percentage * circleRatio}
          strokeWidth={strokeWidth}
          style={styles.path}
        />

        {text ? (
          <text
            className={classes.text}
            style={styles.text}
            x={VIEWBOX_CENTER_X}
            y={VIEWBOX_CENTER_Y}
          >
            {text}
          </text>
        ) : null}
      </svg>
    );
  }
}

export default CircularProgressbar;
