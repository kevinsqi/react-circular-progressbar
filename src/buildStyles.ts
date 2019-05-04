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
  strokeLinecap?: string;
  textColor?: string;
  textSize?: string | number;
  pathColor?: string | number;
  pathTransitionDuration?: string | number;
  trailColor?: string | number;
  backgroundColor?: string | number;
}) {
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
