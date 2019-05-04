import React from 'react';

export type CircularProgressbarStyles = {
  root?: React.CSSProperties;
  trail?: React.CSSProperties;
  path?: React.CSSProperties;
  text?: React.CSSProperties;
  background?: React.CSSProperties;
};

export type CircularProgressbarDefaultProps = {
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
  styles: CircularProgressbarStyles;
};

export type CircularProgressbarProps = CircularProgressbarDefaultProps & {
  percentage: number;
};

export type CircularProgressbarState = {
  percentage: number;
};
