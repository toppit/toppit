import React from 'react';
import { shallow, render } from 'enzyme';
import FilterList from '../src/components/FilterList.jsx';


describe('<FilterList />', () => {
  it('should render a component FilterList', () => {
    let component = shallow(<FilterList />);
    expect(component).toHaveLength(1);
  })

  it('should render a dropdown element', function() {
    let component = shallow(<FilterList />);
    expect(component.exists('.dropdown')).toBe(true);
  });

  it('should render to static HTML', function() {
    let component = render(<FilterList />)
    expect(component.text()).toEqual('Filter TopicsNo Filter😃 happy🤩 impressed🤪 party😒 meh🤮 disgusted🤬 angry🤯 mindblown🤯 excited');
  });

  it('should have length n for n number of emoji options', function() {
    let component = render(<FilterList />);
    expect(component.children().children().length).toBe(9);
  })
  it('should have options in dropdown', function() {
    let component = render(<FilterList />);
    expect(component.find('option').exists().toBe(true));
  })
  it('should have something or show something', () => {
    let component = render(<FilterList />);
    expect(component.instance).toBe(true);
  });

  it('should have something or show something', () => {
    let component = shallow(<FilterList />);
    console.log(component.instance());
    expect(component.state).toBe(true);
  });
});