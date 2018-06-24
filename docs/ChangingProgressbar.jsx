import React from 'react';
import CircularProgressbar from '../src';

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

  getStyles() {
    return this.props.stylesForPercentage ? (
      this.props.stylesForPercentage(this.getCurrentPercentage())
    ) : {};
  }

  getCurrentPercentage() {
    return this.props.percentages[this.state.currentPercentageIndex];
  }

  getText() {
    return this.props.textForPercentage
      ? this.props.textForPercentage(this.getCurrentPercentage())
      : `${this.getCurrentPercentage()}%`;
  }

  render() {
    return (
      <CircularProgressbar
        {...this.props}
        percentage={this.getCurrentPercentage()}
        text={this.getText()}
        styles={this.getStyles()}
      />
    );
  }
}

ChangingProgressbar.defaultProps = {
  interval: 1000,
}

export default ChangingProgressbar;
