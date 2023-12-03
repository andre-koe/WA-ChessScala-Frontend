<script setup>
import { Chess } from "chess.js";
import { ChessBoardBuilder } from "/src/js/ChessboardBuilder.js"
import { SinglePlayer } from '/src/js/Singleplayer.js'
import PromotionModal from "./promotion_modal/PromotionModal.vue";

</script>
<template>
    <div
        class="z-10 absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[22rem] w-[40vw] drop-shadow-lg z-10">
        <div :class="[theme ? 'bg-gray-300 text-white' : 'bg-blue-200', `p-1 rounded-lg bg-opacity-50`]">
            <div id="Chessboard" class="chessboard"></div>
        </div>
        <PromotionModal v-if="isModalVisisble" @close="closeModal" :move="move"></PromotionModal>
    </div>
</template>
<script>
export default {
    components: {
        PromotionModal,
    },
    data() {
        return {
            showPromotionModal: false,
            move: null,
            multiplayer: null,
        }
    },
    computed: {
        theme() {
            return this.$store.state.darkModeEnabled;
        },
        isModalVisisble() {
            return this.$store.state.isPromotionModalVisible;
        }
    },
    methods: {
        handleShowPromotionSelect(event) {
            this.move = event.detail.move;
            this.$store.commit('setPromotionModalVisisble', true);
        },
        closeModal() {
            this.$store.commit('setPromotionModalVisisble', false);
        },
        team() {
            this.$store.state.team;
        },
        gameMode() {
            return this.$store.state.gameMode;
        }
    },
    mounted() {
        window.addEventListener('show-promotion-select', this.handleShowPromotionSelect);
        if (this.gameMode === 'singleplayer') {
            new SinglePlayer(this.team === "w" ? "w" : "b")
        } else if (this.gameMode === 'local') {
            let chess = new Chess()
            let chessBoardBuilder = new ChessBoardBuilder(chess)
            chessBoardBuilder.createChessBoard(document.querySelector("#Chessboard"), true)
        } else if (this.gameMode === 'online') {
            multiplayer = new OnlineMultiplayer();
        }
    },
    beforeUnmount() {
        window.removeEventListener('show-promotion-select', this.handleShowPromotionSelect);
        if (this.multiplayer != null) {
            this.multiplayer.destroy();
            this.multiplayer = null;
        }
    }
};
</script>
  
<style scoped></style>
  