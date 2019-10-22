import React from 'react';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import classNames from 'classnames';
import { easeQuadInOut } from 'd3-ease';

// Custom progressbar wrappers
import AnimatedProgressProvider from './AnimatedProgressProvider';
import ChangingProgressProvider from './ChangingProgressProvider';
import ProgressProvider from './ProgressProvider';

const GITHUB_URL = 'https://github.com/kevinsqi/react-circular-progressbar';
const CODESANDBOX_EXAMPLES_URL = 'https://codesandbox.io/s/vymm4oln6y';

const Code: React.FunctionComponent<React.HTMLProps<HTMLSpanElement>> = (props) => (
  <code className={classNames('p-1 bg-yellow text-dark', props.className)} {...props} />
);

const Example: React.FunctionComponent<{ description: React.ReactNode }> = ({
  description,
  children,
}) => (
  <div className="col-12 col-sm-6 col-md-4 mt-5">
    <div className="row">
      <div className="col-6 col-md-4 offset-3 offset-md-4">{children}</div>
    </div>
    <p className="text-center mt-3">{description}</p>
  </div>
);

function Demo() {
  const [showAllExamples, setShowAllExamples] = React.useState(false);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <div className="text-center">
            <h1 className="mb-3">react-circular-progressbar</h1>
            <p>A circular progress indicator component</p>
          </div>
        </div>
      </div>

      <div className="row mt-5 mb-5">
        <div className="col-6 offset-3 col-md-2 offset-md-5">
          <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
            {(value) => (
              <CircularProgressbar
                value={value}
                text={`${value}%`}
                styles={buildStyles({
                  strokeLinecap: 'butt',
                })}
              />
            )}
          </ChangingProgressProvider>
        </div>
      </div>

      <hr />
      <div className="row mt-5">
        <div className="col-12">
          <h2 className="text-center">Built with SVG and styled with plain CSS.</h2>
        </div>

        <Example
          description={
            <span>
              Customize <Code>props.text</Code>, <Code>props.styles</Code>, and{' '}
              <Code>props.className</Code> based on value.
            </span>
          }
        >
          <ChangingProgressProvider values={[75, 100]}>
            {(value) => (
              <CircularProgressbar
                value={value}
                className={value === 100 ? 'complete' : 'incomplete'}
                text={value === 100 ? `${value}!!` : `${value}...`}
              />
            )}
          </ChangingProgressProvider>
        </Example>

        <Example
          description={
            <span>
              Customize <Code>props.strokeWidth</Code> and make it go counterclockwise with{' '}
              <Code>props.counterClockwise</Code>.
            </span>
          }
        >
          <ChangingProgressProvider values={[20, 80]}>
            {(value) => (
              <CircularProgressbar
                value={value}
                text={`${value}%`}
                strokeWidth={5}
                counterClockwise
                styles={buildStyles({
                  pathColor: `rgba(62, 152, 199, ${(100 + value) / 200})`,
                  pathTransitionDuration: 0.2,
                })}
              />
            )}
          </ChangingProgressProvider>
        </Example>

        <Example
          description={
            <span>
              Use <Code>props.background</Code> to give it an inverted style.
            </span>
          }
        >
          <CircularProgressbar
            className="CircularProgressbar-inverted"
            background
            backgroundPadding={5}
            strokeWidth={6}
            value={66}
            text={`${66}%`}
            classes={{
              root: 'CircularProgressbar',
              trail: 'CircularProgressbar-trail',
              path: 'CircularProgressbar-path',
              text: 'CircularProgressbar-text some-additional-test-class',
              background: 'CircularProgressbar-background',
            }}
            styles={{
              background: {
                fill: '#3e98c7',
              },
            }}
          />
        </Example>

        <Example
          description={
            <span>
              Use a library like react-move to ease <Code>props.value</Code> if you want to animate
              text.
            </span>
          }
        >
          <AnimatedProgressProvider
            valueStart={5}
            valueEnd={66}
            duration={1.4}
            easingFunction={easeQuadInOut}
          >
            {(value) => {
              const roundedValue = Math.round(value);
              return (
                <CircularProgressbar
                  value={value}
                  text={`${roundedValue}%`}
                  styles={buildStyles({ pathTransition: 'none' })}
                />
              );
            }}
          </AnimatedProgressProvider>
        </Example>

        <Example
          description={
            <span>
              Want that car speedometer look? Use <Code>props.circleRatio</Code> and CSS rotation.
            </span>
          }
        >
          <ProgressProvider valueStart={10} valueEnd={66}>
            {(value) => (
              <CircularProgressbar
                value={value}
                text={`${value}%`}
                circleRatio={0.75}
                styles={buildStyles({
                  rotation: 1 / 2 + 1 / 8,
                  strokeLinecap: 'butt',
                  pathColor: 'orange',
                  trailColor: '#eee',
                })}
              />
            )}
          </ProgressProvider>
        </Example>

        <Example
          description={
            <span>
              Need custom content? Use <Code>CircularProgressbarWithChildren</Code> to add arbitrary
              centered HTML.
            </span>
          }
        >
          <CircularProgressbarWithChildren value={66}>
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

        {showAllExamples ? (
          <React.Fragment>
            <Example
              description={
                <span>
                  <Code>circleRatio</Code>&nbsp;
                  <Code>counterClockwise</Code>&nbsp;
                  <Code>background</Code>
                </span>
              }
            >
              <CircularProgressbar
                value={50}
                circleRatio={0.7}
                counterClockwise
                background
                backgroundPadding={4}
                styles={{
                  trail: {
                    stroke: '#fff',
                  },
                }}
              />
            </Example>
          </React.Fragment>
        ) : (
          <div className="col-12 text-center">
            <button
              className="btn btn-link text-secondary"
              onClick={() => setShowAllExamples(true)}
            >
              <small>Show more</small>
            </button>
          </div>
        )}

        <div className="col-12 text-center mt-3">
          <a className="btn btn-outline-info" href={CODESANDBOX_EXAMPLES_URL}>
            See more examples on CodeSandbox
          </a>
        </div>
      </div>

      <hr className="mt-5" />
      <div className="mt-5 mb-5">
        <h2 className="text-center">Installation</h2>
        <div className="text-center mt-5">
          <p>Install with yarn or npm:</p>
          <p className="mb-5">
            <Code>yarn add react-circular-progressbar</Code>
          </p>
          <a className="btn btn-info btn-lg" href={GITHUB_URL}>
            View docs on Github
          </a>
        </div>
        <div className="text-center">
          <div className="mt-5">
            Built by <a href="https://www.kevinqi.com/">@kevinsqi</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo;
