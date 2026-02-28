import React from 'react'
import { Link } from 'react-router-dom'

const DoctorCard = ({ img, name, id }) => {
  return (
    <Link to={`/booking/${id}`} className='flex flex-col justify-center items-center gap-4 cursor-pointer'>
      <img
        className="w-[130px] h-[130px] object-cover"
        src={img}
        alt="Profile Image"
      />
      <p>{name}</p>
    </Link>

  )
}

export default DoctorCard