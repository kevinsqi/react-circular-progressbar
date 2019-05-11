import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

type Props = {
  percentageStart: number;
  percentageEnd: number;
  children: (percentage: number) => React.ReactNode;
};

type State = {
  percentage: number;
};

class PercentageProvider extends React.Component<Props, State> {
  timeout: number | undefined = undefined;

  state = {
    percentage: this.props.percentageStart,
  };

  static defaultProps = {
    percentageStart: 0,
  };

  componentDidMount() {
    this.timeout = window.setTimeout(() => {
      this.setState({
        percentage: this.props.percentageEnd,
      });
    }, 0);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  render() {
    return this.props.children(this.state.percentage);
  }
}

export default PercentageProvider;
