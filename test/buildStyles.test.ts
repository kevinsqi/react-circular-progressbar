import { buildStyles } from '../src/index';

describe('buildStyles', () => {
  test('Builds empty set', () => {
    const result = buildStyles({});

    expect(result).toEqual({
      root: {},
      path: {},
      trail: {},
      text: {},
      background: {},
    });
  });
  test('Builds subset of CSS properties', () => {
    const result = buildStyles({
      textSize: 12,
    });

    expect(result).toEqual({
      root: {},
      path: {},
      trail: {},
      text: {
        fontSize: 12,
      },
      background: {},
    });
  });

  test('Builds full set of CSS properties', () => {
    const result = buildStyles({
      rotation: 0.25,
      strokeLinecap: 'butt',
      textSize: '16px',
      pathTransitionDuration: 0.5,
      pathColor: `#000`,
      textColor: '#f88',
      trailColor: '#d6d6d6',
      backgroundColor: '#3e98c7',
    });

    expect(result).toEqual({
      root: {},
      path: {
        stroke: `#000`,
        strokeLinecap: 'butt',
        transitionDuration: '0.5s',
        transform: 'rotate(0.25turn)',
        transformOrigin: 'center center',
      },
      trail: {
        stroke: '#d6d6d6',
        strokeLinecap: 'butt',
        transform: 'rotate(0.25turn)',
        transformOrigin: 'center center',
      },
      text: {
        fill: '#f88',
        fontSize: '16px',
      },
      background: {
        fill: '#3e98c7',
      },
    });
  });
});
