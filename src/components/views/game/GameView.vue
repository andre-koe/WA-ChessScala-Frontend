<script setup>
import { Chess } from "chess.js";
import { ChessBoardBuilder } from "/src/js/ChessboardBuilder.js"
import { SinglePlayer } from '/src/js/Singleplayer.js'
import PromotionModal from "./promotion_modal/PromotionModal.vue";

</script>
<template>
    <div class="z-10 absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[22rem] w-[40vw] drop-shadow-lg z-10">
        <div :class="[this.isDarkModeEnabled ? 'bg-gray-300 text-white' : 'bg-blue-200', `p-1 rounded-lg bg-opacity-50`]">
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
        }
    },
    computed: {
        isDarkModeEnabled() {
            return this.$store.state.darkModeEnabled;
        },
        isModalVisisble() {
            return this.$store.state.isPromotionModalVisible;
        }
    },
    methods: {
        handleShowPromotionSelect(event) {
            this.move = event.detail.move;
            this.$store.state.isPromotionModalVisible = true;
        },
        closeModal() {
            console.log("Close has been called")
            this.$store.state.isPromotionModalVisible = false; 
        }
    },
    mounted() {
        window.addEventListener('show-promotion-select', this.handleShowPromotionSelect);

        if (this.$store.state.gameMode === 'singleplayer') {
            new SinglePlayer(this.$store.state.team === "w" ? "w" : "b")
        } else if (this.$store.state.gameMode === 'local') {
            let chess = new Chess()
            let chessBoardBuilder = new ChessBoardBuilder(chess)
            chessBoardBuilder.createChessBoard(document.querySelector("#Chessboard"), true)
        }
    },
    beforeUnmount() {
        window.removeEventListener('show-promotion-select', this.handleShowPromotionSelect);
    }
};
</script>
  
<style scoped></style>
  