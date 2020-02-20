import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import HomeComponent from '../home/home.component';
import { LEGENDS_SVC_URL } from '../../common/app.constants';

const STUB_DATA = require('./stubdata.json');
let wrapped;

beforeEach(() => {
  wrapped = mount(<HomeComponent />);
});

afterEach(() => {
  wrapped.unmount();
});

it('has a Search component', () => {
  expect(wrapped.find('SearchBox').length).toEqual(1);
});

it('has CardList component', () => {
  expect(wrapped.find('CardList').length).toEqual(1);
});

it('has Last Page Position element', () => {
  expect(wrapped.find('#lastPagePosition').length).toEqual(1);
});

it('has spinner component', () => {
  /** initially spinner is visible */
  expect(wrapped.find('.spinner-border').length).toEqual(1);
  wrapped.setState({ loading: false });
  /** after fetching data from API, spinner should be hidden */
  expect(wrapped.find('.spinner-border').length).toEqual(0);
});

describe('componentWillMount', () => {
  beforeEach(() => {
    moxios.install();
    moxios.stubRequest(`${LEGENDS_SVC_URL}?pageSize=20&page=1`, {
      status: 200,
      response: STUB_DATA
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('has called been called once', () => {
    jest.spyOn(HomeComponent.prototype, 'componentWillMount');
    wrapped = mount(<HomeComponent />);
    expect(HomeComponent.prototype.componentWillMount.mock.calls.length).toBe(
      1
    );
  });

  it('can fetch a list of legends', done => {
    wrapped = mount(<HomeComponent />);

    moxios.wait(() => {
      wrapped.update();
      expect(wrapped.state('pageNo')).toBe(2);
      expect(wrapped.state('legends').length).toBe(5);
      done();
    });
  });
});
