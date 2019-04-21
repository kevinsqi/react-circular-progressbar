import React from 'react';
import { shallow } from 'enzyme';

import CircularProgressbar from '../index';

describe('<CircularProgressbar />', () => {
  test('svg rendering', () => {
    const wrapper = shallow(<CircularProgressbar percentage={50} />);
    expect(wrapper.find('svg').length).toBe(1);
  });
});
