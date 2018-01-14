import React from 'react';
import { shallow, mount, render } from 'enzyme';
import UtilsBar from '../src/components/UtilsBar.jsx'
import SortList from '../src/components/SortList.jsx';
import FilterList from '../src/components/FilterList.jsx';



describe('<UtilsBar />', () => {
  it('should render a UtilsBar component', () => {
    let component = shallow(<UtilsBar />);
    expect(component.length).toBe(1);
  })

  it('should render a menu element', () => {
    let component = shallow(<UtilsBar />);
    let menu = component.exists('menu');
    expect(menu).toBe(true);
  }) 

  it('should have a menuitem for the SortList and FilterList components', () => {
    let component = mount(<UtilsBar />);
    let menu = component.find('MenuItem');
    expect(menu.length).toBe(2);
  })

  it('should have a FilterList component', () => {
    let component = mount(<UtilsBar />);
    expect(component.containsMatchingElement(<FilterList />)).toBe(true);
  })

  it('should have a SortList component', () => {
    let component = mount(<UtilsBar />);
    console.log(component.state());
    expect(component.containsMatchingElement(<SortList />)).toBe(true);
  })

  it('should have a filterby state and a sortby state so that both are considered together in queries', () => {
    let component = mount(<UtilsBar />);
    let state = component.state();
    expect(state.filterBy).toBe('');
    expect(state.sortBy).toBe('');
  })

})