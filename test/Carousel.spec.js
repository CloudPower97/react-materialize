import React from 'react';
import { shallow, mount } from 'enzyme';
import Carousel from '../src/Carousel';
import mocker from './helper/new-mocker';

describe('<Carousel />', () => {
  let wrapper;

  const images = [
    'https://lorempixel.com/250/250/nature/1',
    'https://lorempixel.com/250/250/nature/2',
    'https://lorempixel.com/250/250/nature/3',
    'https://lorempixel.com/250/250/nature/4'
  ];

  test('renders', () => {
    wrapper = shallow(<Carousel images={images} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders fixed items', () => {
    const fixedItem = <span>Do you rock!?</span>;
    wrapper = shallow(<Carousel images={images} fixedItem={fixedItem} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders centered images', () => {
    wrapper = shallow(<Carousel images={images} centerImages />);
    expect(wrapper).toMatchSnapshot();
  });

  test('handles content slides', () => {
    const child = (
      <div className="red">
        <h2>First Panel</h2>
        <p>This is your first panel</p>
      </div>
    );
    wrapper = shallow(<Carousel images={images}>{child}</Carousel>);
    expect(wrapper).toMatchSnapshot();
  });

  test('accepts className props', () => {
    wrapper = shallow(<Carousel images={images} className="center" />);
    expect(wrapper.hasClass('carousel center')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('accepts external `id` value', () => {
    wrapper = shallow(<Carousel images={images} id="ID" />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('initialises', () => {
    const carouselInitMock = jest.fn();
    const carouselInstanceDestroyMock = jest.fn();
    const carouselMock = {
      init: (el, options) => {
        carouselInitMock(options);
        return {
          destroy: carouselInstanceDestroyMock
        };
      }
    };

    const restore = mocker('Carousel', carouselMock);

    beforeEach(() => {
      carouselInitMock.mockClear();
      carouselInstanceDestroyMock.mockClear();
    });

    afterAll(() => {
      restore();
    });

    test('uses default options if none are given', () => {
      wrapper = mount(<Carousel />);

      expect(carouselInitMock).toHaveBeenCalledWith({
        duration: 200,
        dist: -100,
        shift: 0,
        padding: 0,
        numVisible: 5,
        fullWidth: false,
        indicators: false,
        noWrap: false,
        onCycleTo: null
      });
    });

    test('handles full width sliders', () => {
      wrapper = mount(
        <Carousel images={images} options={{ fullWidth: true }} />
      );
      expect(wrapper).toMatchSnapshot();
      expect(carouselInitMock).toHaveBeenCalledWith({ fullWidth: true });
    });

    test('more options', () => {
      const options = { padding: 12, fullWidth: true, indicators: false };
      wrapper = mount(<Carousel images={images} options={options} />);
      expect(carouselInitMock).toHaveBeenCalledWith(options);
    });
  });
});
