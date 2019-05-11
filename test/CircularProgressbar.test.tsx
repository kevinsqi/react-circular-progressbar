import React from 'react';
import { mount, shallow, ReactWrapper } from 'enzyme';

import { CircularProgressbar } from '../src/index';

function getExpectedStrokeDashoffset({
  percentage,
  strokeWidth,
}: {
  percentage: number;
  strokeWidth: number;
}) {
  const radius = 50 - strokeWidth / 2;
  const diameter = 2 * radius * Math.PI;
  const expectedGapLength = (1 - percentage / 100) * diameter;
  return `${expectedGapLength}px`;
}

describe('<CircularProgressbar />', () => {
  test('SVG rendered to DOM', () => {
    const wrapper = shallow(<CircularProgressbar value={50} />);
    expect(wrapper.find('svg').exists()).toBe(true);
  });
  describe('props.strokeWidth', () => {
    test('Applies to path', () => {
      const wrapper = shallow(<CircularProgressbar value={50} strokeWidth={2} />);
      expect(wrapper.find('.CircularProgressbar-path').prop('strokeWidth')).toEqual(2);
    });
  });
  describe('props.className', () => {
    test('Applies to SVG', () => {
      const wrapper = shallow(<CircularProgressbar value={50} className="my-custom-class" />);
      expect(wrapper.find('svg').prop('className')).toContain('my-custom-class');
    });
  });
  describe('props.text', () => {
    test('Does not render when blank', () => {
      const wrapper = shallow(<CircularProgressbar value={50} />);
      expect(wrapper.find('.CircularProgressbar-text').exists()).toEqual(false);
    });
    test('Renders the correct string', () => {
      const percentage = 50;
      const wrapper = shallow(<CircularProgressbar value={percentage} text={`${percentage}%`} />);
      expect(wrapper.find('.CircularProgressbar-text').text()).toEqual('50%');
    });
  });
  describe('props.value', () => {
    test('Renders correct path', () => {
      const percentage = 30;
      const wrapper = mount(
        <CircularProgressbar value={percentage} strokeWidth={0} className="my-custom-class" />,
      );

      expect(
        wrapper
          .find('.CircularProgressbar-path')
          .hostNodes()
          .prop('style')!.strokeDashoffset,
      ).toEqual(getExpectedStrokeDashoffset({ percentage, strokeWidth: 0 }));

      const expectedRadius = 50;
      const expectedArcto = `a ${expectedRadius},${expectedRadius}`;
      expect(
        wrapper
          .find('.CircularProgressbar-path')
          .hostNodes()
          .prop('d'),
      ).toContain(expectedArcto);
    });
  });
  describe('props.counterClockwise', () => {
    test('Reverses dashoffset', () => {
      const clockwise = mount(<CircularProgressbar value={50} />);
      const counterClockwise = mount(<CircularProgressbar value={50} counterClockwise />);

      // Counterclockwise should have the negative dashoffset of clockwise
      expect(
        `-${
          clockwise
            .find('.CircularProgressbar-path')
            .hostNodes()
            .prop('style')!.strokeDashoffset
        }`,
      ).toEqual(
        counterClockwise
          .find('.CircularProgressbar-path')
          .hostNodes()
          .prop('style')!.strokeDashoffset,
      );
    });
  });
  describe('props.circleRatio', () => {
    test('Default full diameter', () => {
      const percentage = 25;
      const strokeWidth = 5;
      const wrapper = mount(
        <CircularProgressbar value={percentage} strokeWidth={strokeWidth} circleRatio={1} />,
      );

      expect(
        wrapper
          .find('.CircularProgressbar-path')
          .hostNodes()
          .prop('style')!.strokeDashoffset,
      ).toEqual(getExpectedStrokeDashoffset({ percentage, strokeWidth }));
    });

    test('Correct path and trail lengths', () => {
      const percentage = 25;
      const strokeWidth = 5;
      const circleRatio = 0.8;
      const wrapper = mount(
        <CircularProgressbar
          value={percentage}
          strokeWidth={strokeWidth}
          circleRatio={circleRatio}
        />,
      );

      // Path offset should be scaled
      expect(
        wrapper
          .find('.CircularProgressbar-path')
          .hostNodes()
          .prop('style')!.strokeDashoffset,
      ).toEqual(getExpectedStrokeDashoffset({ percentage: percentage * circleRatio, strokeWidth }));

      // Trail offset should be scaled
      expect(
        wrapper
          .find('.CircularProgressbar-trail')
          .hostNodes()
          .prop('style')!.strokeDashoffset,
      ).toEqual(getExpectedStrokeDashoffset({ percentage: 100 * circleRatio, strokeWidth }));
    });
  });
  describe('props.styles', () => {
    test('Style customizations applied to all subcomponents', () => {
      const percentage = 50;
      const wrapper = shallow(
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          background
          styles={{
            root: { stroke: '#000000' },
            trail: { stroke: '#111111' },
            path: { stroke: '#222222' },
            text: { stroke: '#333333' },
            background: { stroke: '#444444' },
          }}
        />,
      );
      expect(wrapper.find('.CircularProgressbar').prop('style')!.stroke).toEqual('#000000');
      expect(wrapper.find('.CircularProgressbar-trail').prop('style')!.stroke).toEqual('#111111');
      expect(wrapper.find('.CircularProgressbar-path').prop('style')!.stroke).toEqual('#222222');
      expect(wrapper.find('.CircularProgressbar-text').prop('style')!.stroke).toEqual('#333333');
      expect(wrapper.find('.CircularProgressbar-background').prop('style')!.stroke).toEqual(
        '#444444',
      );
    });
  });
  describe('props.background', () => {
    test('Background does not render when prop is false', () => {
      const wrapper = shallow(<CircularProgressbar value={50} background={false} />);
      expect(wrapper.find('.CircularProgressbar-background').exists()).toEqual(false);
    });
    test('Renders a <circle> with correct radius', () => {
      const wrapper = shallow(<CircularProgressbar value={50} background />);
      expect(wrapper.find('.CircularProgressbar-background').exists()).toBe(true);
      expect(wrapper.find('.CircularProgressbar-background').type()).toEqual('circle');
      expect(wrapper.find('.CircularProgressbar-background').prop('r')).toEqual(50);
    });
  });
  describe('props.classes', () => {
    test('Has default values', () => {
      const wrapper = mount(<CircularProgressbar value={50} text="50" />);
      expect(
        wrapper
          .find('.CircularProgressbar')
          .hostNodes()
          .type(),
      ).toEqual('svg');
      expect(
        wrapper
          .find('.CircularProgressbar-path')
          .hostNodes()
          .type(),
      ).toEqual('path');
      expect(
        wrapper
          .find('.CircularProgressbar-trail')
          .hostNodes()
          .type(),
      ).toEqual('path');
      expect(
        wrapper
          .find('.CircularProgressbar-text')
          .hostNodes()
          .type(),
      ).toEqual('text');
    });
    test('Prop overrides work', () => {
      const wrapper = mount(
        <CircularProgressbar
          value={50}
          text="50"
          background
          classes={{
            root: 'someRootClass',
            path: 'somePathClass',
            trail: 'someTrailClass',
            text: 'someTextClass',
            background: 'someBackgroundClass',
          }}
        />,
      );

      // Assert default classes don't exist
      expect(wrapper.find('.CircularProgressbar').exists()).toBe(false);
      expect(wrapper.find('.CircularProgressbar-path').exists()).toBe(false);
      expect(wrapper.find('.CircularProgressbar-trail').exists()).toBe(false);
      expect(wrapper.find('.CircularProgressbar-text').exists()).toBe(false);
      expect(wrapper.find('.CircularProgressbar-background').exists()).toBe(false);

      // Assert override classes do exist
      expect(
        wrapper
          .find('.someRootClass')
          .hostNodes()
          .type(),
      ).toEqual('svg');
      expect(
        wrapper
          .find('.somePathClass')
          .hostNodes()
          .type(),
      ).toEqual('path');
      expect(
        wrapper
          .find('.someTrailClass')
          .hostNodes()
          .type(),
      ).toEqual('path');
      expect(
        wrapper
          .find('.someTextClass')
          .hostNodes()
          .type(),
      ).toEqual('text');
      expect(
        wrapper
          .find('.someBackgroundClass')
          .hostNodes()
          .type(),
      ).toEqual('circle');
    });
  });
});
