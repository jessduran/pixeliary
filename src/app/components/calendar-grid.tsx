import moment from 'moment';

export default function CalendarGrid() {
  const currentYear = moment().year();
  const months = moment.monthsShort();


  const renderSquaresDesktop = () => {
    let content:any = [];

    // map through all months
    months.map((month, idx) => {
      const dateTmp = `${currentYear}-${idx+1}`;
      const days = moment(dateTmp, "YYYY-MM").daysInMonth();


      // include the current month's label in our grid
      content.push(
        <div className="grid-label" key={month}>{month.charAt(0)}</div>
      )

      // generate grid items for month's dates
      for (let c = 0; c < days; c++) {
        const dateKey = `${currentYear}-${month}-${c+1}`;
        content.push(
          <button className="grid-item" key={dateKey}></button>
        )
      }

      // if month days is lesser than 31, add filler grids
      if (days < 31) {
        for (let f = 0; f < 31 - days; f++) {
          content.push(
            <div
              className="grid-item filler"
              key={`${idx+1}-${f}`}
            />
          )
        }
      }
    })

    return content;
  }

  return (
    <div className="pix-main-container">
      <h1 className="bold text-5xl text-center">
        A year in pixels {currentYear}
      </h1>
      <div className="grid">
        {renderSquaresDesktop()}
      </div>
    </div>
  )
}