import React from 'react';

type Props = {
  valueStart: number;
  valueEnd: number;
  children: (value: number) => React.ReactNode;
};

type State = {
  value: number;
};

class ProgressProvider extends React.Component<Props, State> {
  timeout: number | undefined = undefined;

  state = {
    value: this.props.valueStart,
  };

  static defaultProps = {
    valueStart: 0,
  };

  componentDidMount() {
    this.timeout = window.setTimeout(() => {
      this.setState({
        value: this.props.valueEnd,
      });
    }, 0);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  render() {
    return this.props.children(this.state.value);
  }
}

export default ProgressProvider;
