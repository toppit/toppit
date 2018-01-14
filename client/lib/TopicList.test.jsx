import React from 'react';
import { shallow, mount, render } from 'enzyme';
import TopicList from '../src/components/TopicList.jsx';
import Topic from '../src/components/Topic.jsx';
import exampleData from '../src/exampleData.js';

describe('<TopicList />', () => {
  
  it('should render a TopicList Component', () => {
    let component = shallow(<TopicList topicList={exampleData}/>);
    expect(component.length).toBe(1);
  })

  it('should render a Container element', () => {
    let component = shallow(<TopicList topicList={exampleData}/>);
    expect(component.exists('Container')).toBe(true);
  })

  it('should render 1 Topic', () => {
    let component = mount(<TopicList topicList={exampleData.slice(4)}/>);
    let container = component.find('Card');
    let hasTopic = component.exists('Topic');
    let topic = component.find('Topic').instance();
    expect(container.length).toBe(1);
    expect(hasTopic).toBe(true);
    expect(topic).toBeInstanceOf(Topic);
  })

  it('should render 3 Topics', () => {
    let component = mount(<TopicList topicList={exampleData.slice(2)}/>);
    let container = component.find('Card');
    let hasTopic = component.exists('Topic');
    let topics = component.find('Topic');
    expect(container.length).toBe(3);
    topics.forEach( topic => expect(topic.instance()).toBeInstanceOf(Topic));
  })

  it('should render 5 Topics', () => {
    let component = mount(<TopicList topicList={exampleData}/>);
    let container = component.find('Card');
    let hasTopic = component.exists('Topic');
    let topics = component.find('Topic');
    expect(container.length).toBe(5);
    topics.forEach( topic => expect(topic.instance()).toBeInstanceOf(Topic));
  })
})