import { expect } from 'chai';

import {
  HOME_SET_ACTIVE_ENTORNO,
} from 'src/features/home/redux/constants';

import {
  setActiveEntorno,
  reducer,
} from 'src/features/home/redux/setActiveEntorno';

describe('home/redux/setActiveEntorno', () => {
  it('returns correct action by setActiveEntorno', () => {
    expect(setActiveEntorno()).to.have.property('type', HOME_SET_ACTIVE_ENTORNO);
  });

  it('handles action type HOME_SET_ACTIVE_ENTORNO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SET_ACTIVE_ENTORNO }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
