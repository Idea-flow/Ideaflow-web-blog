import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { useCookie } from '#app'

interface NatureSoundState {
    pause: boolean,
    isPlaying: boolean, // 控制全局播放器的样式, 以及 单个音频 视频的播放暂停

    natureSounds: {
        [id: string]: {
            isSelected: boolean; //播放,暂停 需要操作的
            volume: number;
        };
    };
    enableVolumeControl: boolean, //

}

export const useNatureSoundStore = defineStore('natureSound', {
    state: (): NatureSoundState => {
        return {
            pause: false,
            isPlaying: false,
            natureSounds: {

            },


            enableVolumeControl: false,
        }
    },
    getters: {
        getPause(): boolean {
            return this.pause
        },

    },
    actions: {
        setPause(pause: boolean) {
            this.pause = pause
        },
        initNatureSounds(sounds: any) {
            const soundsState: { [id: string]: { isSelected: boolean; volume: number } } = {};
            sounds.categories.forEach((category: any) => {
                category.natureSounds.forEach((sound: any) => {
                    soundsState[sound.id] = {
                        isSelected: false,
                        volume: 0.8
                    };
                });
            });
            this.natureSounds = soundsState;
        },
        initStatus() {
            this.pause = false;
            this.play = false;
            this.isPlaying = false;
        },
        hasSelectedSound(){
            const keys = Object.keys(this.natureSounds);
            let result = keys.some(key => this.natureSounds[key].isSelected);
// 只要有一个 isSelected 为 true，result 就是 true
//             let result = keys.every(key => !this.natureSounds[key].isSelected);
//             console.log("natureSound--hasSelectedSound:"+result)
           return  result;
            // return Object.values(this.natureSounds).some(value => value.isSelected);
        },

        actionTogglePlay(){
            this.isPlaying = !this.isPlaying
        },
        actionToggleSelected(id:string){
            this.natureSounds[id].isSelected = true;
        },
        actionToggleUnSelected(id:string){
            this.natureSounds[id].isSelected = false;
        },
        actionPlay(){
            // console.log("actionPlay:");
            this.isPlaying = true;
        },
        actionPause(){
            this.isPlaying = false;
        },

        actionSetVolume(id:string,volume:number){
            this.natureSounds[id].volume = volume;
        },

        triggerVolumeControl(){
            this.enableVolumeControl = !this.enableVolumeControl;
        }

    },
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    },
})