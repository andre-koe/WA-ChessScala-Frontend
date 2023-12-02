<script setup>
</script>
<template>
    <div @click="toggleThemeSwitch" v-tooltip="{ text: 'Toggle Light/Dark - Mode', position: 'right' }" class="z-10 absolute place-self-end top-10 right-10 p-2">
        <div v-if="darkModeEnabled">
            <font-awesome-icon :icon="['far', 'lightbulb']" id="themetoggle"
                class="text-white drop-shadow-icon sm:text-xl md:text-3xl 2xl:text-5xl hover:scale-110 hover:cursor-pointer relative hover:drop-shadow-icon-bulb z-10" />
        </div>
        <div v-else>
            <font-awesome-icon :icon="['far', 'lightbulb']" id="themetoggle"
                class="fa-solid fa-lightbulb text-gray-800 drop-shadow-icon sm:text-xl md:text-3xl 2xl:text-5xl hover:scale-110 hover:cursor-pointer hover:drop-shadow-icon-dark relative hover:cursor-pointer hover:drop-shadow-icon-dark z-40" />
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        darkModeEnabled() {
            return this.$store.state.darkModeEnabled;
        }
    },
    methods: {
        toggleThemeSwitch() {
            this.$store.state.darkModeEnabled = !this.$store.state.darkModeEnabled;
        }
    }
}
</script>