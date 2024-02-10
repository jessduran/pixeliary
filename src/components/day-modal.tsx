import moment from 'moment';
import Image from 'next/image';

import Modal from './modal';
import Happy from 'public/happy.svg';
import Chill from 'public/chill.svg';
import Neutral from 'public/neutral.svg';
import Stressed from 'public/stressed.svg';
import Sad from 'public/sad.svg';
import Sick from 'public/sick.svg';

interface DayModalProps {
  showModal: boolean,
  setShowModal: Function,
  selectedDate: string
}

const moods = [
  {
    id: 0,
    label: 'Happy',
    icon: Happy,
    alt: 'cheerful smiling emoticon'
  },
  {
    id: 1,
    label: 'Chill',
    icon: Chill,
    alt: 'slightly smiling wearing sunglasses emoticon'
  },
  {
    id: 2,
    label: 'Neutral',
    icon: Neutral,
    alt: 'no mouth emoticon'
  },
  {
    id: 3,
    label: 'Stressed',
    icon: Stressed,
    alt: 'worried open mouth emoticon'
  },
  {
    id: 4,
    label: 'Sad',
    icon: Sad,
    alt: 'frowning upside down smile emoticon'
  },
  {
    id: 5,
    label: 'Sick',
    icon: Sick,
    alt: 'cross-eyed emoticon'
  },
]

export default function DayModal({ showModal, setShowModal, selectedDate }: DayModalProps) {
  const dateToday = moment();
  const date = moment(selectedDate, 'YYYY-MM-DD');
  const dateStr = date.format('dddd, MMMM Do');


  const renderTitle = () => {
    if (dateToday.isSame(date, 'day')) {
      return 'How are you feeling today?'
    } else if (dateToday.isAfter(date)) {
      return `How were you feeling last ${dateStr}?`
    } else if (dateToday.isBefore(date)) {
      return `Set a mood in advance for ${dateStr}`
    }
  }

  const onMoodClick = (mood: number) => {
    // save selected mood
    console.log(selectedDate, mood);
  }

  return (
    <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-5">
          {renderTitle()}
        </h3>
      </div>
      <div className="flex justify-around px-20 pb-10 gap-5">
        
        {moods.map((mood) => (
          <button
            className="flex justify-center flex-col items-center gap-5 p-2 w-12"
            onClick={() => onMoodClick(mood.id)}
            key={mood.id}
          >
            <div className="relative w-14 h-14">
              <Image
                src={mood.icon}
                alt={mood.alt}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="text-xs">{mood.label}</p>
          </button>
        ))}
      </div>
    </Modal>
  )
}
