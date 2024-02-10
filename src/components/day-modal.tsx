import moment from 'moment';
import Image from 'next/image';

import Modal from './modal';
import { useState } from 'react';
import { PrismaClient } from '@prisma/client';

interface DayModalProps {
  showModal: boolean,
  setShowModal: Function,
  selectedDate: string,
  moods: InstanceType<typeof PrismaClient.MoodSelect>[]
}

export default function DayModal({ showModal, setShowModal, selectedDate, moods }: DayModalProps) {
  const dateToday = moment();
  const date = moment(selectedDate, 'YYYY-MM-DD');
  const dateStr = date.format('dddd, MMMM Do');
  const [mood, setMood] = useState<number>();
  
  const renderTitle = () => {
    if (dateToday.isSame(date, 'day')) {
      return 'How are you feeling today?'
    } else if (dateToday.isAfter(date)) {
      return `How were you feeling last ${dateStr}?`
    } else if (dateToday.isBefore(date)) {
      return `Set a mood in advance for ${dateStr}`
    }
  }

  const handleSave = () => {
    console.log(`save mood ${mood} for date ${selectedDate}`)
  }

  return (
    <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-5">
          {renderTitle()}
        </h3>
      </div>
      <div className="flex justify-around px-20 gap-5"> 
        {moods.map((mood) => (
          <button
            className="flex justify-center flex-col items-center gap-5 p-2 w-12"
            onClick={() => setMood(mood.id)}
            key={mood.id}
          >
            <div className="relative w-14 h-14">
              <Image
                src={`/public/${mood.label}.svg`}
                alt={mood.alt}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="text-xs">{mood.label}</p>
          </button>
        ))}
      </div>
      <div className="flex justify-center pt-8 pb-5">
        <button className="px-5 py-2 text-md text-base text-white m-auto bg-cyan-500 hover:bg-cyan-600 rounded-full" onClick={() => handleSave()}>Save</button>
      </div>
    </Modal>
  )
}
