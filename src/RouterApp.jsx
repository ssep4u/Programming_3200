import { useState, useRef } from 'react'
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

function MusicPlayer() {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    function togglePlay() {
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255,255,255,0.85)',
            border: '1px solid #ccc',
            borderRadius: '24px',
            padding: '6px 14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
            <audio
                ref={audioRef}
                src="/산나비 BGM 하모니카 1시간 버전   SANABI.mp3"
                loop
            />
            <button
                onClick={togglePlay}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.4rem',
                    cursor: 'pointer',
                    lineHeight: 1,
                }}
            >
                {isPlaying ? '⏸' : '▶️'}
            </button>
            <span style={{ fontSize: '0.85rem', color: '#555' }}>
                {isPlaying ? '재생 중' : '배경음악'}
            </span>
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
            <MusicPlayer />
        </div>
    )
}