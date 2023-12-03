<template>
    <div :class="[modalClasses]">
        <LoginSignupModal class="modal" v-if="activeModal === 'login-signin'" />
        <GameSetupModal class="modal" v-if="activeModal === 'gamesetup'" />
        <InformationModal class="modal" v-if="activeModal === 'gameinfo'" />
    </div>
</template>
  
<script>

import LoginSignupModal from './modals/LoginSignupModal.vue';
import GameSetupModal from './modals/GameSetupModal.vue';
import InformationModal from './modals/InformationModal.vue';

export default {
    components: {
        LoginSignupModal,
        GameSetupModal,
        InformationModal
    },
    computed: {
        theme() {
            return this.$store.state.darkModeEnabled;
        },
        modalClasses() {
            if (this.activeModal === null) {
                return '';
            } else {
                let classes = this.theme ? 'bg-slate-800/80 text-white border-white-300' : 'bg-white/80 text-gray-800 border-slate-800';
                return `${classes} absolute top-[20%] left-[50%] translate-x-[-50%] z-20 border-2 rounded-lg shadow-xl min-w-[30%] max-w-[60%] max-h-[60%] overflow-y-auto content-area`
            }

        },
        activeModal() {
            return this.$store.state.activeModal;
        },
    },
};
</script>

<style scoped>
.content-area {
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 0 8px 8px 0;
    }

    &::-webkit-scrollbar-thumb {
        background: #007bff;
        border-radius: 6px;
    }
}
</style>