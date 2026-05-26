import { useEffect, useState, useRef } from "react";

export default function TodoVoiceAdder() {
  const [isListening, setIsListning] = useState(false);
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
    recognition.contiuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      // 시작 : 결과
      const transcript = e.result[0][0].transcript;
      setContent(transcript);
      console.log(`인식 : ${transcript}`);
    };

    recognition.onend = () => {
      // 끝남
      setIsListning(false);
    };

    recognition.onerror = (e) => {
      console.error(e.error);
      setIsListning(false);

      recognition.current = recognition;
    };
  }, [isUserActive]);

  const voiceAdderButtonHandler = () => {
    setIsUserActive(!isUserActive);
    if (isListening) {
      recognitionRef.current.stop();
      setIsListning(false);
    } else {
      recognitionRef.current.start();
      setIsListning(true);
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
