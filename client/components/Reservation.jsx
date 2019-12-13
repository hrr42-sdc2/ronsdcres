import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import styled from 'styled-components';

const StyledReservation = styled.div`
  margin: auto;
  width: 300px;
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

let params = (new URL(document.location)).searchParams;
let restId = parseInt(params.get('restaurantid')) || 92;

class Reservation extends React.Component {
  constructor({}) {
    super();

    // set the nearest booking time to now
    let d = new Date();
    let hrs = d.getHours();
    let mins = d.getMinutes();
    if (mins > 30) {
      hrs++;
      var amins = '00';
    } else {
      amins = '30';
    }
    let ap = (hrs > 11) ? ' PM' : ' AM';
    hrs = (hrs > 12) ? hrs - 12 : hrs;
    let nxTm = hrs + ":" + amins + ap;

    this.state = {
      findButtonStatus: 'button',
      findResponse: 'No clue what to say',
      bookings_today: this.getRandomInteger(1, 200),
      guests: '',
      time: nxTm,
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
    this.setState({findButtonStatus: 'button',
                   guests: event.target.value});
  }

  handleChangeDate(date) {
    this.setState({findButtonStatus: 'button',
                   bookDate: date});
  }

  handleChangeTime(event) {
    this.setState({findButtonStatus: 'button',
                   time: event.target.value});
  }

  submitReservation(event) {
    //  reservation data should all be in state
    //  disallow if #guests not specified
    if (this.state.guests === "") {
      let msg = 'Please specify number of guests.'
      this.setState({findButtonStatus: 'response',
                     findResponse: msg});
      return;
    }
    if (this.state.guests > 6) {
      let msg = 'We\'re sorry, this restaurant does not accept online bookings for parties that large.  Please telephone the restaurant instead.';
      this.setState({findButtonStatus: 'response',
                     findResponse: msg});
      return;
    }
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
      let msg = response.data;
      let bk = 0;
      if (msg.substring(0, 5) !== 'Sorry') {
        bk = 1;
      }
      this.setState({findButtonStatus: 'response',
                     findResponse: msg,
                     bookings_today: this.state.bookings_today += bk});
    }, (error) => {
      let msg = 'An error occurred in processing your reservation.  Please try again later';
      this.setState({findButtonStatus: 'response',
                     findResponse: msg});
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

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  render() {
    var po = this.createPartyOptions();
    var to = this.createTimeOptions();
    var guestsText = 'Please select number of guests';
    if (this.state.guests !== '') {
      guestsText = 'For ' + this.state.guests;
    }
    var fbs = this.state.findButtonStatus;

    var FindTableButton = () => (
      <button id="find-table-button" className="find-table-button" onClick={this.submitReservation}>
        Find a Table
      </button>
    );

    var ResponseBox = ({response}) => (
      <div className="response-box">
        <p>{response}</p>
      </div>
    );

    return (
      <StyledReservation>
      <div id="reservation">
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
      <DatePicker
        selected={this.state.bookDate}
        onChange={this.handleChangeDate}
        placeholderText="Today"
      />
      <select value={this.state.time} onChange={this.handleChangeTime}>
      <option>{this.state.time}</option>
        {
          to.map(time =>
          <option key={time} value={time}>{time}</option>
          )
        }
      </select>
      <hr />
      {fbs === 'button' ? (
      <FindTableButton />
      ) : (
      <ResponseBox response={this.state.findResponse}/>
      )}
      <br /><br />
      <img src="assets/ic_social_proof.png"></img>
      <span className="bookings-today">
      &nbsp;&nbsp;Booked {this.state.bookings_today} times today
      </span>
    </div>
    </StyledReservation>
    )
  }
}

export default Reservation;