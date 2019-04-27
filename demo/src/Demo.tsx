import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import ChangingProgressbar from './ChangingProgressbar';

const githubURL = 'https://github.com/kevinsqi/react-circular-progressbar';

const Example: React.FunctionComponent<{ description: string }> = ({ description, children }) => (
  <div className="col-12 col-sm-6 col-md-3">
    <div className="row mb-1">
      <div className="col-6 offset-3">{children}</div>
    </div>
    <p className="text-center">{description}</p>
  </div>
);

function Demo() {
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
          <ChangingProgressbar
            percentages={[0, 20, 40, 60, 80, 100]}
            stylesForPercentage={(percentage: number) => {
              const alpha = (100 + percentage) / 200;
              return {
                path: {
                  stroke: `rgba(62, 152, 199, ${alpha})`,
                },
              };
            }}
          />
        </div>
      </div>

      <hr />
      <div className="row mt-5">
        <div className="col-12  mb-5">
          <h2 className="text-center">Built with SVG and styled with plain CSS.</h2>
        </div>

        <Example description="Customize text and styling dynamically based on percentage.">
          <ChangingProgressbar
            percentages={[75, 100]}
            classForPercentage={(percentage: number) => {
              return percentage === 100 ? 'complete' : 'incomplete';
            }}
            textForPercentage={(percentage: number) => {
              return percentage === 100 ? `${percentage}!!` : `${percentage}`;
            }}
          />
        </Example>

        <Example description="Customize stroke width and make it go counterclockwise.">
          <ChangingProgressbar percentages={[0, 20, 80]} strokeWidth={5} counterClockwise />
        </Example>

        <Example description="Add a background color for that inverted look.">
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

        <Example description="With SVG and CSS you can do whatever you want.">
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', width: '100%' }}>
              <CircularProgressbar percentage={50} />
            </div>
            <div style={{ width: '100%', padding: '10%' }}>
              <img style={{ width: '100%' }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" />
            </div>
          </div>
        </Example>

        <Example description="Dashboard style.">
          <CircularProgressbar percentage={50} percentageOfCircleToShow={70} />
        </Example>

        <Example description="Dashboard style, counterclockwise.">
          <CircularProgressbar percentage={50} percentageOfCircleToShow={70} counterClockwise />
        </Example>
      </div>

      <hr />
      <div className="mt-5 mb-5">
        <h2 className="text-center">Installation</h2>
        <div className="text-center mt-5">
          <p>Install with yarn or npm:</p>
          <p className="mb-5">
            <code className="p-2 text-dark bg-yellow">yarn add react-circular-progressbar</code>
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
