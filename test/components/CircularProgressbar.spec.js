import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import CircularProgressbar from '../../src';

describe('CircularProgressbar', () => {
  it('should not throw exceptions in base case', () => {
    assert.doesNotThrow(() => <CircularProgressbar />);
  });
});
