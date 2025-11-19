import { nature } from './sounds/nature';
import { rain } from './sounds/rain';
import { animals } from './sounds/animals';
import { urban } from './sounds/urban';
import { places } from './sounds/places';
import { transport } from './sounds/transport';
import { things } from './sounds/things';
import { noise } from './sounds/noise';
import { NatureSoundCategories } from "~/types/natureSound"


export const sounds: {
  categories: NatureSoundCategories;
} = {
  // categories: [nature, rain, animals, urban, places, transport, things, noise],
  categories: [nature,rain,animals,urban,places,transport,things,noise],
};
