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
});
