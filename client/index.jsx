import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Reservation from './components/Reservation.jsx';
import Mapper from './components/Mapper.jsx';


ReactDOM.render(<Reservation />, document.getElementById('reservation'));
ReactDOM.render(<Mapper />, document.getElementById('mapper'));