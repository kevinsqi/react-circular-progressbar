import React from 'react';
import ReactDOM from 'react-dom';
import CircularProgressbar from '../src';

console.log(`react-circular-progressbar v${COMPONENT_VERSION}`);

const githubURL = 'https://github.com/iqnivek/react-circular-progressbar';

const Config = ({ name, example, description, children }) => (
  <div className="row mb-3">
    <div className="col-xs-12 col-md-6 offset-md-3">
      <p><code>{name}</code><small className="text-muted ml-1">{example ? `e.g. ${example}` : null}</small></p>
      <p>{description}</p>
      <div className="row">
        <div className="col-xs-4 offset-xs-4">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const Example = ({ description, children }) => (
  <div className="col-xs-12 col-sm-6">
    <div className="row mb-1">
      <div className="col-xs-4 offset-xs-4">
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
        <div className="row my-3">
          <div className="col-xs-12">
            <div className="text-xs-center">
              <h1 className="mb-2">{COMPONENT_NAME}</h1>
              <p>{COMPONENT_DESCRIPTION}</p>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-xs-6 offset-xs-3 col-md-2 offset-md-5">
            <ChangingProgressbar
              percentages={[0, 20, 40, 60, 80, 100]}
            />
          </div>
        </div>

        <div className="text-xs-center my-3">
          <p>Install with npm:</p>
          <p className="mb-3"><code>npm install {COMPONENT_NAME}</code></p>
          <a className="btn btn-info btn-lg" href={githubURL}>View project on Github</a>
        </div>

        <hr />
        <div className="row mt-3">
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
            description="Configure text formatting and stroke width."
          >
            <CircularProgressbar
              percentage={50}
              strokeWidth={5}
              textForPercentage={(percentage) => `$${percentage}`}
            />
          </Example>
        </div>

        <hr />
        <h2 className="text-xs-center my-3">Props</h2>

        <Config
          name="percentage"
          example="44"
          description="Percentage to display."
        />
        <Config
          name="strokeWidth"
          example="10"
          description="Width of circular line"
        />
        <Config
          name="className"
          example="'your-css-class'"
          description="Classes to apply to the svg element"
        />
        <Config
          name="initialAnimation"
          example="false"
          description="Toggle whether to animate progress starting from 0% on initial mount."
        />
        <Config
          name="classForPercentage"
          example="(pct) => pct < 100 ? 'incomplete' : 'complete'"
          description="Function which can set an additional class to apply to top-level element, which can be used for coloring/styling percentage ranges differently."
        />
        <Config
          name="textForPercentage"
          example="(pct) => `${pct}%`"
          description="Function which sets text formatting given a percentage."
        />

        <hr />
        <div className="text-xs-center my-3">
          <a className="btn btn-info btn-lg" href={githubURL}>View project on Github</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));
