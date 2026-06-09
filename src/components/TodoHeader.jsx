import { useState, useRef } from 'react'
import Button from './Button.jsx'

import bgmFile from "../assets/audio/Tbgm.mp3";

export default function TodoHeader({ completedCount = 0, totalCount = 0, percent = 0 }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        try {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                await audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        } catch (e) {
            console.error("오디오 재생 실패: ", e);
        }
    };
    return (
        <div className="todo__header">
            <h1 className="todo__title">ToDo ToDo</h1>
            <Button
                className="todo__music-button"
                onClick={togglePlay}
            >
                {isPlaying ? "⏸️" : "▶️"}
            </Button>

            <audio
                ref={audioRef}
                src={bgmFile}
                loop
            />
            <div className="todo__progress">
                <div className="todo__progress-label">
                    <span>진행률</span>
                    <span>{completedCount} / {totalCount} ({percent}%)</span>
                </div>
                <div className="todo__progress-bar">
                    <div
                        className="todo__progress-bar-fill"
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
