import React from 'react';
import { shallow, mount, render } from 'enzyme';
import SortList from '../src/components/SortList.jsx';


describe('<SortList />', () => {

  var count = 0
  let handleChange = () => {
    return count++;
  }

  it('should render a component SortList', () => {
    let component = shallow(<SortList />);
    expect(component).toHaveLength(1);
  })

  it('should render a dropdown element', () => {
    let component = shallow(<SortList />);
    expect(component.exists('dropdown')).toBe(true);
  });

  it('should have length n for n number of sort options', () => {
    let component = render(<SortList />);
    expect(component.find('.item').length).toBe(2);
  })

  it('should have the first option to display the text Most Recent', () => {
    let component = mount(<SortList />);
    let items = component.find('.item');
    expect(items.contains('Most Recent')).toBe(true);
  })

  it('should trigger the onSortChange function on click', () => {
    let component = mount(<SortList onSortChange={handleChange}/>);
    component.find('.item').first().simulate('click');
    expect(count).toBe(1);
  })
});