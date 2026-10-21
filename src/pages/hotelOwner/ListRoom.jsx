import React from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../Components/Title'
import { useState } from 'react'


const ListRoom = () => {

  const [rooms, setRooms] = useState(roomsDummyData)
  return (
    <div>
      <Title align='left' font='outfit' title='Room Listings' subTitle='View, edit, or manage
      all listed rooms. Keep the information up-to-date to provide the best experience for users' />
      <p className='text-gray-500 mt-5'>All Rooms</p>
      <div className='w-full max-w-3xl text-left border border-gray-300
          rounded-lg max-h-80 overflow-y-scroll mt-3'>
        <table className='w-full'>
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Facility</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Price / Night</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Action</th>
            </tr>
          </thead>

          <tbody className='text-sm'>
            {
              rooms.map((item, index)=>(
                <tr key={index}>
                  <td className='py-3 px-4 text-gray-700 border-t
                  border-gray-300'>
                    {item.roomType}
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default ListRoom