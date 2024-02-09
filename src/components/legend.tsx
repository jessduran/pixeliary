export default function Legend() {
  return (
    <ul className="legend mt-8">
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
  )
}
