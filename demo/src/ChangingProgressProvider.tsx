import React from 'react';

type Props = {
  values: number[];
  interval: number;
  children: (value: number) => React.ReactNode;
};

type State = {
  valuesIndex: number;
};

class ChangingProgressProvider extends React.Component<Props, State> {
  static defaultProps = {
    interval: 1000,
  };

  state = {
    valuesIndex: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length,
      });
    }, this.props.interval);
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
