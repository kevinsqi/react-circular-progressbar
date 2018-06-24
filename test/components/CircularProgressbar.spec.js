import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import CircularProgressbar from '../../src';

describe('CircularProgressbar', () => {
  it('should not throw exceptions in base case', () => {
    assert.doesNotThrow(() => <CircularProgressbar percentage={50} />);
  });

  it('should render as an svg', () => {
    const wrapper = shallow(
      <CircularProgressbar percentage={50} />
    );
    assert.equal(1, wrapper.find('svg').length);
  });
});

describe('CircularProgressbar props', () => {
  it('strokeWidth', () => {
    const wrapper = shallow(
      <CircularProgressbar
        percentage={50}
        strokeWidth={2}
      />
    );
    assert.equal(2, wrapper.find('.CircularProgressbar-path').prop('strokeWidth'));
  });

  it('className', () => {
    const wrapper = shallow(
      <CircularProgressbar
        percentage={50}
        className="my-custom-class"
      />
    );
    assert(wrapper.find('svg').prop('className').includes('my-custom-class'));
  });

  it('text does not render when null', () => {
    const wrapper = shallow(
      <CircularProgressbar
        percentage={50}
      />
    );
    assert(!wrapper.find('.CircularProgressbar-text').exists());
  });

  it('text', () => {
    const percentage = 50;
    const wrapper = shallow(
      <CircularProgressbar
        percentage={percentage}
        text={`${percentage}%`}
      />
    );
    assert.equal(wrapper.find('.CircularProgressbar-text').text(), '50%');
  });

  it('percentage', () => {
    const percentage = 30;
    const wrapper = shallow(
      <CircularProgressbar
        percentage={percentage}
        strokeWidth={0}
        className="my-custom-class"
      />
    );

    const dashoffset = wrapper.find('.CircularProgressbar-path').prop('style').strokeDashoffset;
    const expectedRadius = 50;
    const expectedDiameter = 2 * expectedRadius * Math.PI;
    const expectedOffset = ((100 - percentage) / 100) * expectedDiameter;
    assert.equal(dashoffset, `${expectedOffset}px`);

    const expectedArcto = `a ${expectedRadius},${expectedRadius}`;
    assert(wrapper.find('.CircularProgressbar-path').prop('d').includes(expectedArcto));
  });

  it('counterClockwise', () => {
    const clockwise = shallow(
      <CircularProgressbar percentage={50} />
    );
    const counterClockwise = shallow(
      <CircularProgressbar percentage={50} counterClockwise />
    );

    assert.equal(
      `-${clockwise.find('.CircularProgressbar-path').prop('style').strokeDashoffset}`,
      counterClockwise.find('.CircularProgressbar-path').prop('style').strokeDashoffset,
      'counterclockwise should have the negative dashoffset of clockwise',
    );
  });

  it('styles', () => {
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
      />
    );
    assert.equal(
      wrapper.find('.CircularProgressbar').prop('style').stroke,
      '#000000',
    );
    assert.equal(
      wrapper.find('.CircularProgressbar-trail').prop('style').stroke,
      '#111111',
    );
    assert.equal(
      wrapper.find('.CircularProgressbar-path').prop('style').stroke,
      '#222222',
    );
    assert.equal(
      wrapper.find('.CircularProgressbar-text').prop('style').stroke,
      '#333333',
    );
    assert.equal(
      wrapper.find('.CircularProgressbar-background').prop('style').stroke,
      '#444444',
    );
  });
});
