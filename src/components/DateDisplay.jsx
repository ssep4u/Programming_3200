import { useState, useEffect } from 'react'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

export default function DateDisplay() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const day = DAYS[now.getDay()]
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return (
    <div style={{ textAlign: 'center', margin: '8px 0' }}>
      <p style={{ fontSize: '1.1rem', margin: 0 }}>
        {year}년 {month}월 {date}일 ({day})
      </p>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
        {hours}:{minutes}:{seconds}
      </p>
    </div>
  )
}
