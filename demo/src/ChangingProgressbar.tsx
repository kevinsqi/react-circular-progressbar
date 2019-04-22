import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

type CircularProgressbarProps = {
  counterClockwise?: boolean;
  strokeWidth?: number;
};

type Props = CircularProgressbarProps &
  typeof ChangingProgressbar.defaultProps & {
    percentages: number[];
    classForPercentage?: (percentage: number) => string;
    stylesForPercentage?: (percentage: number) => {};
    textForPercentage?: (percentage: number) => string;
  };

type State = {
  currentPercentageIndex: number;
};

class ChangingProgressbar extends React.Component<Props, State> {
  static defaultProps = {
    interval: 1000,
    classForPercentage: (percentage: number) => '',
    stylesForPercentage: (percentage: number) => ({}),
    textForPercentage: (percentage: number) => `${percentage}%`,
  };

  state = {
    currentPercentageIndex: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentPercentageIndex:
          (this.state.currentPercentageIndex + 1) % this.props.percentages.length,
      });
    }, this.props.interval);
  }

  getCurrentPercentage() {
    return this.props.percentages[this.state.currentPercentageIndex];
  }

  getClassName() {
    return this.props.classForPercentage(this.getCurrentPercentage());
  }

  getStyles() {
    return this.props.stylesForPercentage(this.getCurrentPercentage());
  }

  getText() {
    return this.props.textForPercentage(this.getCurrentPercentage());
  }

  render() {
    return (
      <CircularProgressbar
        {...this.props}
        className={this.getClassName()}
        percentage={this.getCurrentPercentage()}
        text={this.getText()}
        styles={this.getStyles()}
      />
    );
  }
}

export default ChangingProgressbar;
