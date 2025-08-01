import { refs } from "./main.mjs";

import { logger } from './logger.mjs';

export function speak(text, lang) {
    if (!('SpeechSynthesisUtterance' in window)) {
      logger.error("speech synthesis is not supported")
      return ;
    }
  
    const synthesis = new SpeechSynthesisUtterance(text);
  
    const voice = refs.voices.find((item) => item.lang === lang);
    if (!voice) {
      throw new Error("missing voice");
    }
    console.log("selected voice:", voice);
    synthesis.voice = voice;
    speechSynthesis.speak(synthesis);
  }
