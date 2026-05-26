import { useEffect, useState, useRef } from "react";

export default function TodoVoiceAdder(props) {
  const [isListening, setIsListening] = useState(false);
  const [content, setContent] = useState("");

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("음성인식 오류");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      // 시작 : 결과
      const transcript = e.results[0][0].transcript;
      setContent(transcript);
      props.addTodo(transcript);
      console.log(`인식 : ${transcript}`);
    };

    recognition.onend = () => {
      // 끝남
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const voiceAdderButtonHandler = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div>
      <button onClick={voiceAdderButtonHandler}>
        {isListening ? "음성 인식 종료하긔ㅋㅋ" : "음성 인식 시작하긔 ㅋㅋ"}
      </button>
      <p>인식 텍스트 : {content}</p>
    </div>
  );
}
