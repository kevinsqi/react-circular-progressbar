import React from 'react';
import CircularProgressbar, { buildStyles } from 'react-circular-progressbar';
import classNames from 'classnames';
import { easeSinOut, easeQuadIn, easeQuadInOut, easeLinear, easeCubicInOut } from 'd3-ease';

// Custom progressbar wrappers
import AnimatedProgressbar from './AnimatedProgressbar';
import ChangingProgressbar from './ChangingProgressbar';

const githubURL = 'https://github.com/kevinsqi/react-circular-progressbar';

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
          <ChangingProgressbar percentages={[0, 20, 40, 60, 80, 100]} />
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
              <Code>props.className</Code> based on percentage.
            </span>
          }
        >
          <ChangingProgressbar
            percentages={[75, 100]}
            classForPercentage={(percentage: number) => {
              return percentage === 100 ? 'complete' : 'incomplete';
            }}
            textForPercentage={(percentage: number) => {
              return percentage === 100 ? `${percentage}!!` : `${percentage}...`;
            }}
          />
        </Example>

        <Example
          description={
            <span>
              Customize <Code>props.strokeWidth</Code> and make it go counterclockwise with{' '}
              <Code>props.counterClockwise</Code>.
            </span>
          }
        >
          <ChangingProgressbar
            percentages={[20, 80]}
            strokeWidth={5}
            counterClockwise
            stylesForPercentage={(percentage: number) => {
              const alpha = (100 + percentage) / 200;
              return {
                path: {
                  stroke: `rgba(62, 152, 199, ${alpha})`,
                },
              };
            }}
          />
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
            percentage={66}
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
              Use a library like react-move to ease <Code>props.percentage</Code> if you want to
              animate text.
            </span>
          }
        >
          <AnimatedProgressbar percentage={66} duration={1.4} easingFunction={easeQuadInOut} />
        </Example>

        <Example
          description={
            <span>
              "Give me that car speedometer look?" Use <Code>props.circleRatio</Code> and CSS
              rotation.
            </span>
          }
        >
          <CircularProgressbar
            percentage={66}
            text={`${66}%`}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: 'butt',
              pathColor: 'orange',
              trailColor: '#eee',
            })}
          />
        </Example>

        <Example description="Need multiple lines of text or custom content? With a bit of CSS you can do whatever you want.">
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', width: '100%' }}>
              <CircularProgressbar percentage={66} />
            </div>
            <div style={{ width: '100%', padding: '20%' }}>
              <img style={{ width: '100%' }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" />
            </div>
          </div>
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
                percentage={50}
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
              <small>Show more examples</small>
            </button>
          </div>
        )}
      </div>

      <hr />
      <div className="mt-5 mb-5">
        <h2 className="text-center">Installation</h2>
        <div className="text-center mt-5">
          <p>Install with yarn or npm:</p>
          <p className="mb-5">
            <Code>yarn add react-circular-progressbar</Code>
          </p>
          <a className="btn btn-info btn-lg" href={githubURL}>
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
