import React from 'react';
import ReactDOM from 'react-dom';
import CircularProgressbar from '../src';

console.log(`react-circular-progressbar v${COMPONENT_VERSION}`);

const githubURL = 'https://github.com/iqnivek/react-circular-progressbar';

const Example = ({ description, children }) => (
  <div className="col-xs-12 col-sm-6 col-md-3">
    <div className="row mb-1">
      <div className="col-xs-6 offset-xs-3">
        {children}
      </div>
    </div>
    <p className="text-xs-center">{description}</p>
  </div>
);

class ChangingProgressbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPercentageIndex: 0,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentPercentageIndex: (this.state.currentPercentageIndex + 1) % this.props.percentages.length
      });
    }, this.props.interval);
  }

  render() {
    return <CircularProgressbar {...this.props} percentage={this.props.percentages[this.state.currentPercentageIndex]} />;
  }
}
ChangingProgressbar.defaultProps = {
  interval: 1000,
}

class Demo extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-xs-12">
            <div className="text-xs-center">
              <h1 className="mb-2">{COMPONENT_NAME}</h1>
              <p>{COMPONENT_DESCRIPTION}</p>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-xs-6 offset-xs-3 col-md-2 offset-md-5">
            <ChangingProgressbar
              percentages={[0, 20, 40, 60, 80, 100]}
            />
          </div>
        </div>

        <hr />
        <div className="row mt-3">
          <h2 className="text-xs-center mb-3">Built with SVG and styled with plain CSS.</h2>

          <Example
            description="Customize text and styling dynamically based on percentage."
          >
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

          <Example
            description="Customize stroke width and make it go counterclockwise."
          >
            <ChangingProgressbar
              percentages={[0, 20, 80]}
              strokeWidth={5}
              counterClockwise
            />
          </Example>

          <Example
            description="Add a background color for that inverted look."
          >
            <CircularProgressbar
              className="CircularProgressbar-inverted"
              background
              backgroundPadding={5}
              strokeWidth={6}
              percentage={66}
            />
          </Example>

          <Example
            description="With SVG and CSS you can do whatever you want."
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <div style={{ position: 'absolute', width: '100%' }}>
                <CircularProgressbar
                  percentage={50}
                  textForPercentage={null}
                />
              </div>
              <div style={{ width: '100%', padding: '10%' }}>
                <img style={{ width: '100%' }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" />
              </div>
            </div>
          </Example>
        </div>

        <hr />
        <div className="row mt-3 mb-3">
          <h2 className="text-xs-center">Installation</h2>
          <div className="text-xs-center mt-3">
            <p>Install with npm:</p>
            <p className="mb-3"><code>npm install {COMPONENT_NAME}</code></p>
            <a className="btn btn-info btn-lg" href={githubURL}>View docs on Github</a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));
