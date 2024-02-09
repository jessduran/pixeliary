'use client';

import moment from 'moment';

export default function CalendarGrid() {
  const currentYear = moment().year();
  const months = moment.monthsShort();

  const onCellClick = (id: string) => console.log(id);

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
          content.push(
            <button
              className="grid-item"
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
    </div>
  )
}