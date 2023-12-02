import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleUser, faHouse, faInfoCircle, faMessage, faPlayCircle, faTableList, faLightbulb, faRightToBracket, faChessKnight, faChessQueen, faChessBishop, faChessRook } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as rfaLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons';
import App from './components/App.vue';
import store from './store';
import tooltip from './directives/tooltip';
import './assets/styles/styles.scss';
import './components/html-components/BoxBackgroundComponent';



library.add(faHouse, faPlayCircle, faInfoCircle, faCircleUser, faMessage, faTableList,
    faLightbulb, rfaLightbulb, faRightToBracket, faDiscord, faGithub, faGoogle, faChessKnight, faChessBishop, faChessQueen, faChessRook);

const app = createApp(App).use(store).directive('tooltip', tooltip).component('font-awesome-icon', FontAwesomeIcon);

app.config.compilerOptions.isCustomElement = tag => tag === 'box-component';
app.mount("#app");
