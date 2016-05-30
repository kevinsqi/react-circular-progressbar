import React from 'react';
import ReactDOM from 'react-dom';
import CircularProgressbar from '../src';

console.log(`react-circular-progressbar v${COMPONENT_VERSION}`);

const githubURL = 'https://github.com/iqnivek/react-circular-progressbar';

const Config = ({ name, example, description, children }) => (
  <div className="row m-b-3">
    <div className="col-xs-12 col-md-6 offset-md-3">
      <p><code>{name}</code><small className="text-muted m-l-1">{example ? `e.g. ${example}` : null}</small></p>
      <p>{description}</p>
      <div className="row">
        <div className="col-xs-6 offset-xs-3">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const Example = ({ description, children }) => (
  <div className="col-xs-12 col-md-4">
    <div className="row">
      <div className="col-xs-6 offset-xs-3">
        {children}
      </div>
    </div>
    <p>{description}</p>
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
        <div className="row m-y-3">
          <div className="col-xs-12">
            <div className="text-md-center">
              <h1 className="m-b-2">{COMPONENT_NAME}</h1>
              <p>{COMPONENT_DESCRIPTION}</p>
            </div>
          </div>
        </div>

        <div className="row m-b-3">
          <div className="col-xs-6 offset-xs-3 col-md-2 offset-md-5">
            <ChangingProgressbar
              percentages={[0, 20, 40, 60, 80, 100]}
            />
          </div>
        </div>

        <div className="text-xs-center m-y-3">
          <p>Install with npm:</p>
          <p className="m-b-3"><code>npm install {COMPONENT_NAME}</code></p>
          <a className="btn btn-info btn-lg" href={githubURL}>View project on Github</a>
        </div>

        <hr />

        <div className="row">
          <Example
            description="Configure color/styling based on percentage using plain old CSS classes."
          >
            <ChangingProgressbar
              percentages={[75, 100]}
              classForPercentage={(percentage) => {
                return percentage === 100 ? 'complete' : 'incomplete';
              }}
            />
          </Example>

          <Example
            description="Show animation on initial mount."
          >
            <CircularProgressbar percentage={100} initialAnimation={true} />
          </Example>

          <Example
            description="Configure text formatting, optionally based on percentage."
          >
            <ChangingProgressbar
              percentages={[0, 25, 50, 75, 100]}
              textForPercentage={(percentage) => {
                if (percentage === 0) {
                  return `$${percentage}`;
                } else if (percentage < 50) {
                  return `${percentage}!`;
                } else if (percentage < 75) {
                  return `${percentage}`;
                } else if (percentage < 100) {
                  return `*${percentage}*`;
                } else {
                  return `${percentage}/100`;
                }
              }}
            />
          </Example>
        </div>

        <hr />
        <h2 className="text-md-center m-y-3">Configuration</h2>

        <Config
          name="percentage"
          description="Percentage to display."
        />

        <hr />
        <div className="text-xs-center m-y-3">
          <a className="btn btn-info btn-lg" href={githubURL}>View project on Github</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));
