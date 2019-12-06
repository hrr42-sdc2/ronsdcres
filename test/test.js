import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import App from '../client/components/App.jsx';
import Mapper from '../client/components/Mapper.jsx';

configure({ adapter: new Adapter() });

describe('App component', function() {
  it('should render without throwing an error', function() {
    expect(shallow(<App />).contains(<div className="app"><h1>Reservations and Mapping</h1></div>)).toBe(true);
  });

  it('should be selectable by class "foo"', function() {
    expect(shallow(<App />).is('.app')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<App />).find('.app').length).toBe(1);
  });

  it('should render to static HTML', function() {
    expect(render(<App />).text()).toEqual('Reservations and Mapping');
  });
});

describe('Mapper component', function() {
  it('should render without throwing an error', function() {
    expect(shallow(<Mapper />).contains(<div className="app"><h1>Reservations and Mapping</h1></div>)).toBe(true);
  });
});
