import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';


const store = createStore({
    state: {
        isLoggedIn: false,
        darkModeEnabled: false,
        activeModal: null,
        isPlaying: false,
        gameMode: '',
        gameId: '',
        playerId: '',
        team: '',
        localMultiplayerFEN: null,
        singlePlayerFEN: null,
        isPromotionModalVisible: false
    },
    mutations: {
        setLoggedIn(state, status) {
            state.isLoggedIn = status;
        },
        toggleDarkMode(state) {
            state.darkModeEnabled = !state.darkModeEnabled;
        },
        setActiveModal(state, modalName) {
            state.activeModal = modalName;
        },
        closeModal(state) {
            console.log("close now")
            state.activeModal = null;
        },
        setIsPlaying(state, isPlaying) {
            if (isPlaying) {
                state.activeModal = null;
            }
            state.isPlaying = isPlaying;
        },
        setGameMode(state, gameMode) {
            state.gameMode = gameMode;
        },
        showPromotionModal(state, isVisible) {
            state.isPromotionModalVisible = isVisible;
        },
        setTheme(state, isDarkTheme) {
            state.darkModeEnabled = isDarkTheme;
        },
        setGameId(state, gameId) {
            state.gameId = gameId;
        },
        setPlayerId(state, playerId) {
            state.playerId = playerId;
        },
        setLocalMultiplayerFEN(state, fen) {
            state.localMultiplayerFEN = fen;
        },
        setSinglePlayerFEN(state, fen) {
            state.singlePlayerFEN = fen;
        }
    },
    actions: {
        login({ commit }) {
            commit('setLoggedIn', true);
        },
        logout({ commit }) {
            commit('setLoggedIn', true);
        }
    },
    plugins: [createPersistedState({
        paths: ['isLoggedIn', 'darkModeEnabled', 'playerId', "team", "localMultiplayerFEN", "singlePlayerFEN"], 
        storage: window.sessionStorage
    })]
});

export default store;