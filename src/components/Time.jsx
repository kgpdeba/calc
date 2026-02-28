// import React from 'react';
// import { TimePicker } from 'antd';
// import dayjs from 'dayjs';
// import { useDispatch } from 'react-redux';
// import { setTime } from '../features/BookingSlice';

// const format = 'HH:mm';


// const Time = () => {

//   // const time = useSelector((state)=>state.app.time)
//   const dispatch = useDispatch()

//   const handleChange = (time, timeString) => {
//     console.log("Selected Time (formatted string):", timeString);
//     dispatch(setTime(timeString))
//   };

//   return (
//     <TimePicker
//       defaultValue={dayjs('12:00', format)}
//       format={format}
//       onChange={handleChange}
//     />
//   );
// };

// export default Time;



//working
// import React, { useEffect, useState } from 'react';
// import { TimePicker } from 'antd';
// import dayjs from 'dayjs';
// import { useDispatch, useSelector } from 'react-redux';
// import { setTime } from '../features/BookingSlice';
// import axios from 'axios';

// const format = 'HH:mm';

// const Time = () => {
//   const dispatch = useDispatch();

//   const docId = useSelector((state) => state.app.docId);
//   const date = useSelector((state) => state.app.date);
//   const [bookedTimes, setBookedTimes] = useState([]);

//   useEffect(() => {
//     const fetchBookedSlots = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/patients?docId=${docId}&date=${date}`);
//         const times = res.data.map((entry) => entry.time);
//         setBookedTimes(times);
//       } catch (error) {
//         console.error('Failed to fetch booked slots:', error);
//       }
//     };

//     if (docId && date) {
//       fetchBookedSlots();
//     }
//   }, [docId, date]);

//   const handleChange = (time, timeString) => {
//     dispatch(setTime(timeString));
//   };

//   const disabledTime = () => {
//     const hours = bookedTimes
//       .filter(Boolean)
//       .map((t) => parseInt(t.split(':')[0], 10));

//     const disabledHoursSet = [...new Set(hours)];

//     const disabledMinutes = (selectedHour) => {
//       return bookedTimes
//         .filter((t) => t && parseInt(t.split(':')[0], 10) === selectedHour)
//         .map((t) => parseInt(t.split(':')[1], 10));
//     };

//     return {
//       disabledHours: () => disabledHoursSet,
//       disabledMinutes,
//     };
//   };

//   return (
//     <TimePicker
//       defaultValue={dayjs('12:00', format)}
//       format={format}
//       onChange={handleChange}
//       minuteStep={15}
//       use12Hours={false}
//       disabledTime={disabledTime}
//     />
//   );
// };

// export default Time;

//other working fine
// import React, { useEffect, useState } from 'react';
// import { TimePicker } from 'antd';
// import dayjs from 'dayjs';
// import { useDispatch, useSelector } from 'react-redux';
// import { setTime } from '../features/BookingSlice';
// import axios from 'axios';

// const format = 'HH:mm';

// const Time = () => {
//   const dispatch = useDispatch();

//   const docId = useSelector((state) => state.app.docId);
//   const date = useSelector((state) => state.app.date);
//   const [bookedTimes, setBookedTimes] = useState([]);

//   useEffect(() => {
//     const fetchBookedSlots = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/patients?docId=${docId}&date=${date}`);
//         const times = res.data
//           .map((entry) => entry.time)
//           .filter((t) => typeof t === 'string' && t.includes(':')); // safeguard
//         setBookedTimes(times);
//       } catch (error) {
//         console.error('Failed to fetch booked slots:', error);
//       }
//     };

//     if (docId && date) {
//       fetchBookedSlots();
//     }
//   }, [docId, date]);

//   const handleChange = (time, timeString) => {
//     dispatch(setTime(timeString));
//   };

//   const disabledTime = () => {
//     const timeMap = {}; // { 19: [30], 12: [0, 15] }

//     bookedTimes.forEach((t) => {
//       if (!t || typeof t !== 'string' || !t.includes(':')) return;
//       const [hourStr, minuteStr] = t.split(':');
//       const hour = parseInt(hourStr, 10);
//       const minute = parseInt(minuteStr, 10);

//       if (!timeMap[hour]) timeMap[hour] = [];
//       timeMap[hour].push(minute);
//     });

//     const disabledHours = () => {
//       return Object.entries(timeMap)
//         .filter(([, minutes]) => {
//           const allMinutes = [0, 15, 30, 45];
//           return allMinutes.every((m) => minutes.includes(m));
//         })
//         .map(([hour]) => parseInt(hour, 10));
//     };

//     const disabledMinutes = (selectedHour) => {
//       return timeMap[selectedHour] || [];
//     };

//     return {
//       disabledHours,
//       disabledMinutes,
//     };
//   };

//   return (
//     <TimePicker
//       defaultValue={dayjs('12:00', format)}
//       format={format}
//       onChange={handleChange}
//       minuteStep={15}
//       use12Hours={false}
//       disabledTime={disabledTime}
//     />
//   );
// };

// export default Time;



// 3rd approach
// import React from 'react';
// import { TimePicker } from 'antd';
// import dayjs from 'dayjs';
// import { useDispatch, useSelector } from 'react-redux';
// import { setTime } from '../features/BookingSlice';

// const format = 'HH:mm';

// const Time = () => {
//   const dispatch = useDispatch();

//   // Get the selected date and doctorId from Redux
//   const date = useSelector((state) => state.app.date);
//   // const docId = useSelector((state) => state.app.docId);

//   // Get booked times from Redux or your API store (adjust as needed)
//   // Assume bookedTimes is an array of strings like ['12:00', '19:30'] for this doctor and date
//   const bookedTimes = useSelector((state) => state.app.bookedTimes) || [];

//   const disabledTime = () => {
//     const now = dayjs();
//     const selectedDate = dayjs(date, 'MMM DD YYYY');

//     const currentHour = now.hour();
//     const currentMinute = now.minute();

//     // Map booked times by hour => [minutes]
//     const timeMap = {};
//     bookedTimes.forEach((t) => {
//       if (!t || typeof t !== 'string' || !t.includes(':')) return;
//       const [hourStr, minuteStr] = t.split(':');
//       const hour = parseInt(hourStr, 10);
//       const minute = parseInt(minuteStr, 10);
//       if (!timeMap[hour]) timeMap[hour] = [];
//       timeMap[hour].push(minute);
//     });

//     // Disable hours fully booked or in past (for today)
//     const disabledHours = () => {
//       // Hours fully booked (all quarter slots taken)
//       const bookedFullHours = Object.entries(timeMap)
//         .filter(([, minutes]) =>
//           [0, 15, 30, 45].every((m) => minutes.includes(m))
//         )
//         .map(([hour]) => parseInt(hour, 10));

//       if (selectedDate.isSame(now, 'day')) {
//         // Disable all hours before current hour as well
//         const pastHours = Array.from({ length: currentHour }, (_, i) => i);
//         return [...new Set([...bookedFullHours, ...pastHours])];
//       }

//       return bookedFullHours;
//     };

//     // Disable booked minutes and minutes before current time in the current hour (if today)
//     const disabledMinutes = (selectedHour) => {
//       const booked = timeMap[selectedHour] || [];

//       if (selectedDate.isSame(now, 'day') && selectedHour === currentHour) {
//         // Round down currentMinute to nearest quarter
//         const currentQuarter = Math.floor(currentMinute / 15) * 15;
//         // Disable all minutes less or equal to current quarter
//         const pastMinutes = [0, 15, 30, 45].filter((m) => m <= currentQuarter);
//         return [...new Set([...booked, ...pastMinutes])];
//       }

//       return booked;
//     };

//     return {
//       disabledHours,
//       disabledMinutes,
//     };
//   };

//   const handleChange = (time, timeString) => {
//     dispatch(setTime(timeString));
//   };

//   return (
//     <TimePicker
//       format={format}
//       onChange={handleChange}
//       disabledTime={disabledTime}
//       defaultOpenValue={dayjs('12:00', format)}
//     />
//   );
// };

// export default Time;




import React, { useEffect, useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { setTime } from '../features/BookingSlice';
import axios from 'axios';

const format = 'HH:mm';

const Time = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.app.date);
  const docId = useSelector((state) => state.app.docId);

  const [bookedTimes, setBookedTimes] = useState([]);

  useEffect(() => {
    if (!date || !docId) return;

    const fetchBookedTimes = async () => {
      try {
        // Fetch all bookings for this doctor on the selected date
        const response = await axios.get('http://localhost:8000/patients', {
          params: {
            docId: docId,
            date: date,
          },
        });

        // Extract the times already booked
        const times = response.data.map((booking) => booking.time);
        setBookedTimes(times);
      } catch (error) {
        console.error('Failed to fetch booked times:', error);
        setBookedTimes([]);
      }
    };

    fetchBookedTimes();
  }, [date, docId]);

  const disabledTime = () => {
    const now = dayjs();
    const selectedDate = dayjs(date, 'MMM DD YYYY');

    // Build map of booked times: { hour: [minutes] }
    const timeMap = {};
    bookedTimes.forEach((t) => {
      if (!t || typeof t !== 'string' || !t.includes(':')) return;
      const [hourStr, minuteStr] = t.split(':');
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      if (!timeMap[hour]) timeMap[hour] = [];
      timeMap[hour].push(minute);
    });

    // Find hours fully booked (all 0,15,30,45 booked)
    const fullyBookedHours = Object.entries(timeMap)
      .filter(([, minutes]) => [0, 15, 30, 45].every(m => minutes.includes(m)))
      .map(([hour]) => parseInt(hour, 10));

    // Calculate disabled hours
    const disabledHours = () => {
      if (selectedDate.isSame(now, 'day')) {
        // Disable past hours today + fully booked hours
        const pastHours = Array.from({ length: now.hour() }, (_, i) => i);
        return [...new Set([...fullyBookedHours, ...pastHours])];
      }
      return fullyBookedHours;
    };

    // Calculate disabled minutes for a given hour
    const disabledMinutes = (selectedHour) => {
      const booked = timeMap[selectedHour] || [];

      if (selectedDate.isSame(now, 'day') && selectedHour === now.hour()) {
        // Disable minutes before or equal current quarter for current hour today
        const currentQuarter = Math.floor(now.minute() / 15) * 15;
        const pastMinutes = [0, 15, 30, 45].filter(m => m <= currentQuarter);
        return [...new Set([...booked, ...pastMinutes])];
      }

      return booked;
    };

    return {
      disabledHours,
      disabledMinutes,
    };
  };

  const handleChange = (time, timeString) => {
    // Dispatch selected time to redux
    dispatch(setTime(timeString));
  };

  return (
    <TimePicker
      format={format}
      onChange={handleChange}
      disabledTime={disabledTime}
      minuteStep={15}
      // Optionally set default value if needed:
      // defaultValue={dayjs('12:00', format)}
    />
  );
};

export default Time;

