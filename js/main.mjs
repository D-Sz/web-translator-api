
import { recognize } from "./recognition.mjs";
import { initializeTranslator } from "./translate.mjs";
import { speak } from "./tts.mjs";

export const refs = {
  synth: window.speechSynthesis,
  recognition: null,
  voices: null,
  onRecognitionResult: null,
  sourceLanguage:'',
  targetLanguage:''
};

const stop = () => {
  refs.synth.cancel();
  refs.recognition?.stop();
};


const liveTranslate = async () => {
  if (!refs.translator) {
    await initializeTranslator();
  }
  recognize(async (text)=>{
    const { translator } = refs;

    const translatedText = await translator.translate(text);
    speak(translatedText, refs.targetLanguage);
  })
  
};

const startup = async () => {
  console.log("app has started");
  document.getElementById("stop").addEventListener("click", stop);
  document.getElementById("live-translate").addEventListener("click", liveTranslate);

  // Add event listeners for language selects
  document.getElementById('source-language').addEventListener('change', (e) => {
    refs.sourceLanguage = e.target.value;
    console.log(refs)
  });

  document.getElementById('target-language').addEventListener('change', (e) => {
    refs.targetLanguage = e.target.value;
    console.log(refs)
  });

  speechSynthesis.onvoiceschanged = () => {
    const voices = refs.synth.getVoices();
    refs.voices = voices;
    
    // Get unique languages from voices
    const uniqueLanguages = [...new Set(voices.map(voice => voice.lang))];
    
    // Set initial values in refs if available
    if (uniqueLanguages.length > 0) {
      refs.sourceLanguage = uniqueLanguages[0];
      refs.targetLanguage = uniqueLanguages[0];
    }
    
    // Populate source language select
    const sourceSelect = document.getElementById('source-language');
    sourceSelect.innerHTML = uniqueLanguages
      .map(lang => `<option value="${lang}" ${lang === refs.sourceLanguage ? 'selected' : ''}>${lang}</option>`)
      .join('');
    
    // Populate target language select
    const targetSelect = document.getElementById('target-language');
    targetSelect.innerHTML = uniqueLanguages
      .map(lang => `<option value="${lang}" ${lang === refs.targetLanguage ? 'selected' : ''}>${lang}</option>`)
      .join('');
    
    console.log(
      "voices:\n",
      voices.map((item) => `${item.lang}( ${item.name})`).join("\n")
    );
  };  
};

document.addEventListener("DOMContentLoaded", startup);
