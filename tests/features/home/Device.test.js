import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Device } from 'src/features/home/Device';

describe('home/Device', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Device {...props} />
    );

    expect(
      renderedComponent.find('.home-device').getElement()
    ).to.exist;
  });
});
