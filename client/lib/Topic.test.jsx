import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Topic from '../src/components/Topic.jsx';
import exampleData from '../src/exampleData.js';

describe('<Topic />', () => {

  var count = 0;
  let clickHandler = () => {
    return ++count;
  }
  it('should render a Topic Component', () => {
    let component = shallow(<Topic topic={exampleData[0]}/>);
    expect(component.length).toBe(1);
  })

  it('should render a Card element', () => {
    let component = shallow(<Topic topic={exampleData[0]}/>);
    expect(component.exists('Card')).toBe(true);
  })
  
  it('should dynamically render a topic headline', () => {
    let component = mount(<Topic topic={exampleData[0]}/>);
    let headerElement = component.find('CardContent').first();
    expect(headerElement.props().header).toBe('and another');
  })

  it('should dynamically render 2 buttons when there is an emotion', () => {
    let component = mount(<Topic topic={exampleData[0]}/>);
    let button = component.find('Button');
    expect(button.length).toBe(2);
  })

  it('should dynamically render 1 buttons when there is no emotion', () => {
    let component = mount(<Topic topic={exampleData[1]}/>);
    let button = component.find('Button');
    expect(button.length).toBe(1);
  })

  it('should dynamically render a topic description', () => {
    let component = mount(<Topic topic={exampleData[0]}/>);
    let componentTwo = mount(<Topic topic={exampleData[1]}/>);
    let descriptionElement = component.find('CardContent').at(1);
    let descriptionElementTwo = componentTwo.find('CardContent').at(1);
    expect(descriptionElement.props().description).toBe('happy');
    expect(descriptionElementTwo.props().description).toBe('Hello');
  })
  
  it('should dynamically render a button depending on the emoji', () => {
    let component = mount(<Topic topic={exampleData[0]}/>);
    let componentTwo = mount(<Topic topic={exampleData[2]}/>);
    let buttonOne = component.find('Button').at(1);
    let buttonTwo = componentTwo.find('Button').at(1);
    expect(buttonOne.text()).toBe('😃 happy');
    expect(buttonTwo.text()).toBe('🤬 angry');
  })

  it('should dynamically render an upvote button you can click', () => {
    let component = mount(<Topic topic={exampleData[0]} upVote={clickHandler}/>);
    let button = component.find('Button').at(0);
    button.simulate('click');
    expect(count).toBe(1);
  })
})