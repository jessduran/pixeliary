'use client';

import moment from 'moment';
import { useState } from 'react';
import DayModal from './day-modal';
import { PrismaClient } from '@prisma/client';

interface CalendarGridProps {
  entries: InstanceType<typeof PrismaClient.EntrySelect>[],
  moods: InstanceType<typeof PrismaClient.MoodSelect>[]
}

export default function CalendarGrid({ entries, moods }: CalendarGridProps) {
  const currentYear = moment().year();
  const months = moment.monthsShort();

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const onCellClick = (id: string) => {
    setShowModal(true);
    setSelectedDate(id);
  }

  const checkDateEntry = (date: string) => {
    const entry = entries.find((entry) => entry.date === date)
    if (entry) {
      return entry.mood.label
    }
    return ''
  }

  const renderSquares = () => {
    let content:any = [];

    months.map((month) => {
      content.push(
        <div className="grid-label" key={month}>{month.charAt(0)}</div>
      )
    })


    for (let c = 0; c < 31; c ++) {
      content.push(
        <div className="grid-label" key={c+1}>{c+1}</div>
      )
      months.map((month, idx) => {
        const dateStr = `${currentYear}-${idx+1}-${c+1}`;
        const date = moment(dateStr, 'YYYY-MM-DD');

        // check if date is valid
        if (date.isValid()) {

          // check if has entry
          content.push(
            <button
              className={`grid-item ${checkDateEntry(dateStr)}`}
              key={dateStr}
              onClick={() => onCellClick(dateStr)}
            />
          )
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
    <div className="pix-main-container">
      <h1 className="bold text-5xl text-center">
        A year in pixels {currentYear}
      </h1>
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