import React from 'react';
import 'core-js/es6/map';
import 'core-js/es6/set';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExampleWork, {ExampleWorkBubble} from '../js/components/example-work';
import ExampleWorkModal from "../js/components/example-work-modal";

global.requestAnimationFrme = function (callback) {
    setTimeout(callback, 0);
};

configure({
    adapter: new Adapter()
});

const myWork = [
    {
        'title': "Work Example",
        'image': {
            'desc': "example screenshot of a project involving code",
            'src': "images/example1.png",
            'comment': ""
        }
    },
    {
        'title': "Work Example",
        'image': {
            'desc': "example screenshot of a project involving chemistry",
            'src': "images/example2.png",
            'comment': `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
           https://www.flickr.com/photos/ssoosay/4097410999`
        }
    }
];

describe("ExampleWork Component", () => {

    let component = shallow(<ExampleWork work={myWork}/>);

    it("Should be a 'span' element", () => {
        expect(component.type()).toEqual('span');
    });

    it("Should contain as many children as there are work examples", () => {
        expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
    });

    it("Should allow the modal to open and close", () => {
        component.instance().openModal();
        expect(component.instance().state.modalOpen).toBe(true);
        component.instance().closeModal();
        expect(component.instance().state.modalOpen).toBe(false);

    });
});

describe("ExampleWorkBubble component", () => {
    let mockOpenModalFn = jest.fn();

    let component = shallow(<ExampleWorkBubble example={myWork[1]} openModal={mockOpenModalFn}/>);

    let images = component.find("img");

    it("Should contain a single image element", () => {
        expect(images.length).toEqual(1);
    });

    it("Should have the image source set correctly", () => {
        expect(images.getElement().props.src).toEqual(myWork[1].image.src);
    });

    it("Should call the openModal handler when clicked", () => {
       component.find(".section__exampleWrapper").simulate('click');
       expect(mockOpenModalFn).toHaveBeenCalled();
    });
});