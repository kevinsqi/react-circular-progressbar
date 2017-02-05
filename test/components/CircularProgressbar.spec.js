import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import CircularProgressbar from '../../src';

describe('CircularProgressbar', () => {
  it('should not throw exceptions in base case', () => {
    assert.doesNotThrow(() => <CircularProgressbar />);
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
});
