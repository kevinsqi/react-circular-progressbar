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

// These are used for any CircularProgressbar wrapper components that can safely
// ignore default props.
export type CircularProgressbarWrapperProps = {
  percentage: number;
  strokeWidth?: number;
  className?: string;
  text?: string;
  background?: boolean;
  backgroundPadding?: number;
  counterClockwise?: boolean;
  circleRatio?: number;
  classes?: {
    root: string;
    trail: string;
    path: string;
    text: string;
    background: string;
  };
  styles?: CircularProgressbarStyles;
};

export type CircularProgressbarProps = CircularProgressbarDefaultProps & {
  percentage: number;
};
