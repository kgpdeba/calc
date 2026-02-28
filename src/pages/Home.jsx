import React from 'react'
import data from '../../data/data.json'
import DoctorCard from '../components/DoctorCard'
import doc1 from '../assets/d1.jpg'
import doc2 from '../assets/d2.jpg'

const imageMap = {
    'd1.jpg': doc1,
    'd2.jpg': doc2,
};

const Home = () => {
    return (
        <div className=' flex flex-col justify-center items-center gap-40'>
            <h1 className='mt-16 text-4xl'>Choose Doctor</h1>
            <div className='flex gap-20'>
                {
                    data.doctors.map((dr, index) => {
                        return <DoctorCard key={index} id={dr.id} name={dr.name} img={imageMap[dr.img]} />
                    })
                }
            </div>
        </div>


    )
}

export default Home