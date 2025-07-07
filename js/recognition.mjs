import { refs } from "./main.mjs";
import { logger } from './logger.mjs';

export const recognize = (onResult) => {
  refs.onRecognitionResult = onResult;

  if (!('webkitSpeechRecognition' in window)) {
    logger.error("speech recognition is not supported")
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
    logger.info('recognized: ', text);
    refs.onRecognitionResult?.(text);
  };
  recognition.onend = () => {
    logger.info("Recognition stopped");
  };
  recognition.onerror = (event) => {
    logger.error("Recognition error:", event.error);
  };
  recognition.onspeechstart = () => {
    logger.info("Speech started");
  };
  recognition.onspeechend = () => {
    logger.info("Speech ended");
  };
  recognition.onaudioend = () => {
    logger.info("Audio ended");
  };
  recognition.onaudiostart = () => {
    logger.info("Audio started");
  };
  recognition.onsoundstart = () => {
    logger.info("Sound started");
  };
  recognition.onsoundend = () => {
    logger.info("Sound ended");
  };

  recognition.start();
};
