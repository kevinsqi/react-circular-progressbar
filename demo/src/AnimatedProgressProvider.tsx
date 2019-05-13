import React from 'react';
import { Animate } from 'react-move';

type Props = {
  duration: number;
  easingFunction: Function;
  valueStart: number;
  valueEnd: number;
  children: (value: number) => React.ReactElement;
};

type State = {
  isAnimated: boolean;
};

class AnimatedProgressProvider extends React.Component<Props, State> {
  state = {
    isAnimated: false,
  };

  static defaultProps = {
    valueStart: 0,
  };

  componentDidMount() {
    this.setState({
      isAnimated: true,
    });
  }

  render() {
    return (
      <Animate
        start={() => ({
          value: this.props.valueStart,
        })}
        update={() => ({
          value: [this.state.isAnimated ? this.props.valueEnd : this.props.valueStart],
          timing: {
            duration: this.props.duration * 1000,
            ease: this.props.easingFunction,
          },
        })}
      >
        {({ value }) => this.props.children(value)}
      </Animate>
    );
  }
}

export default AnimatedProgressProvider;
