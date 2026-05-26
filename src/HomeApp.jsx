import { useState } from 'react'
import CounterApp from './CounterApp.jsx'
import TodoListApp from './TodoListApp.jsx'

const BG_COLORS = [
  { label: '흰색', value: '#ffffff' },
  { label: '하늘색', value: '#e0f2fe' },
  { label: '연두색', value: '#dcfce7' },
  { label: '연보라', value: '#f3e8ff' },
  { label: '복숭아', value: '#ffe4e6' },
  { label: '노란색', value: '#fef9c3' },
  { label: '어두운', value: '#1e1e2e' },
]

function BgColorPicker({ bgColor, setBgColor }) {
  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
      {BG_COLORS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setBgColor(value)}
          title={label}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: value,
            border: bgColor === value ? '3px solid #555' : '2px solid #ccc',
            cursor: 'pointer',
            transition: 'border 0.15s',
          }}
        />
      ))}
    </div>
  )
}

function ButtonPageApp({ setPage, bgColor, setBgColor }) {
  return (
    <>
      <h1>App 목록</h1>
      <BgColorPicker bgColor={bgColor} setBgColor={setBgColor} />
      <ul>
        <li><button onClick={() => setPage('counterapp')} style={{ fontSize: "1.1rem", width: "100px", height: "100px" }}>🔢<br />CounterApp</button></li>
        <li><button onClick={() => setPage('todolistapp')} style={{ fontSize: "1.1rem", width: "100px", height: "100px" }}>✅<br />TodoListApp</button></li>
      </ul>
    </>
  )
}

export default function HomeApp() {
  const [page, setPage] = useState('home')
  const [bgColor, setBgColor] = useState('#ffffff')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bgColor, transition: 'background-color 0.3s' }}>
      {/* page 가 home이면 <ButtonPageApp /> */}
      {page === 'home' && <ButtonPageApp setPage={setPage} bgColor={bgColor} setBgColor={setBgColor} />}
      {/* page 가 home이 아니면, home으로 가는 버튼 만들자 */}
      {page !== 'home' &&
        <button
          onClick={() => setPage('home')}
          style={{
            position: 'fixed',
            left: '10px',
            bottom: '10px',
            cursor: 'pointer',
            borderRadius: '8px',
            backgroundColor: '#eee',
            border: 'none',
            padding: '6px',
          }}
        >🛖hooooome</button>
      }

      {/* page 가 counterapp이면 <CounterApp /> */}
      {page === 'counterapp' && <CounterApp />}

      {/* page 가 todolistapp이면 <TodoListApp /> */}
      {page === 'todolistapp' && <TodoListApp />}
    </div>
  )
}