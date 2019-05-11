import React from 'react';
import { VIEWBOX_CENTER_X, VIEWBOX_CENTER_Y } from './constants';

function Path({
  className,
  counterClockwise,
  pathRadius,
  dashRatio,
  strokeWidth,
  style,
}: {
  className?: string;
  counterClockwise: boolean;
  pathRadius: number;
  dashRatio: number;
  strokeWidth: number;
  style?: object;
}) {
  return (
    <path
      className={className}
      style={Object.assign({}, style, getDashStyle({ pathRadius, dashRatio, counterClockwise }))}
      d={getPathDescription({
        pathRadius,
        counterClockwise,
      })}
      strokeWidth={strokeWidth}
      fillOpacity={0}
    />
  );
}

// SVG path description specifies how the path should be drawn
function getPathDescription({
  pathRadius,
  counterClockwise,
}: {
  pathRadius: number;
  counterClockwise: boolean;
}) {
  const radius = pathRadius;
  const rotation = counterClockwise ? 1 : 0;

  // Move to center of canvas
  // Relative move to top canvas
  // Relative arc to bottom of canvas
  // Relative arc to top of canvas
  return `
      M ${VIEWBOX_CENTER_X},${VIEWBOX_CENTER_Y}
      m 0,-${radius}
      a ${radius},${radius} ${rotation} 1 1 0,${2 * radius}
      a ${radius},${radius} ${rotation} 1 1 0,-${2 * radius}
    `;
}

function getDashStyle({
  pathRadius,
  dashRatio,
  counterClockwise,
}: {
  pathRadius: number;
  dashRatio: number;
  counterClockwise: boolean;
}) {
  const diameter = Math.PI * 2 * pathRadius;

  // Keep dashRatio between [0, 1]
  const boundedDashRatio = Math.min(Math.max(dashRatio, 0), 1);
  const gapLength = (1 - boundedDashRatio) * diameter;

  return {
    // Have dash be full diameter, and gap be full diameter
    strokeDasharray: `${diameter}px ${diameter}px`,
    // Shift dash backward by gapLength, so gap starts appearing at correct distance
    strokeDashoffset: `${counterClockwise ? -gapLength : gapLength}px`,
  };
}

export default Path;
