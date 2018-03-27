import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DeviceConfig } from 'src/features/home';

describe('home/DeviceConfig', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <DeviceConfig />
    );

    expect(
      renderedComponent.find('.home-device-config').getElement()
    ).to.exist;
  });
});
