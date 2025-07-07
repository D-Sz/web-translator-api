import { refs } from "./main.mjs";

export const recognize = (onResult) => {
  refs.onRecognitionResult = onResult;

  if (!('webkitSpeechRecognition' in window)) {
    console.error("speech recognition is not supported")
    return ;
  }

  const recognition = new webkitSpeechRecognition();
  refs.recognition = recognition;
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = refs.sourceLanguage;

  recognition.onresult = (event) => {
    const lastResult = event.results[event.results.length - 1];
    const text = lastResult[0].transcript;
    console.log('recognized: ',text);
    refs.onRecognitionResult?.(text);
  };
  recognition.onend = () => {
    console.log("Recognition stopped");
  };
  recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
  };
  recognition.onspeechstart = () => {
    console.log("Speech started");
  };
  recognition.onspeechend = () => {
    console.log("Speech ended");
  };
  recognition.onaudioend = () => {
    console.log("Audio ended");
  };
  recognition.onaudiostart = () => {
    console.log("Audio started");
  };
  recognition.onsoundstart = () => {
    console.log("Sound started");
  };
  recognition.onsoundend = () => {
    console.log("Sound ended");
  };

  recognition.start();
};
