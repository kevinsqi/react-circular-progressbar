import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

type Props = {
  percentages: number[];
  interval: number;
  children: (percentage: number) => React.ReactNode;
};

type State = {
  percentagesIndex: number;
};

class ChangingProgressProvider extends React.Component<Props, State> {
  static defaultProps = {
    interval: 1000,
  };

  state = {
    percentagesIndex: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        percentagesIndex: (this.state.percentagesIndex + 1) % this.props.percentages.length,
      });
    }, this.props.interval);
  }

  render() {
    return this.props.children(this.props.percentages[this.state.percentagesIndex]);
  }
}

export default ChangingProgressProvider;
