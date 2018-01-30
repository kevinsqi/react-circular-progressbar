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

  it('classForPercentage', () => {
    function classForPercentage(percentage) {
      return percentage < 100 ? 'incomplete' : 'done';
    }
    const bar1 = shallow(
      <CircularProgressbar
        percentage={50}
        classForPercentage={classForPercentage}
      />
    );
    assert.include(bar1.find('.CircularProgressbar').prop('className'), 'incomplete', 'should have correct class depending on percentage');

    const bar2 = shallow(
      <CircularProgressbar
        percentage={100}
        classForPercentage={classForPercentage}
      />
    );
    assert.include(bar2.find('.CircularProgressbar').prop('className'), 'done', 'should have correct class depending on percentage');
  });

  it('textForPercentage', () => {
    function textForPercentage(percentage) {
      return percentage < 50 ? `meh ${percentage}` : `yey ${percentage}`;
    }
    const bar1 = shallow(
      <CircularProgressbar
        percentage={25}
        textForPercentage={textForPercentage}
      />
    );
    assert.equal('meh 25', bar1.find('.CircularProgressbar-text').prop('children'));

    const bar2 = shallow(
      <CircularProgressbar
        percentage={80}
        textForPercentage={textForPercentage}
      />
    );
    assert.equal('yey 80', bar2.find('.CircularProgressbar-text').prop('children'));
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
    const wrapper = shallow(
      <CircularProgressbar
        percentage={50}
        styles={{
          path: { stroke: '#ffffff' },
        }}
      />
    );

    assert.equal(
      wrapper.find('.CircularProgressbar-path').prop('style').stroke,
      '#ffffff',
    );
  });
});
