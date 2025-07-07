import { refs } from "./main.mjs";

async function getTranslator(languages) {

  if (!('Translator' in window)) {
    console.error("update your chrome to version 138\n...or you can try enable the feature flag: chrome://flags/#translation-api")
    return ;
  }

  const availability = await Translator.availability(languages);

  if (availability === "unavailable") {
    console.log(
      `Translation not supported; try a different language combination.`
    );
    return ;
  } else if (availability === "available") {
    return await Translator.create(languages);
  }
  return await Translator.create({
    ...languages,
    monitor(monitor) {
      monitor.addEventListener("downloadprogress", (e) => {
        console.log(`Downloaded ${Math.floor(e.loaded * 100)}%`);
      });
    },
  });
}

export async function initializeTranslator() {
  const instance = await getTranslator({
    sourceLanguage: refs.sourceLanguage.split('-')[0],
    targetLanguage: refs.targetLanguage.split('-')[0],
  });

  if (!instance) {
    throw new Error("not supported");
  }

  console.log(instance);
  refs.translator = instance;

  return instance;
}

export async function translatorService(text) {
  const instance = await initializeTranslator();

  const translation = await instance.translate(text);
  console.log(translation);

  return translation;
}


