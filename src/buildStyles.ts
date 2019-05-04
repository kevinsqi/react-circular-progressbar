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
  rotation?: number;
  strokeLinecap?: any;
  textColor?: string;
  textSize?: string | number;
  pathColor?: string;
  pathTransitionDuration?: string;
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
      transitionDuration: pathTransitionDuration,
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
