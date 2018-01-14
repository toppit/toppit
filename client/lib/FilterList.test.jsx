import React from 'react';
import { shallow, mount, render } from 'enzyme';
import FilterList from '../src/components/FilterList.jsx';

describe('<FilterList />', () => {

  var count = 0
  let handleChange = () => {
    return count++;
  }

  it('should render a component FilterList', () => {
    let component = shallow(<FilterList />);
    expect(component).toHaveLength(1);
  })

  it('should render a dropdown element', () => {
    let component = shallow(<FilterList />);
    expect(component.exists('dropdown')).toBe(true);
  });

  it('should have length n for n number of emoji options', () => {
    let component = render(<FilterList />);
    expect(component.find('.item').length).toBe(9);
  })

  it('should contain the option 🤯 excited', () => {
    let component = mount(<FilterList />);
    var items = component.find('.item');
    expect(items.contains('🤯 excited')).toBe(true);
  })

  it('should trigger the onFilterChange function on click', () => {
    let component = mount(<FilterList onFilterChange={handleChange}/>);
    component.find('.item').first().simulate('click');
    expect(count).toBe(1);
  })
});