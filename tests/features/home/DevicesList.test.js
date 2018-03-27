import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DevicesList } from 'src/features/home/DevicesList';

describe('home/DevicesList', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DevicesList {...props} />
    );

    expect(
      renderedComponent.find('.home-devices-list').getElement()
    ).to.exist;
  });
});
