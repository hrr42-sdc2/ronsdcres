import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Reservation from './components/Reservation.jsx';
import Mapper from './components/Mapper.jsx';
import BelowMapper from './components/BelowMapper.jsx';

ReactDOM.render(<Reservation />, document.getElementById('reservation'));
ReactDOM.render(<Mapper />, document.getElementById('mapper'));
ReactDOM.render(<BelowMapper />, document.getElementById('belowmapper'));