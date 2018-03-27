import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DeviceView } from 'src/features/home';

describe('home/DeviceView', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <DeviceView />
    );

    expect(
      renderedComponent.find('.home-device-view').getElement()
    ).to.exist;
  });
});
