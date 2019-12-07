//  not clear why these two are necessary
import React from 'react';
import ReactDOM from 'react-dom';
import Mapper from './Mapper.jsx';
import Reservation from './Reservation.jsx';


class App extends React.Component {
  constructor() {
    super();

    //  restId will come in props from Miao
    this.restId = 15;
  }

  render() {
    return (
      <div className="app">
        <Reservation restId={this.restId}/>
        <Mapper restId={this.restId}/>
      </div>
    )
  }
}

export default App;