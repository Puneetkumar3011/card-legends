import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '../card/card.component';

const STUB_DATA = require('./stubdata.json');
let props;
let wrapper;

beforeEach(() => {
  props = {
    legend: STUB_DATA.cards[0]
  };
  wrapper = shallow(<Card legend={STUB_DATA.cards[0]} />);
});

it('renders Card without crashing', () => {
  expect(wrapper).toBeDefined();
});

it('has image to display legend', () => {
  expect(wrapper.find('.background-image').length).toEqual(1);
});

it('Name field has valid value', () => {
  expect(props.legend.name).toEqual('Raise Dead');
});

it('Text field has valid value', () => {
  expect(props.legend.text).toEqual(
    'Summon a random creature from each discard pile.'
  );
});

it('Type field has valid value', () => {
  expect(props.legend.type).toEqual('Action');
});
