import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleUser, faHouse, faInfoCircle, faMessage, faPlayCircle, faTableList, faLightbulb, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as rfaLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons';
import App from './components/App.vue';
import store from './store';
import tooltip from './directives/tooltip';
import './styles/styles.scss';


library.add(faHouse, faPlayCircle, faInfoCircle, faCircleUser, faMessage, faTableList, faLightbulb, rfaLightbulb, faRightToBracket, faDiscord, faGithub, faGoogle);

const main = createApp(App);

main.use(store);

main.config.compilerOptions.isCustomElement = tag => ['box-component', 'branding-component'].includes(tag);
main.directive('tooltip', tooltip);
main.component('font-awesome-icon', FontAwesomeIcon);

main.mount("#app");
