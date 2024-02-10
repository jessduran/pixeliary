import { useState } from 'react';
import moment from 'moment';
import Image from 'next/image';

import happy from 'public/happy.svg';
import chill from 'public/chill.svg';
import neutral from 'public/neutral.svg';
import stressed from 'public/stressed.svg';
import sad from 'public/sad.svg';
import sick from 'public/sick.svg';

import { addEntry } from '@/actions';
import { Mood } from '@/utils/types';
import Modal from './modal';


interface DayModalProps {
  showModal: boolean,
  setShowModal: Function,
  selectedDate: string,
  moods: Mood[]
}

export default function DayModal({ showModal, setShowModal, selectedDate, moods }: DayModalProps) {
  const dateToday = moment();
  const date = moment(selectedDate, 'YYYY-MM-DD');
  const dateStr = date.format('MMMM Do (dddd)');
  const [activeMood, setActiveMood] = useState<number>(0);
  
  const renderTitle = () => {
    if (dateToday.isSame(date, 'day')) {
      return 'How are you feeling today?'
    } else if (dateToday.isAfter(date)) {
      return `How were you feeling last ${dateStr}?`
    } else if (dateToday.isBefore(date)) {
      return `Set a mood in advance for ${dateStr}`
    }
  }

  const getImgSrc = (label: string) => {
    if (label === 'happy') return happy; 
    if (label === 'chill') return chill;
    if (label === 'neutral') return neutral;
    if (label === 'stressed') return stressed;
    if (label === 'sad') return sad;
    if (label === 'sick') return sick;
    return null;
  }

  const handleSave = () => {
    addEntry(selectedDate, activeMood);
    setShowModal(false);
  }

  return (
    <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
      <div className="px-6 pt-14">
        <h3 className="text-lg text-gray-900 mb-5">
          {renderTitle()}
        </h3>
      </div>
      <div className="flex justify-around px-20 gap-2"> 
        {moods.map((mood) => (
          <div
            key={mood.id}
            className={`transition ease-in-out delay-100 py-2 px-4 rounded hover:bg-gray-200 ${activeMood === mood.id ? "bg-gray-200" : "bg-gray-100"}`}
          >
            <button
              className="flex justify-center flex-col items-center gap-5 p-2 w-12"
              onClick={() => setActiveMood(mood.id)}
              key={mood.id}
            >
              <div className="relative w-14 h-14">
                <Image
                  src={getImgSrc(mood.label)}
                  alt={mood.alt}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className="text-xs">{mood.label}</p>
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-8 pb-5">
        <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-5 py-2 text-md text-base text-white m-auto bg-cyan-400 hover:bg-cyan-600 rounded-full" onClick={() => handleSave()}>Save</button>
      </div>
    </Modal>
  )
}
