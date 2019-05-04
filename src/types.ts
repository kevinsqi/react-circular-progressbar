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
  styles: {
    root?: object;
    trail?: object;
    path?: object;
    text?: object;
    background?: object;
  };
};

export type CircularProgressbarProps = CircularProgressbarDefaultProps & {
  percentage: number;
};

export type CircularProgressbarState = {
  percentage: number;
};
