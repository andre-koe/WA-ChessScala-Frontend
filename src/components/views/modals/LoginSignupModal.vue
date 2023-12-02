<template>
    <div :class="[]">
        <div v-if="showLogin" :class="['flex flex-col min-w-[40%] items-center justify-center']">
            <form @submit.prevent="handleLogin">
                <div class="space-y-3">
                    <h1 class="text-2xl font-bold text-center">Sign in</h1>
                    <div class="flex items-center justify-between pt-4">
                        <hr class="w-full bg-gray-300">
                        <p class="px-3 text-sm">WITH</p>
                        <hr class="w-full bg-gray-300">
                    </div>
                    <div class="flex flex-col space-y-3">
                        <div class="floating-label">
                            <input type="email" placeholder=" " id="email" v-model="loginEmail"
                                :class="[inputFieldClasses]">
                            <label for="email">Email</label>
                        </div>
                        <div class="floating-label">
                            <input type="password" placeholder=" " id="password" v-model="loginPassword"
                                :class="[inputFieldClasses]">
                            <label for="password">Password</label>
                        </div>
                        <button
                            class="w-full px-4 py-2 text-white bg-blue-600 max-w-[60%] self-center rounded hover:bg-blue-700">Sign
                            in</button>
                    </div>
                    <div class="flex items-center justify-between pt-4">
                        <hr class="w-full bg-gray-300">
                        <p class="px-3 text-sm">OR</p>
                        <hr class="w-full bg-gray-300">
                    </div>
                    <div class="flex items-center content-center justify-center gap-10">
                        <div
                            class="rounded-lg bg-red-500 hover:bg-red-600 p-2 w-10 h-10 flex justify-center items-center cursor-pointer">
                            <font-awesome-icon :icon="['fab', 'google']" class="text-white text-lg"/>
                        </div>
                        <div
                            class="rounded-lg bg-gray-800 hover:bg-gray-900 p-2 w-10 h-10 flex justify-center items-center cursor-pointer">
                            <font-awesome-icon :icon="['fab', 'github']" class="text-white text-lg"/>
                        </div>
                        <div
                            class="rounded-lg bg-blue-500 hover:bg-blue-600 p-2 w-10 h-10 flex justify-center items-center cursor-pointer">
                            <font-awesome-icon :icon="['fab', 'discord']" class="text-white text-lg"/>
                        </div>
                    </div>
                    <p class="text-sm text-center">Noch kein Konto? <a href="#"
                            class="text-blue-600 hover:underline"><button @click="toggleForm">Registrieren</button></a></p>
                </div>
            </form>
        </div>
        <div v-else :class="['flex flex-col min-w-[40%] items-center justify-center']">
            <form @submit.prevent="handleRegister">
                <div class="space-y-3">
                    <h1 class="text-2xl font-bold text-center">Registrieren</h1>
                    <div class="flex flex-col space-y-3">
                        <div class="floating-label">
                            <input type="text" placeholder="" id="username" v-model="username" :class="[inputFieldClasses]">
                            <label for="username">Username</label>
                        </div>
                        <div class="floating-label">
                            <input type="email" placeholder=" " id="email" v-model="loginEmail"
                                :class="[inputFieldClasses]">
                            <label for="email">Email</label>
                        </div>
                        <div class="floating-label">
                            <input type="password" placeholder=" " id="password" v-model="loginPassword"
                                :class="[inputFieldClasses]">
                            <label for="password">Password</label>
                        </div>
                        <button class="px-4 py-2 text-white bg-blue-600 rounded max-w-[60%] self-center hover:bg-blue-700">Registrieren</button>
                    </div>
                    <div class="flex items-center justify-between pt-4">
                        <hr class="w-full bg-gray-300">
                        <p class="px-3 text-sm">OR</p>
                        <hr class="w-full bg-gray-300">
                    </div>
                    <div class="flex items-center content-center justify-center gap-10">
                    </div>
                    <p class="text-sm text-center">Schon ein Konto? <a href="#" class="text-blue-600 hover:underline"><button @click="toggleForm">Anmelden</button></a></p>
                </div>
            </form>
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
            showLogin: true,
            loginEmail: '',
            loginPassword: '',
            signupEmail: '',
            signupPassword: ''
        };
    },
    computed: {
        darkModeEnabled() {
            return this.$store.state.darkModeEnabled;
        },
        inputFieldClasses() {
            return `${this.darkModeEnabled ? 'bg-slate-600' : ''} w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`
        }
    },
    methods: {
        toggleForm(event) {
            event.stopPropagation();
            this.showLogin = !this.showLogin;
        },
        handleLogin(event) {
            event.stopPropagation();
            console.log('Login mit:', this.loginEmail, this.loginPassword);
        },
        handleSignup(event) {
            event.stopPropagation();
            console.log('Registrierung mit:', this.signupEmail, this.signupPassword);
        },
        close() {
            this.$emit('close');
        }
    }
};
</script>
  

  