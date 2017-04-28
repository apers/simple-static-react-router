import React from 'react';
import ReactDOM from 'react-dom';
import RouterTest from './RouterTest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RouterTest />, div);
});
