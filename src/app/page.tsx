import CalendarGrid from './components/calendar-grid';

export default function Home() {
  return (
    <>
      <CalendarGrid />
      <ul className="legend">
        <li>
          <div className="square good"></div>
          <p>good / happy</p>
        </li>
        <li>
          <div className="square neutral"></div>
          <p>neutral</p>
        </li>
        <li>
          <div className="square stressed"></div>
          <p>stressed</p>
        </li>
        <li>
          <div className="square sad"></div>
          <p>sad / frustrated</p>
        </li>
        <li>
          <div className="square sick"></div>
          <p>sick</p>
        </li>
      </ul>
    </>
  );
}