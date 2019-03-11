import React from 'react';
import ReactDOM from 'react-dom';
import CircularProgressbar from '../src';
import ChangingProgressbar from './ChangingProgressbar';

const githubURL = 'https://github.com/kevinsqi/react-circular-progressbar';

const Example = ({ description, children }) => (
  <div className="col-xs-12 col-sm-6 col-md-3">
    <div className="row mb-1">
      <div className="col-xs-6 offset-xs-3">{children}</div>
    </div>
    <p className="text-xs-center">{description}</p>
  </div>
);

class Demo extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-xs-12">
            <div className="text-xs-center">
              <h1 className="mb-2">react-circular-progressbar</h1>
              <p>A circular progress indicator component</p>
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col-xs-6 offset-xs-3 col-md-2 offset-md-5">
            <ChangingProgressbar
              percentages={[0, 20, 40, 60, 80, 100]}
              stylesForPercentage={(percentage) => {
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
        <div className="row mt-3">
          <h2 className="text-xs-center mb-3">Built with SVG and styled with plain CSS.</h2>

          <Example description="Customize text and styling dynamically based on percentage.">
            <ChangingProgressbar
              percentages={[75, 100]}
              classForPercentage={(percentage) => {
                return percentage === 100 ? 'complete' : 'incomplete';
              }}
              textForPercentage={(percentage) => {
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
        </div>

        <hr />
        <div className="mt-3 mb-3">
          <h2 className="text-xs-center">Installation</h2>
          <div className="text-xs-center mt-3">
            <p>Install with yarn or npm:</p>
            <p className="mb-3">
              <code>yarn add react-circular-progressbar</code>
            </p>
            <a className="btn btn-info btn-lg" href={githubURL}>
              View docs on Github
            </a>
          </div>
        </div>

        <hr />
        <div className="mt-3 mb-3">
          <h2 className="text-xs-center">Try it out</h2>
          <div className="row mt-3">
            <div className="col-md-10 offset-md-1">
              <iframe
                src="https://codesandbox.io/embed/vymm4oln6y"
                style={{
                  width: '100%',
                  height: '500px',
                  border: 0,
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
                sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>

        <hr />
        <div className="my-3">
          <div className="text-xs-center">
            <a className="btn btn-info btn-lg" href={githubURL}>
              View docs on Github
            </a>
            <div className="mt-3">
              Built by <a href="http://www.kevinqi.com/">Kevin Qi</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));
