import React from 'react';
import { Animate } from 'react-move';
import CircularProgressbar from 'react-circular-progressbar';

type Props = {
  duration: number;
  easingFunction: Function;
  percentage: number;
};

type State = {
  isAnimated: boolean;
};

class AnimatedProgressbar extends React.Component<Props, State> {
  state = {
    isAnimated: false,
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
          percentage: 0,
        })}
        update={() => ({
          percentage: [this.state.isAnimated ? this.props.percentage : 0],
          timing: {
            duration: this.props.duration * 1000,
            ease: this.props.easingFunction,
          },
        })}
      >
        {({ percentage }) => {
          const roundedPercentage = Math.round(percentage);
          return (
            <CircularProgressbar
              percentage={roundedPercentage}
              text={`${roundedPercentage}%`}
              styles={{
                path: {
                  transition: 'none',
                },
              }}
            />
          );
        }}
      </Animate>
    );
  }
}

export default AnimatedProgressbar;
