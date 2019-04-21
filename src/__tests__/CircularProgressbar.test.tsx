import React from 'react';
import { shallow } from 'enzyme';

import CircularProgressbar from '../index';

describe('<CircularProgressbar />', () => {
  test('SVG rendered to DOM', () => {
    const wrapper = shallow(<CircularProgressbar percentage={50} />);
    expect(wrapper.find('svg').length).toBe(1);
  });
  describe('props.strokeWidth', () => {
    test('Applies to path', () => {
      const wrapper = shallow(<CircularProgressbar percentage={50} strokeWidth={2} />);
      expect(wrapper.find('.CircularProgressbar-path').prop('strokeWidth')).toEqual(2);
    });
  });
  describe('props.className', () => {
    test('Applies to SVG', () => {
      const wrapper = shallow(<CircularProgressbar percentage={50} className="my-custom-class" />);
      expect(wrapper.find('svg').prop('className')).toContain('my-custom-class');
    });
  });
  describe('props.text', () => {
    test('Does not render when blank', () => {
      const wrapper = shallow(<CircularProgressbar percentage={50} />);
      expect(wrapper.find('.CircularProgressbar-text').exists()).toEqual(false);
    });
    test('Renders the correct string', () => {
      const percentage = 50;
      const wrapper = shallow(
        <CircularProgressbar percentage={percentage} text={`${percentage}%`} />,
      );
      expect(wrapper.find('.CircularProgressbar-text').text()).toEqual('50%');
    });
  });
  describe('props.percentage', () => {
    test('Renders correct path', () => {
      const percentage = 30;
      const wrapper = shallow(
        <CircularProgressbar percentage={percentage} strokeWidth={0} className="my-custom-class" />,
      );

      const dashoffset = wrapper.find('.CircularProgressbar-path').prop('style')!.strokeDashoffset;
      const expectedRadius = 50;
      const expectedDiameter = 2 * expectedRadius * Math.PI;
      const expectedOffset = ((100 - percentage) / 100) * expectedDiameter;
      expect(dashoffset).toEqual(`${expectedOffset}px`);

      const expectedArcto = `a ${expectedRadius},${expectedRadius}`;
      expect(wrapper.find('.CircularProgressbar-path').prop('d')).toContain(expectedArcto);
    });
  });
  describe('props.counterClockwise', () => {
    test('Reverses dashoffset', () => {
      const clockwise = shallow(<CircularProgressbar percentage={50} />);
      const counterClockwise = shallow(<CircularProgressbar percentage={50} counterClockwise />);

      // Counterclockwise should have the negative dashoffset of clockwise
      expect(
        `-${clockwise.find('.CircularProgressbar-path').prop('style')!.strokeDashoffset}`,
      ).toEqual(counterClockwise.find('.CircularProgressbar-path').prop('style')!.strokeDashoffset);
    });
  });
  describe('props.styles', () => {
    test('Style customizations applied to all subcomponents', () => {
      const percentage = 50;
      const wrapper = shallow(
        <CircularProgressbar
          percentage={percentage}
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
      const wrapper = shallow(<CircularProgressbar percentage={50} background={false} />);
      expect(wrapper.find('.CircularProgressbar-background').exists()).toEqual(false);
    });
    test('Renders a <circle> with correct radius', () => {
      const wrapper = shallow(<CircularProgressbar percentage={50} background />);
      expect(wrapper.find('.CircularProgressbar-background').exists()).toBe(true);
      expect(wrapper.find('.CircularProgressbar-background').type()).toEqual('circle');
      expect(wrapper.find('.CircularProgressbar-background').prop('r')).toEqual(50);
    });
  });
  describe('props.classes', () => {
    test('Has default values', () => {
      const wrapper = shallow(<CircularProgressbar percentage={50} text="50" />);
      expect(wrapper.find('.CircularProgressbar').type()).toEqual('svg');
      expect(wrapper.find('.CircularProgressbar-path').type()).toEqual('path');
      expect(wrapper.find('.CircularProgressbar-trail').type()).toEqual('path');
      expect(wrapper.find('.CircularProgressbar-text').type()).toEqual('text');
    });
    test('Prop overrides work', () => {
      const wrapper = shallow(
        <CircularProgressbar
          percentage={50}
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
      expect(wrapper.find('.someRootClass').type()).toEqual('svg');
      expect(wrapper.find('.somePathClass').type()).toEqual('path');
      expect(wrapper.find('.someTrailClass').type()).toEqual('path');
      expect(wrapper.find('.someTextClass').type()).toEqual('text');
      expect(wrapper.find('.someBackgroundClass').type()).toEqual('circle');
    });
  });
});
