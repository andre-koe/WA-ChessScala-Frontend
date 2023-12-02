<script setup>
import ModalController from './views/ModalController.vue';
import ModalView from './views/ModalView.vue';
import Branding from './views/branding/Branding.vue';
import GameView from './views/game/GameView.vue';
import ThemeToggleButton from './views/ui/ThemeToggleButton.vue';
</script>
<template>
    <div :class="[$store.state.darkModeEnabled ? 'bg-custom-dark' : 'bg-custom-light', 'min-h-screen', `flex flex-col justify-center content-center items-center overflow-clip w-full`]">
        <ThemeToggleButton/>
        <div v-if="$store.state.isPlaying" :class="[$store.state.isPlaying ? 'min-w-[85vw] min-h-[85vh]' : '']">
            <GameView/>
        </div>
        <div v-else class="mt-[-4rem]">
            <Branding class="z-10" />
        </div>
        <ModalView />
        <ModalController class="mb-2" />
        <box-component/>
    </div>
</template>