import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
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

function LinkButtonPageApp({ bgColor, setBgColor }) {
    const navigate = useNavigate();

    return (
        <div>
            <h1>App 목록</h1>
            <BgColorPicker bgColor={bgColor} setBgColor={setBgColor} />
            <ul>
                <li><Link to="/counterapp">🔢 CounterApp</Link></li>
                <li><Link to="/todolistapp">✅ TodoListApp</Link></li>
                <li><button
                    style={{width: '100px', height: '100px', fontSize: '1.1rem'}}
                    onClick={() => navigate('/counterapp')}
                >🔢 CounterApp</button></li>
                <li><button
                    style={{width: '200px', height: '200px', fontSize: '2rem'}}
                    onClick={() => navigate('/todolistapp')}
                >✅ TodoListApp</button></li>
            </ul>
        </div>
    )
}

export default function RouterApp() {
    const [bgColor, setBgColor] = useState('#ffffff')

    return (
        <div style={{ minHeight: '100vh', backgroundColor: bgColor, transition: 'background-color 0.3s' }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LinkButtonPageApp bgColor={bgColor} setBgColor={setBgColor} />} />
                    <Route path="/counterapp" element={<CounterApp />} />
                    <Route path="/todolistapp" element={<TodoListApp />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}