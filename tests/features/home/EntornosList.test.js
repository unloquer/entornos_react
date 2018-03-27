import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EntornosList } from 'src/features/home/EntornosList';

describe('home/EntornosList', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EntornosList {...props} />
    );

    expect(
      renderedComponent.find('.home-entornos-list').getElement()
    ).to.exist;
  });
});
