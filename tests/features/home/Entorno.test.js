import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Entorno } from 'src/features/home/Entorno';

describe('home/Entorno', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Entorno {...props} />
    );

    expect(
      renderedComponent.find('.home-entorno').getElement()
    ).to.exist;
  });
});
