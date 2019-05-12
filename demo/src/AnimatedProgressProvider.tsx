import React from 'react';
import { Animate } from 'react-move';

type Props = {
  duration: number;
  easingFunction: Function;
  percentageStart: number;
  percentageEnd: number;
  children: (percentage: number) => React.ReactElement;
};

type State = {
  isAnimated: boolean;
};

class AnimatedProgressProvider extends React.Component<Props, State> {
  state = {
    isAnimated: false,
  };

  static defaultProps = {
    percentageStart: 0,
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
          percentage: this.props.percentageStart,
        })}
        update={() => ({
          percentage: [
            this.state.isAnimated ? this.props.percentageEnd : this.props.percentageStart,
          ],
          timing: {
            duration: this.props.duration * 1000,
            ease: this.props.easingFunction,
          },
        })}
      >
        {({ percentage }) => this.props.children(percentage)}
      </Animate>
    );
  }
}

export default AnimatedProgressProvider;
