export default function Legend() {
  return (
    <ul className="mt-8 mb-8 block flex-col ml-auto max-w-sm legend lg:flex lg:fixed lg:right-20 lg:bottom-5">
      <li>
        <div className="square happy"></div>
        <p>good / happy</p>
      </li>
      <li>
        <div className="square chill"></div>
        <p>chill</p>
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
