export interface NatureSound {
    icon: string;
    id: string;
    label: string;
    src: string;
}

export type NatureSounds = Array<NatureSound>;

export interface NatureSoundCategory {
    icon: string;
    id: string;
    natureSounds: NatureSounds;
    title: string;
}

export type NatureSoundCategories = Array<NatureSoundCategory>;