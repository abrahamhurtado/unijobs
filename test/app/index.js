import test from 'blue-tape';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import $ from 'cheerio';
import testify from '../fixture/testify';

// import ChildrenFactory from '../../frontend/routes/Children/components/Children.jsx';

// const Children = testify(ChildrenFactory)(React);

test('Just 4 the lulz', (expect) => {
  // const html = render(<Children />);
  // expect.equal()
  // console.log(Children());
  expect.equal(4, 4);
  expect.end();
});
