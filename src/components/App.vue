<script setup>
import ModalController from './views/ModalController.vue';
import ModalView from './views/ModalView.vue';
import Branding from './views/branding/Branding.vue';
import GameView from './views/game/GameView.vue';
import ThemeToggleButton from './views/ui/ThemeToggleButton.vue';
</script>
<template>
    <div
        :class="[theme ? 'bg-custom-dark' : 'bg-custom-light', 'min-h-screen', `flex flex-col justify-center content-center items-center overflow-clip w-full`]">
        <ThemeToggleButton />
        <div v-if="isPlaying" :class="[isPlaying ? 'min-w-[85vw] min-h-[85vh]' : '']">
            <GameView />
        </div>
        <div v-else class="mt-[-4rem]">
            <Branding class="z-10" />
        </div>
        <ModalView />
        <ModalController class="mb-2" />
        <box-component />
    </div>
</template>
<script>
export default {
    computed: {
        theme() {
            return this.$store.state.darkModeEnabled;
        },
        isPlaying() {
            return this.$store.state.isPlaying;
        }
    }

}
</script>