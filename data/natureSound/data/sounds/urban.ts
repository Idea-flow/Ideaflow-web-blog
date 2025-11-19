import { NatureSoundCategory } from "~/types/natureSound"

// 城市

export const urban: NatureSoundCategory = {
    icon: "myNatureSound:city",
    id: 'urban',
    natureSounds: [
        {
            icon:  "myNatureSound:city-highway",
            id: 'highway',
            label: 'Highway',
            src: 'https://oss.ideaflow.top/natureSound/sounds/urban/highway.mp3',
        },
        {
            icon:  "myNatureSound:city-highway",
            id: 'road',
            label: 'Road',
            src: 'https://oss.ideaflow.top/natureSound/sounds/urban/road.mp3',
        },
        {
            icon:  "myNatureSound:city-ambulance",
            id: 'ambulance-siren',
            label: 'Ambulance Siren',
            src: 'https://oss.ideaflow.top/natureSound/sounds/urban/ambulance-siren.mp3',
        },
        {
            icon:  "myNatureSound:city-soundwave",
            id: 'busy-street',
            label: 'Busy Street',
            src: 'https://oss.ideaflow.top/natureSound/sounds/urban/busy-street.mp3',
        },
        {
            icon: "myNatureSound:city-crowd",
            id: 'crowd',
            label: 'Crowd',
            src: 'https://oss.ideaflow.top/natureSound/sounds/urban/crowd.mp3',
        },
        {
            icon:  "myNatureSound:city-traffic",
            id: 'traffic',
            label: 'Traffic',
            src: 'https://oss.ideaflow.top/natureSound/sounds/urban/traffic.mp3',
        },
        {
            icon:  "/natureSound/city-firework.png",
            id: 'fireworks',
            label: 'Fireworks',
            src: 'https://oss.ideaflow.top/natureSound/sounds/urban/fireworks.mp3',
        },
    ],
    title: 'Urban',
};