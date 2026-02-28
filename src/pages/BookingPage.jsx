import React, { useEffect } from 'react';
import Month from '../components/Month';
import Time from '../components/Time';
import Form from '../components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setDocId } from '../features/BookingSlice';

const BookingPage = () => {
  const date = useSelector((state) => state.app.date)
  const time = useSelector((state) => state.app.time)
  let docId = useSelector((state) => state.app.docId)


  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("bookdate", date);
    console.log("booktime", time);
    docId = params.id
    dispatch(setDocId(docId))

  }, [date, time])

  return (
    <div className="p-4 flex justify-evenly items-start mt-20">

      <div>
        <h2 className='text-3xl mb-6 text-center font-semibold'>Choose Date</h2>
        <div
          style={{
            width: '350px',
            border: '1px solid #d9d9d9',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Month />
        </div>
      </div>

      <div className='flex flex-col gap-10'>
        <div >
          <h2 className='text-3xl mb-6 font-semibold'>Choose Time</h2>
          <p className='text-xl mb-5 text-gray-500'>Set time by clicking the following:</p>
          <Time />
        </div>
        <Form />
      </div>
    </div>
  );
};

export default BookingPage;
