import React from 'react';
import 'core-js/es6/map';
import 'core-js/es6/set';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExampleWorkModal from '../js/components/example-work-modal';

global.requestAnimationFrme = function (callback) {
  setTimeout(callback, 0);
};

configure({
  adapter: new Adapter()
});

const myExample = {
  'title': "Work Example",
  'href': "https://example.com",
  'desc': "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur corporis cum cupiditate deserunt dignissimos eius ex harum ipsum, labore maiores, minima nesciunt officia perferendis quasi qui quidem sunt voluptatibus!",
  'image': {
    'desc': "example screenshot of a project involving code",
    'src': "images/example1.png",
    'comment': ""
  }
};

describe("ExampleWorkModal component", () => {
  let mockCloseModalFn = jest.fn();

  let component = shallow(<ExampleWorkModal example={myExample} open={false} closeModal={mockCloseModalFn}/>);
  let openComponent = shallow(<ExampleWorkModal example={myExample} open={true}/>);

  let anchors = component.find("a");

  it("Should contain a single 'a' element", () => {
    expect(anchors.length).toEqual(1);
  });

  it("Should link to our project", () => {
    expect(anchors.getElement().props.href).toEqual(myExample.href);
  });

  it("Should have the modal class set correctly", () => {
    expect(component.find(".background--skyBlue").hasClass("modal--closed")).toBe(true);
    expect(openComponent.find(".background--skyBlue").hasClass("modal--open")).toBe(true);
  });

  it("Should call the closeModal handler when clicked", () => {
    component.find(".modal__closeButton").simulate('click');
    expect(mockCloseModalFn).toHaveBeenCalled();
  });
});