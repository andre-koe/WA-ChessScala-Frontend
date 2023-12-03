<script setup>
import { Chess } from "chess.js";
import { ChessBoardBuilder } from "/src/js/ChessboardBuilder.js"
import { SinglePlayer } from '/src/js/Singleplayer.js'
import { OnlineMultiplayer } from '/src/js/OnlineMultiplayer.js'
import PromotionModal from "./modals/PromotionModal.vue";

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
        },
        team() {
            this.$store.state.team;
        },
        gameMode() {
            return this.$store.state.gameMode;
        },
        gameId() {
            return this.$store.state.gameId;
        },
        playerId() {
            return this.$store.state.playerId;
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
    },
    mounted() {
        window.addEventListener('show-promotion-select', this.handleShowPromotionSelect);
        if (this.gameMode === 'singleplayer') {
            new SinglePlayer(this.team === "w" ? "w" : "b")
            console.log("SinglePlayer Game")
        } else if (this.gameMode === 'local') {
            let chess = new Chess()
            let chessBoardBuilder = new ChessBoardBuilder(chess)
            chessBoardBuilder.createChessBoard(document.querySelector("#Chessboard"), true)
            console.log("Local Game")
        } else if (this.gameMode === 'online') {
            this.multiplayer = new OnlineMultiplayer(this.playerId, this.gameId);
            console.log("Multiplayer Game")
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
  