import { NatureSoundCategory } from "~/types/natureSound"


export const noise: NatureSoundCategory = {
    icon: "myNatureSound:animals-cat2",
    id: 'noise',
    natureSounds: [
        {
            icon: "myNatureSound:noise",
            id: 'white-noise',
            label: 'White Noise',
            src: 'https://oss.ideaflow.top/natureSound/sounds/noise/white-noise.wav',
        },
        {
            icon: "myNatureSound:noise",
            id: 'pink-noise',
            label: 'Pink Noise',
            src: 'https://oss.ideaflow.top/natureSound/sounds/noise/pink-noise.wav',
        },
        {
            icon: "myNatureSound:noise",
            id: 'brown-noise',
            label: 'Brown Noise',
            src: 'https://oss.ideaflow.top/natureSound/sounds/noise/brown-noise.wav',
        },
    ],
    title: 'Noise',
};
