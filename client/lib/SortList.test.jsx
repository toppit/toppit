import React from 'react';
import { shallow, render } from 'enzyme';
import SortList from '../src/components/SortList.jsx';


describe('<SortList />', () => {
  it('should render a component SortList', () => {
    let component = shallow(<SortList />);
    expect(component).toHaveLength(1);
  })

  it('should render a dropdown element', function() {
    let component = shallow(<SortList />);
    expect(component.exists('.dropdown')).toBe(true);
  });

  it('should render to static HTML', function() {
    let component = render(<SortList />)
    expect(component.text()).toEqual('Sort byMost RecentMost Popular');
  });

  it('should have length n for n number of sort options', function() {
    let component = render(<SortList />);
    expect(component.children().children().length).toBe(2);
  })
});