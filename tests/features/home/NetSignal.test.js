import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NetSignal } from 'src/features/home';

describe('home/NetSignal', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <NetSignal />
    );

    expect(
      renderedComponent.find('.home-net-signal').getElement()
    ).to.exist;
  });
});
