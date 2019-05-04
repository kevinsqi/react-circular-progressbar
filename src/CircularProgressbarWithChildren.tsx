import React from 'react';
import CircularProgressbar from './CircularProgressbar';

import { CircularProgressbarWrapperProps } from './types';

type CircularProgressbarWithChildrenProps = CircularProgressbarWrapperProps & {
  children?: React.ReactNode;
};

function CircularProgressbarWithChildren(props: CircularProgressbarWithChildrenProps) {
  const { children, ...circularProgressbarProps } = props;

  // noreintegrate use css hooks for these inline styles
  // noreintegrate fix need for explicit pixel values
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ position: 'absolute', width: '100%' }}>
        <CircularProgressbar {...circularProgressbarProps} />
      </div>
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default CircularProgressbarWithChildren;
