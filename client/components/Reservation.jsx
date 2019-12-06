import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import styled from 'styled-components';

//import "react-datepicker/dist/react-datepicker.css";

const StyledReservation = styled.div`
  margin: auto;
  width: 320px;
  padding: 15px;
  box-shadow: rgba(153, 153, 153, 0.4) 0px 2px 8px 0px;
  font-family: 'Josefin Sans', sans-serif;
`;

const StyledDate = styled.select`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 15px
`;

const StyledFindButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: rgb(218, 55,67);
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 18px
`;

const StyledSelect = styled.select`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 15px
`;

// position: absolute;
//   right: 40px;
//   top: calc(100% - 40px);
//   z-index: 2;

class Reservation extends React.Component {
  constructor({restId}) {
    super();
  this.state = {
    guests: '',
    time: '7:00 PM',
    bookDate: new Date()
  };
  //  restaurant number will come in props from Miao
  //  right now is sent from App
  this.restId = restId;
  //  name is the person doing the booking
  this.name = 'Superman';

  this.handleChangeGuests = this.handleChangeGuests.bind(this);
  this.handleChangeDate = this.handleChangeDate.bind(this);
  this.handleChangeTime = this.handleChangeTime.bind(this);
  this.submitReservation = this.submitReservation.bind(this);
}

  handleChangeGuests(event) {
    this.setState({guests: event.target.value});
  }

  handleChangeDate(date) {
    this.setState({bookDate: date});
  }

  handleChangeTime(event) {
    this.setState({time: event.target.value});
  }

  submitReservation(event) {
    //  reservation data should all be in state
    //  disallow if #guests not specified (not with an alert)
    if (this.state.guests === "") {
      alert('number of guests not specified');  // plug into the button
      return;
    }
    //console.log(this.state);
    var booking ={
      restId: this.restId,
      name: this.name,
      guests: this.state.guests,
      time: this.state.bookDate
    };
    //  plug time into bookDate
    var arr = this.state.time.split(':');
    var hours = parseInt(arr[0]);

    if (arr[1].substring(3, 5) === 'PM') {
      hours += 12;
    }
    booking.time.setHours(hours);
    booking.time.setMinutes(arr[1].substring(0,2));
    booking.time.setSeconds(0);
    console.log(booking);
    //  post to reservation api
    axios.post('/reservation', booking)
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  createPartyOptions() {
    //  call it stupid!  Go ahead!
    var partyOptions = [];
    for (var i = 1; i <= 10; i++) {
      partyOptions.push(i);
    }
    return partyOptions;
  }

  createTimeOptions() {
    var timeOptions = [];
    var amPm = 'AM';
    for (var i = 8; i < 24; i++) {
      if (i === 12) {
        amPm = 'PM';
      }
      var j = i;
      if (i > 12) {
        j = i - 12;
      }
      var time = j + ':00 ' + amPm;
      timeOptions.push(time);
      var time = j + ':30 ' + amPm;
      timeOptions.push(time);
    }
    return timeOptions;
  }

  render() {

    var po = this.createPartyOptions();
    var to = this.createTimeOptions();
    var guestsText = 'Please select number of guests';
    if (this.state.guests !== '') {
      guestsText = 'For ' + this.state.guests;
    }
    return (
      <StyledReservation>
      <div className="reservatin">
      <h2 style={{textAlign: 'center'}}>Make a reservation</h2>
      <hr />
      <p style={{fontWeight: 'bold'}}>Party size</p>
      <br />
      {/* <StyledSelect> */}
      <select value={this.state.guests} onChange={this.handleChangeGuests}>
      <option>{guestsText}</option>
        {
          po.map(num =>
          <option key={num} value={num}>{num}</option>
          )
        }
      </select>
      {/* </StyledSelect> */}
      <hr />
      <p style={{fontWeight: 'bold'}}>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Time</p>
      <br />
      {/* <StyledDate> */}
      <DatePicker
        selected={this.state.bookDate}
        onChange={this.handleChangeDate}
        placeholderText="Today"
      />
      {/* </StyledDate> */}

      <select value={this.state.time} onChange={this.handleChangeTime}>
      <option>{this.state.time}</option>
        {
          to.map(time =>
          <option key={time} value={time}>{time}</option>
          )
        }
      </select>
      <hr />
      {/* <StyledFindButton> */}
      <button className="find-a-table-button" onClick={this.submitReservation}>
        Find a Table
      </button>
      {/* </StyledFindButton> */}
      <br /><br />
      <img src="assets/ic_social_proof.png"></img>

      Booked 94 times today

    </div>
    </StyledReservation>
    )
  }


}



export default Reservation;