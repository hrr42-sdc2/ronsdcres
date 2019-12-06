//  not clear why these two are necessary
import React from 'react';
import ReactDOM from 'react-dom';
import Mapper from './Mapper.jsx';
import Reservation from './Reservation.jsx';


class App extends React.Component {
  constructor() {
    super();

    //  restId will come in props from Miao
    this.restId = 62;
  }

  render() {
    return (
      <div className="app">
        <h1>Reservations and Mapping</h1>
        <Reservation restId={this.restId}/>
        <Mapper restId={this.restId}/>
        {/* <Picker /> */}
        {/* <input id="datepicker" type="text" /> */}
        {/* <div id="datepicker"></div> */}
      </div>
    )
  }
}
export default App;