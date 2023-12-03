<template>
    <div v-bind="$attrs">
        <div class="sticky-header">
            <div class="flex justify-around border-b shadow-lg p-2">
                <button v-for="mode in gameModes" :key="mode" :class="['tab-button m-2', { 'active': currentTab === mode }]"
                    @click="currentTab = mode">
                    {{ mode }}
                </button>
            </div>
        </div>

        <div class="tab-content pl-2 pr-2 pt-4 pb-4">
            <div v-if="currentTab === 'Against the AI'" class="flex flex-col items-center justify-between">
                <div class="flex items-center p-8">
                    <font-awesome-icon :icon="['fas', 'chess-knight']" class="icon text-black text-2xl mr-4" />
                    <toggle-switch switchId="isWhite" v-model=isWhite class="drop-shadow-md" label=""></toggle-switch>
                    <font-awesome-icon :icon="['fas', 'chess-knight']" class="icon text-white text-2xl ml-4" />
                </div>
                <button @click="startGame('singleplayer')" class="btn drop-shadow-md">Start Game</button>
            </div>

            <div v-if="currentTab === 'Local Multiplayer'" class="flex items-center justify-center p-8">
                <button @click="startGame('local')" class="btn">Start Game</button>
            </div>

            <div v-if="currentTab === 'Online Multiplayer'" class="flex flex-col items-center p-8">
                <div class="floating-label mb-4">
                    <input type="text" id="gameID" placeholder=" " v-model="gameID" :class="[inputFieldClasses]">
                    <label for="gameID">GameID</label>
                    <p class="absolute text-xs top-[50%] left-[105%] w-[40%]">*Enter a GameID to join a Match</p>
                </div>
                <div v-if="gameID === ''">
                    <button @click="startGame('online')" class="btn">Start Game</button>
                </div>
                <div v-else>
                    <button @click="joinGame(gameID)" class="btn">Join Game</button>
                </div>
                <div v-if="hasPlayerId" class="mt-2">
                    <button @click="resumeGame()" class="btn">Resume Game</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ToggleSwitch from '../ui/ToggleSwitch.vue';
</script>

<script>
export default {
    props: {
        isVisible: Boolean,
    },
    components: {
        ToggleSwitch
    },
    data() {
        return {
            currentTab: 'Against the AI',
            gameModes: ['Against the AI', 'Local Multiplayer', 'Online Multiplayer'],
            gameID: '',
            isWhite: true,
        };
    },
    computed: {
        theme() {
            return this.$store.state.darkModeEnabled;
        },
        inputFieldClasses() {
            return `${this.theme ? 'bg-slate-600' : ''} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`
        },
        hasPlayerId() {
            return this.$store.state.playerId;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        startGame(gameMode, resume = false) {
            if (this.$store.state.isPlaying) {
                this.$store.commit('setGameId', null);
                this.$store.commit('setIsPlaying', false);
                if (!resume) {
                    this.$store.commit('setPlayerId', null);
                    this.$store.commit('setGameMode', '');
                }
                setTimeout(() => {
                    this.startNewGame(gameMode);
                }, 100);
            } else {
                this.startNewGame(gameMode);
            }
        },
        startNewGame(gameMode) {
            this.$store.commit('setActiveModal', null);
            this.$store.commit('setIsPlaying', true);
            this.$store.commit('setGameMode', gameMode);
            this.$store.commit('setTeam', this.isWhite === true ? "w" : "b");
        },
        joinGame(gameId) {
            this.$store.commit('setGameId', gameId);
        },
        resumeGame() {
            this.startGame('online', true);
        }
    },
};
</script>
  
<style scoped>
.sticky-header {
    position: sticky;
    top: 0;
    z-index: 1000;
}

.tab-button {
    padding: 2px 8px;
    border-bottom: 2px solid transparent;

    &:hover {
        border-bottom: 2px solid #074991;
    }

    &.active {
        border-bottom: 2px solid #007bff;
    }
}

.btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}

.btn:active {
    background-color: #003885;
}

.btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}

.icon {
    filter: drop-shadow(2px 4px 6px black)
}
</style>  