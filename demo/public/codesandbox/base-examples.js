import React from 'react';
import { render } from 'react-dom';

// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Animation
import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from './AnimatedProgressProvider';
import ChangingProgressProvider from './ChangingProgressProvider';

// Radial separators
import RadialSeparators from './RadialSeparators';

const percentage = 66;

const App = () => (
  <div style={{ padding: '40px 40px 40px 40px' }}>
    <h1>react-circular-progressbar examples</h1>
    <p>
      <a href="https://github.com/kevinsqi/react-circular-progressbar">
        <strong>View Github docs</strong>
      </a>
    </p>

    <h2>Common style customizations</h2>
    <Example label="Default">
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </Example>
    <Example label="Stroke width">
      <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={5} />
    </Example>
    <Example label="Square linecaps">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          strokeLinecap: 'butt',
        })}
      />
    </Example>
    <Example label="Custom colors">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: 'red',
          pathColor: 'turquoise',
          trailColor: 'gold',
        })}
      />
    </Example>
    <Example label="Text size">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          // This is in units relative to the 100x100px
          // SVG viewbox.
          textSize: '14px',
        })}
      />
    </Example>
    <Example label="Rotation">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          rotation: 0.5 + (1 - percentage / 100) / 2,
        })}
      />
    </Example>

    <h2>Animation</h2>
    <Example label="Default animation speed">
      <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
        {(percentage) => <CircularProgressbar value={percentage} text={`${percentage}%`} />}
      </ChangingProgressProvider>
    </Example>
    <Example label="Custom animation speed">
      <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
        {(percentage) => (
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              pathTransitionDuration: 0.15,
            })}
          />
        )}
      </ChangingProgressProvider>
    </Example>
    <Example label="No animation when returning to 0">
      <ChangingProgressProvider values={[0, 100]}>
        {(percentage) => (
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              pathTransition: percentage === 0 ? 'none' : 'stroke-dashoffset 0.5s ease 0s',
            })}
          />
        )}
      </ChangingProgressProvider>
    </Example>
    <Example label="Fully controlled text animation using react-move">
      <AnimatedProgressProvider
        valueStart={0}
        valueEnd={66}
        duration={1.4}
        easingFunction={easeQuadInOut}
        repeat
      >
        {(value) => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbar
              value={value}
              text={`${roundedValue}%`}
              /* This is important to include, because if you're fully managing the
        animation yourself, you'll want to disable the CSS animation. */
              styles={buildStyles({ pathTransition: 'none' })}
            />
          );
        }}
      </AnimatedProgressProvider>
    </Example>

    <h2>Other use cases</h2>
    <Example label="Arbitrary content">
      <CircularProgressbarWithChildren value={66}>
        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
        <img
          style={{ width: 40, marginTop: -5 }}
          src="https://i.imgur.com/b9NyUGm.png"
          alt="doge"
        />
        <div style={{ fontSize: 12, marginTop: -5 }}>
          <strong>66%</strong> mate
        </div>
      </CircularProgressbarWithChildren>
    </Example>
    <Example label="Multiple overlapping paths">
      <CircularProgressbarWithChildren
        value={80}
        styles={buildStyles({
          pathColor: '#f00',
          trailColor: '#eee',
          strokeLinecap: 'butt',
        })}
      >
        {/* Foreground path */}
        <CircularProgressbar
          value={70}
          styles={buildStyles({
            trailColor: 'transparent',
            strokeLinecap: 'butt',
          })}
        />
      </CircularProgressbarWithChildren>
    </Example>
    <Example label="Multiple concentric paths">
      <CircularProgressbarWithChildren
        value={75}
        strokeWidth={8}
        styles={buildStyles({
          pathColor: '#f00',
          trailColor: 'transparent',
        })}
      >
        {/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
        <div style={{ width: '84%' }}>
          <CircularProgressbar
            value={70}
            styles={buildStyles({
              trailColor: 'transparent',
            })}
          />
        </div>
      </CircularProgressbarWithChildren>
    </Example>
    <Example label="Background">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: '#3e98c7',
          textColor: '#fff',
          pathColor: '#fff',
          trailColor: 'transparent',
        })}
      />
    </Example>
    <Example label="Counterclockwise">
      <CircularProgressbar value={percentage} text={`${percentage}%`} counterClockwise />
    </Example>

    <Example label="Pie chart">
      <CircularProgressbar
        value={percentage}
        strokeWidth={50}
        styles={buildStyles({
          strokeLinecap: 'butt',
        })}
      />
    </Example>
    <Example label="Progressbar with separators">
      <CircularProgressbarWithChildren
        value={80}
        text={`${80}%`}
        strokeWidth={10}
        styles={buildStyles({
          strokeLinecap: 'butt',
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: '#fff',
            width: '2px',
            // This needs to be equal to props.strokeWidth
            height: `${10}%`,
          }}
        />
      </CircularProgressbarWithChildren>
    </Example>
    <Example label="Dashboard/speedometer">
      <ChangingProgressProvider values={[0, 20, 80]}>
        {(value) => (
          <CircularProgressbar
            value={value}
            text={`${value}%`}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: 'butt',
              trailColor: '#eee',
            })}
          />
        )}
      </ChangingProgressProvider>
    </Example>
  </div>
);

function Example(props) {
  return (
    <div style={{ marginBottom: 80 }}>
      <hr style={{ border: '2px solid #ddd' }} />
      <div style={{ marginTop: 30, display: 'flex' }}>
        <div style={{ width: '30%', paddingRight: 30 }}>{props.children}</div>
        <div style={{ width: '70%' }}>
          <h3 className="h5">{props.label}</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));
