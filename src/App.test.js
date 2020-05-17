import React from 'react';
import App from './App';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import 'jest-dom/extend-expect';
import thumb1 from './assets/images/thumb/tea-light-thumb.jpeg';
import thumb2 from './assets/images/thumb/white-light-thumb.jpeg';
import thumb3 from './assets/images/thumb/pink-light-thumb.jpeg';
import thumb4 from './assets/images/thumb/tea-light-thumb.jpeg';
import image1 from './assets/images/tea-light.jpeg';
import image2 from './assets/images/white-light.jpeg';
import image3 from './assets/images/pink-light.jpeg';
import image4 from './assets/images/tea-light.jpeg';

let renderApp = () => render(<App />);

let catalogs = [], header, viewer, slide, thumbOuter1, thumbImg1, thumbOuter2, thumbImg2, thumbOuter3, thumbImg3,
    thumbOuter4, thumbImg4, prev, next, fireEve, thumbIcon1, thumbIcon2, thumbIcon3, thumbIcon4;
let originalTimeout;
const testIds = {
  header: 'app-title',
  viewer: 'catalog-view',
  prev: 'prev-icon',
  next: 'next-icon',
  thumbIconPrefix: 'thumb_outer_',
  thumbPrefix: 'thumb_',
  thumbImagePrefix: 'thumb_img_',
  slideInput: 'slide',
};

beforeEach(() => {
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;//that not works
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;//that not works
  catalogs = [
    {
      thumb: thumb1,
      image: image1
    },
    {
      thumb: thumb2,
      image: image2
    },
    {
      thumb: thumb3,
      image: image3
    },
    {
      thumb: thumb4,
      image: image4
    }
  ];
  renderApp = () => render(<App />);
  const { getByTestId, fireEvent } = renderApp();
  viewer = getByTestId(testIds.viewer);
  header = getByTestId(testIds.header);
  prev = getByTestId(testIds.prev);
  next = getByTestId(testIds.next);
  slide = getByTestId(testIds.slideInput);
  thumbOuter1 = getByTestId(testIds.thumbPrefix+'0');
  thumbImg1 = getByTestId(testIds.thumbImagePrefix+'0');
  thumbOuter2 = getByTestId(testIds.thumbPrefix+'1');
  thumbImg2 = getByTestId(testIds.thumbImagePrefix+'1');
  thumbOuter3 = getByTestId(testIds.thumbPrefix+'2');
  thumbImg3 = getByTestId(testIds.thumbImagePrefix+'2');
  thumbOuter4 = getByTestId(testIds.thumbPrefix+'3');
  thumbImg4 = getByTestId(testIds.thumbImagePrefix+'3');
  thumbIcon1 = getByTestId(testIds.thumbIconPrefix+'0');
  thumbIcon2 = getByTestId(testIds.thumbIconPrefix+'1');
  thumbIcon3 = getByTestId(testIds.thumbIconPrefix+'2');
  thumbIcon4 = getByTestId(testIds.thumbIconPrefix+'3');
});

afterEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;//that not works
  catalogs = [];
  cleanup();
});

test('should create the catalog-viewer app', () => {
  expect(header).toHaveTextContent('Catalog Viewer');
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);
});

test('page should contain the catalog UI elements', () => {
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbOuter2).not.toHaveClass('thumb-selected');
  expect(thumbOuter3).not.toHaveClass('thumb-selected');
  expect(thumbOuter4).not.toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);
  expect(thumbImg2).toHaveStyle(`background-image: url(${catalogs[1].thumb})`);
  expect(thumbImg3).toHaveStyle(`background-image: url(${catalogs[2].thumb})`);
  expect(thumbImg4).toHaveStyle(`background-image: url(${catalogs[3].thumb})`);
});

test('should catalog-view load with first item of catalog', () => {
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);
});

test('catalog thumb icons length should be equal to catalog items length', () => {
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);
  expect(thumbImg2).toHaveStyle(`background-image: url(${catalogs[1].thumb})`);
  expect(thumbImg3).toHaveStyle(`background-image: url(${catalogs[2].thumb})`);
  expect(thumbImg4).toHaveStyle(`background-image: url(${catalogs[3].thumb})`);
});


test('Clicking on previous button should show the previous image',  () => {
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);

  fireEvent.click(prev);

  expect(viewer.src).toContain(catalogs[3].image);
  expect(thumbOuter4).toHaveClass('thumb-selected');
  expect(thumbImg4).toHaveStyle(`background-image: url(${catalogs[3].thumb})`);
});

test('Clicking on next button should show the next image', () => {
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);

  fireEvent.click(next);

  expect(viewer.src).toContain(catalogs[1].image);
  expect(thumbOuter2).toHaveClass('thumb-selected');
  expect(thumbImg2).toHaveStyle(`background-image: url(${catalogs[1].thumb})`);
});

test('Clicking on next button in the last item should show the first image', () => {
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);

  fireEvent.click(next);
  fireEvent.click(next);
  fireEvent.click(next);

  expect(viewer.src).toContain(catalogs[3].image);
  expect(thumbOuter4).toHaveClass('thumb-selected');
  expect(thumbImg4).toHaveStyle(`background-image: url(${catalogs[3].thumb})`);
});

test('Clicking on previous button in the first item should show the last image',  () => {
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);

  fireEvent.click(prev);

  expect(viewer.src).toContain(catalogs[3].image);
  expect(thumbOuter4).toHaveClass('thumb-selected');
  expect(thumbImg4).toHaveStyle(`background-image: url(${catalogs[3].thumb})`);
});

test('Clicking on any indicator icon should show the appropriate image', () => {
  fireEvent.click(thumbIcon4);
  expect(viewer.src).toContain(catalogs[3].image);
  expect(thumbOuter4).toHaveClass('thumb-selected');
  expect(thumbImg4).toHaveStyle(`background-image: url(${catalogs[3].thumb})`);
});

test('when slide enabled should change the image for every 3 seconds', (done) => {
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);

  fireEvent.click(slide);
  expect(slide.checked).toEqual(true);

  setTimeout(() => {
    expect(viewer.src).toContain(catalogs[2].image);
    expect(thumbOuter3).toHaveClass('thumb-selected');
    expect(thumbImg3).toHaveStyle(`background-image: url(${catalogs[2].thumb})`);
    done();
  }, 6010);

});

test('when slide enabled also user interaction like previous, next or indicator should work as expected', (done) => {
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);

  fireEvent.click(slide);
  expect(slide.checked).toEqual(true);
  fireEvent.click(thumbIcon2);

  setTimeout(() => {
    expect(viewer.src).toContain(catalogs[2].image);
    expect(thumbOuter3).toHaveClass('thumb-selected');
    expect(thumbImg3).toHaveStyle(`background-image: url(${catalogs[2].thumb})`);
    done();
  }, 3010);
});

test('uncheck slide should stop changing the image for every 3 seconds', (done) => {
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);

  fireEvent.click(slide);
  expect(slide.checked).toEqual(true);

  setTimeout(() => {
    expect(viewer.src).toContain(catalogs[1].image);
    expect(thumbOuter2).toHaveClass('thumb-selected');
    expect(thumbImg2).toHaveStyle(`background-image: url(${catalogs[1].thumb})`);
    fireEvent.click(slide);
    expect(slide.checked).toEqual(false);
    // done();
  }, 3010);

  setTimeout(() => {
    expect(viewer.src).toContain(catalogs[1].image);
    expect(thumbOuter2).toHaveClass('thumb-selected');
    expect(thumbImg2).toHaveStyle(`background-image: url(${catalogs[1].thumb})`);
    done();
  }, 6010);


});

test('click on catalog thumb should update the viewer image', () => {
  fireEvent.click(thumbIcon3);
  expect(viewer.src).toContain(catalogs[2].image);
  expect(thumbOuter3).toHaveClass('thumb-selected');
  expect(thumbImg3).toHaveStyle(`background-image: url(${catalogs[2].thumb})`);
});

test('the first catalog thumb should have a background image "/mobile-front-thumb.jpeg"', () => {
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);
});

test('selected thumb should be highlighted with blue border by applying css class "thumb-selected', () => {
  expect(viewer.src).toContain(catalogs[0].image);
  expect(thumbOuter1).toHaveClass('thumb-selected');
  expect(thumbImg1).toHaveStyle(`background-image: url(${catalogs[0].thumb})`);

  fireEvent.click(prev);

  expect(viewer.src).toContain(catalogs[3].image);
  expect(thumbOuter4).toHaveClass('thumb-selected');
  expect(thumbOuter1).not.toHaveClass('thumb-selected');
  expect(thumbImg4).toHaveStyle(`background-image: url(${catalogs[3].thumb})`);
});

test('catalog view should display first img element by default', () => {
  expect(viewer.src).toContain(catalogs[0].image);
});
