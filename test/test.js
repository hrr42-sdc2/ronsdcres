import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/components/App.jsx';
import Reservation from '../client/components/Reservation.jsx';
import Mapper from '../client/components/Mapper.jsx';


configure({ adapter: new Adapter() });

describe('App component', function() {
  // it('should render without throwing an error', function() {
  //   expect(shallow(<App />).contains(<div className="app"><h1>Reservations and Mapping</h1></div>)).toBe(true);
  // });

  it('should be selectable by class "app"', function() {
    expect(shallow(<App />).is('.app')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<App />).find('.app').length).toBe(1);
  });

  it('renders one <Reservation /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Reservation)).toHaveLength(1);
  });

  it('renders one <Mapper /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Mapper)).toHaveLength(1);
  });

  xit('renders children when passed in', () => {
    const wrapper = shallow((
      <App>
        <div className="unique" />
      </App>
    ));
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });

  xit('should render to static HTML', function() {
    expect(render(<App />).text()).toEqual('Reservations and Mapping');
  });
});

describe('Reservation component', function() {

  //  professional opinion: these should not be failing!!
  it('renders one <StyledReservation /> component', () => {
    const wrapper = shallow(<Reservation restId={50}/>);
    expect(wrapper.find(StyledReservation)).toHaveLength(1);
  });

  it('renders one <FindTableButton /> component', () => {
    const wrapper = shallow(<Reservation />);
    expect(wrapper.find(FindTableButton)).toHaveLength(1);
  });

  it('expect FindTable button to handle click event', () => {
    //const mockFn = jest.fn();
    const wrapper = shallow(<Reservation />);
    wrapper.find('button').simulate('click');
    //  this should put the "select party size" text in the grey box
    const text = wrapper.find('div.response-box').text();
    expect(text).toEqual('Please specify number of guests.');
  });

  xit('check DatePicker popup opens', () => {
    const DateComponent = mount(<DatePicker />),
    dateInput = DateComponent.find("input[type='text']");
    dateInput.simulate('click');
    expect(DateComponent.find('.react-datepicker')).toHaveLength(1);
  });
});

describe('Mapper component', function() {
  it('should render without throwing an error', function() {
    console.log(shallow(<Mapper />));
    expect(shallow(<Mapper />).contains(<div className="app"><h1>Reservations and Mapping</h1></div>)).toBe(true);
  });

  it('should render to static HTML', function() {
    expect(render(<Mapper />).text()).toEqual('Loading...');
  });
});

// //  api testing from Miao
// const mongoose = require('mongoose');
// const request = require('supertest');

// const server = require('../server/index.js');

// describe('Test mapper/<restaurantId>', () => {
//     test('It should get one restaurant', () => {
//         request(server).get('/mapper/50').then((response) => {
//             expect(response.statusCode).toBe(200);
//         });
//     });
// });

// module.exports = {
//     mongoose,
//     connect: () => {
//         mongoose.Promise = Promise;
//         mongoose.connect('mongodb://localhost/reservations', {useNewUrlParser: true, useUnifiedTopology: true});
//     },
//     disconnect: (done) => {
//         mongoose.disconnect(done);
//     },
// };