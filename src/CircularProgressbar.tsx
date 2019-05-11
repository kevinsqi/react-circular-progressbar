import React from 'react';

import {
  VIEWBOX_WIDTH,
  VIEWBOX_HEIGHT,
  VIEWBOX_HEIGHT_HALF,
  VIEWBOX_CENTER_X,
  VIEWBOX_CENTER_Y,
} from './constants';
import Path from './Path';
import {
  CircularProgressbarDefaultProps,
  CircularProgressbarProps,
  CircularProgressbarState,
} from './types';

class CircularProgressbar extends React.Component<
  CircularProgressbarProps,
  CircularProgressbarState
> {
  static defaultProps: CircularProgressbarDefaultProps = {
    strokeWidth: 8,
    className: '',
    text: '',
    background: false,
    backgroundPadding: 0,
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
        data-test-id="CircularProgressbar"
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
