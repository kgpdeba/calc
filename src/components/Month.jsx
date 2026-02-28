// import React, { useEffect, useState } from 'react';
// import { Calendar } from 'antd';
// import moment from "moment";
// import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// import { useDispatch } from 'react-redux';
// import { setDate } from '../features/BookingSlice';

// const Month = () => {
//   const [viewDate, setViewDate] = useState(moment());
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setDate(viewDate.format('MMM DD YYYY')));
//   }, [viewDate, dispatch]);

//   const disabledStartDate = (current) => {
//     return current && current.isBefore(moment(), "day");
//   };

//   return (
//     <Calendar
//       fullscreen={false}
//       disabledDate={disabledStartDate

//       onPanelChange={(value) => {
//         setViewDate(value);
//       }}


//       onSelect={(value) => {
//         setViewDate(value);
//       }}

//       headerRender={({ value, onChange }) => {
//         const current = value.clone();

//         const prevMonth = () => {
//           const newVal = current.subtract(1, 'month');
//           onChange(newVal);
//           setViewDate(newVal);
//         };

//         const nextMonth = () => {
//           const newVal = current.add(1, 'month');
//           onChange(newVal);
//           setViewDate(newVal);
//         };

//         return (
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               padding: '10px',
//               marginBottom: 8,
//             }}
//           >
//             <LeftOutlined onClick={prevMonth} style={{ cursor: 'pointer' }} />
//             <div style={{ fontWeight: '500' }}>
//               {value.format('MMMM YYYY')}
//             </div>
//             <RightOutlined onClick={nextMonth} style={{ cursor: 'pointer' }} />
//           </div>
//         );
//       }}
//     />
//   );
// };

// export default Month;

import React, { useEffect, useState } from 'react';
import { Calendar } from 'antd';
import moment from "moment";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setDate } from '../features/BookingSlice';

const Month = () => {
  const [viewDate, setViewDate] = useState(moment());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDate(viewDate.format('MMM DD YYYY')));
  }, [viewDate, dispatch]);

  const disabledStartDate = (current) => {
    return current && current.isBefore(moment(), "day");
  };

  return (
    <Calendar
      fullscreen={false}
      disabledDate={disabledStartDate} // ✅ FIXED here
      onPanelChange={(value) => {
        setViewDate(value);
      }}
      onSelect={(value) => {
        setViewDate(value);
      }}
      headerRender={({ value, onChange }) => {
        const current = value.clone();

        const prevMonth = () => {
          const newVal = current.subtract(1, 'month');
          onChange(newVal);
          setViewDate(newVal);
        };

        const nextMonth = () => {
          const newVal = current.add(1, 'month');
          onChange(newVal);
          setViewDate(newVal);
        };

        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              marginBottom: 8,
            }}
          >
            <LeftOutlined onClick={prevMonth} style={{ cursor: 'pointer' }} />
            <div style={{ fontWeight: '500' }}>
              {value.format('MMMM YYYY')}
            </div>
            <RightOutlined onClick={nextMonth} style={{ cursor: 'pointer' }} />
          </div>
        );
      }}
    />
  );
};

export default Month;

