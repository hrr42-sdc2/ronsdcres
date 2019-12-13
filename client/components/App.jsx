//  not clear why these two are necessary
import React from 'react';
import ReactDOM from 'react-dom';
import Mapper from './Mapper.jsx';
import Reservation from './Reservation.jsx';
import styled from 'styled-components';

const StyledApp = styled.div`
  margin: auto;
  width: 310px;
  height: 1200px;
  font-family: 'Josefin Sans', sans-serif;
`;

let params = (new URL(document.location)).searchParams;
let restId = parseInt(params.get('restaurantid')) || 1;

class App extends React.Component {
  constructor() {
    super();

    //  restId will come in props from Miao
    this.restId = restId;
  }

  render() {
    return (
      <div className="app">
        <Reservation />
        <Mapper />
      </div>
    )
  }
}

export default App;