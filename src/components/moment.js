import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Div = styled.div`
  width: 100%;
  height: 100%;
`;

// eslint-disable-next-line react/prop-types
function MyCalendar({ setReserveButton, reserveButton }) {
  const handleReserve = () => {
    if (reserveButton === true) {
      setReserveButton(false);
    } else {
      setReserveButton(true);
    }
  };
  return (
    <Div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 900 }}
      />
      <button type="button" onClick={handleReserve}>
        Click
      </button>
    </Div>
  );
}
export default MyCalendar;
