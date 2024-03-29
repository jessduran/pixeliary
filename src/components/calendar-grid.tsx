'use client';

import moment from 'moment';
import { useState } from 'react';
import DayModal from './day-modal';
import { Mood, Entry } from '@/utils/types';

interface CalendarGridProps {
  entries: Entry[],
  moods: Mood[]
}

export default function CalendarGrid({ entries, moods }: CalendarGridProps) {
  const currentYear = moment().year();
  const months = moment.monthsShort();
  const today = moment();

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const onCellClick = (id: string) => {
    setShowModal(true);
    setSelectedDate(id);
  }

  const checkDateEntry = (date: string) => {
    const entry = entries.find((entry) => entry.date === date)
    if (entry) {
      return entry.mood?.label
    }
    return ''
  }

  const renderSquares = () => {
    let content:any = [];

    months.map((month) => {
      content.push(
        <div className="flex justify-center items-center text-sm" key={month}>{month.charAt(0)}</div>
      )
    })


    for (let c = 0; c < 31; c ++) {
      content.push(
        <div className="flex justify-center items-center text-sm" key={c+1}>{c+1}</div>
      )
      months.map((month, idx) => {
        const dateStr = `${currentYear}-${idx+1}-${c+1}`;
        const date = moment(dateStr, 'YYYY-MM-DD');

        // check if date is valid
        if (date.isValid()) {

          // check if date is before today
          if (today.isBefore(date)) {
            content.push(
              <div
                className="grid-item filler"
                key={dateStr}
              />
            )
          } else {
            content.push(
              <button
                className={`grid-item ${checkDateEntry(dateStr)}`}
                key={dateStr}
                onClick={() => onCellClick(dateStr)}
              />
            )
          }

        } else {
          content.push(
            <div
              className="grid-item filler"
              key={dateStr}
            />
          )
        }
      })   
    }
  
    return content;
  }

  return (
    <div className="flex justify-center flex-col p-8 pb-16 gap-5 mx-auto max-w-3xl">
      <div className="grid">
        <div />
        {renderSquares()}
      </div>
      <DayModal
        setShowModal={setShowModal}
        showModal={showModal}
        selectedDate={selectedDate}
        moods={moods}
      />
    </div>
  )
}