import React from 'react';
import { mount, shallow } from 'enzyme';

import { CircularProgressbarWithChildren } from '../src/index';

describe('<CircularProgressbarWithChildren />', () => {
  test('SVG rendered to DOM', () => {
    const wrapper = mount(<CircularProgressbarWithChildren value={50} />);

    expect(wrapper.find('svg').exists()).toEqual(true);
    expect(wrapper.find('[data-test-id="CircularProgressbar"]').exists()).toEqual(true);
    expect(wrapper.find('[data-test-id="CircularProgressbarWithChildren"]').exists()).toEqual(true);
  });

  test('Forwards all CircularProgressbar props except children', () => {
    const props = {
      background: true,
      backgroundPadding: 5,
      circleRatio: 0.5,
      classes: {
        background: 'background',
        path: 'path',
        root: 'root',
        text: 'text',
        trail: 'trail',
      },
      className: 'johnny',
      counterClockwise: false,
      minValue: 0,
      maxValue: 100,
      value: 50,
      strokeWidth: 2,
      styles: {},
      text: '50%',
    };
    const wrapper = shallow(
      <CircularProgressbarWithChildren {...props}>
        <div>Hello</div>
      </CircularProgressbarWithChildren>,
    );

    expect(wrapper.find('CircularProgressbar').props()).toEqual(props);
  });

  describe('props.children', () => {
    test('No children', () => {
      const wrapper = mount(<CircularProgressbarWithChildren value={50} />);

      expect(
        wrapper.find('[data-test-id="CircularProgressbarWithChildren__children"]').exists(),
      ).toEqual(false);
    });

    test('Renders child content', () => {
      const wrapper = mount(
        <CircularProgressbarWithChildren value={50}>
          <div id="hello">Hello</div>
        </CircularProgressbarWithChildren>,
      );

      expect(
        wrapper.find('[data-test-id="CircularProgressbarWithChildren__children"]').exists(),
      ).toEqual(true);
      expect(wrapper.find('#hello').exists()).toEqual(true);
    });
  });
});
