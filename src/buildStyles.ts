import { CircularProgressbarStyles } from './types';

export default function buildStyles({
  rotation,
  strokeLinecap,
  textColor,
  textSize,
  pathColor,
  pathTransitionDuration,
  trailColor,
  backgroundColor,
}: {
  rotation?: number;  // Number of turns, 0-1
  strokeLinecap?: any;
  textColor?: string;
  textSize?: string | number;
  pathColor?: string;
  pathTransitionDuration?: number;  // Measured in seconds
  trailColor?: string;
  backgroundColor?: string;
}): CircularProgressbarStyles {
  const rotationTransform = rotation == null ? undefined : `rotate(${rotation}turn)`;
  const rotationTransformOrigin = rotation == null ? undefined : 'center center';

  return {
    root: {},
    path: {
      stroke: pathColor,
      strokeLinecap: strokeLinecap,
      transform: rotationTransform,
      transformOrigin: rotationTransformOrigin,
      transitionDuration: `${pathTransitionDuration}s`,
    },
    trail: {
      stroke: trailColor,
      strokeLinecap: strokeLinecap,
      transform: rotationTransform,
      transformOrigin: rotationTransformOrigin,
    },
    text: {
      fill: textColor,
      fontSize: textSize,
    },
    background: {
      fill: backgroundColor,
    },
  };
}
