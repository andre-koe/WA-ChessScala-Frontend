<template>
    <div class="h-full w-full">
        <div class="sticky-header backdrop-blur-md">
            <div class="flex justify-around border-b shadow-lg p-2">
                <button class="tab-button" :class="{ 'active': currentTab === 'rules' }" @click="currentTab = 'rules'">
                    Rules
                </button>
                <button class="tab-button" :class="{ 'active': currentTab === 'about' }" @click="currentTab = 'about'">
                    About
                </button>
            </div>
        </div>
        <div class="content-area p-4">
            <div v-if="currentTab === 'rules'">
                <h2 class="text-lg font-bold underline mb-2">Objective</h2>
                <p>The primary objective in chess is to checkmate your opponent's king. Checkmate occurs when the king
                    is in a position to be captured (in check) and cannot escape from capture.</p>

                <h2 class="text-lg font-bold underline mb-2 mt-4">Setup</h2>
                <p>The game is played on an 8x8 square board with alternating light and dark squares. Each player starts
                    with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns.</p>

                <h2 class="text-lg font-bold underline mb-2 mt-4">Moves</h2>
                <ul class="list-disc pl-5">
                    <li><strong>Pawns:</strong> Move forward one square, but capture diagonally. On their first move,
                        they can move forward two squares.</li>
                    <li><strong>Rooks:</strong> Move horizontally or vertically any number of squares.</li>
                    <li><strong>Knights:</strong> Move in an L-shape: two squares in one direction and then one square
                        perpendicular.</li>
                    <li><strong>Bishops:</strong> Move diagonally any number of squares.</li>
                    <li><strong>Queen:</strong> Move diagonally, horizontally, or vertically any number of squares.</li>
                    <li><strong>King:</strong> Move one square in any direction.</li>
                </ul>

                <h2 class="text-lg font-bold underline mb-2 mt-4">Special Moves</h2>
                <ul class="list-disc pl-5">
                    <li><strong>Castling:</strong> A move involving the king and either rook, moving the king two
                        squares towards the rook, and the rook to the square the king crossed.</li>
                    <li><strong>En passant:</strong> A special pawn capture that can only occur immediately after a pawn
                        moves two squares forward from its starting position and an opposing pawn captures it as if it
                        had moved only one square.</li>
                    <li><strong>Promotion:</strong> When a pawn reaches the farthest row from its starting position, it
                        can be promoted to any other piece, usually a queen.</li>
                </ul>

                <h2 class="text-lg font-bold underline mb-2 mt-4">End of the Game</h2>
                <p>The game ends in checkmate, a draw, or resignation. A draw can occur in several ways, including
                    stalemate, insufficient material, threefold repetition, or the fifty-move rule.</p>

            </div>
            <div v-if="currentTab === 'about'">
                <h2 class="text-lg font-bold underline mb-2 mt-4">About the ChessScala Project</h2>
                <p>The ChessScala project is being developed in the winter semester 2023/2024 at HTWG Konstanz for the
                    course "Web Applications".</p>
                <h4 class="text-lg font-bold underline mb-2 mt-4">Background of the Project</h4>
                <p>This project builds on the course "Software Engineering", in which a chess game was created using the
                    Scala programming language. In the "Web Applications" course, the chess game serves as the backend. The
                    goal of the course is to extend the game using the Play framework to create a web application with a
                    frontend interface.</p>
                <h4 class="text-lg font-bold underline mb-2 mt-4">Course Objectives</h4>
                <p>Gain experience with the Play framework.</p>
                <h4 class="text-lg font-bold underline mb-2 mt-4">This project is being developed by</h4>
                <p class="font-bold">@Denis Bolintineanu</p>
                <p class="font-bold">@André Königer</p>
                <h4 class="text-lg font-bold underline mb-2 mt-4">Contact Information</h4>
                <p>
                    For further inquiries and details about the project, please contact the developers via the provided
                    email links or reach out to the Department of Computer Science at HTWG Konstanz.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: Boolean
    },
    data() {
        return {
            currentTab: 'rules'
        };
    },
    methods: {
        close() {
            this.$emit('close');
        },
    }
};
</script>
<style>
.sticky-header {
    position: sticky;
    top: 0;
    z-index: 1000;

    .tab-button {
        padding: 2px 2px;
        border-bottom: 2px solid transparent;

        &:hover {
            border-bottom: 2px solid #074991;
        }

        &.active {
            border-bottom: 2px solid #007bff;
        }
    }
}</style>