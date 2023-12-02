<template>
    <div :class="[this.darkModeEnabled ? 'bg-gray-900 text-black' : 'bg-gray-600 text-white', `fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full z-30 backdrop-blur-sm rounded-lg`]">
        <div :class="[`relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center content-center`]">
            <h3 :class="[`font-bold text-3xl tracking-widest uppercase mb-2`]">Promotion</h3>
            <div class="flex justify-space-around">
                <item-card v-for="(item, index) in items" :key="index" :icon="item.icon" :title="item.title"
                    @click="selectPiece(item.id)" :class="[`iconColor hover:cursor-pointer`]" />
            </div>
        </div>
    </div>
</template>
    
<script>
import ItemCard from '../../ui/ItemCard.vue'

export default {
    components: {
        ItemCard
    },
    props: {
        move: String,
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            items: [
                { icon: ['fas', 'chess-knight'], title: 'Knight', id: 'n' },
                { icon: ['fas', 'chess-rook'], title: 'Rook', id: 'r' },
                { icon: ['fas', 'chess-queen'], title: 'Queen', id: 'q' },
                { icon: ['fas', 'chess-bishop'], title: 'Bishop', id: 'b' }
            ],
        };
    },
    computed: {
        isDarkModeEnabled() {
            return this.$store.state.darkModeEnabled;
        },
        iconColor() {
            return `${this.isDarkModeEnabled ? 'text-white' : 'text-black'}`
        }
    },
    methods: {
        selectPiece(pieceID) {
            let event = new CustomEvent('piece-selected', { detail: { move: this.move, pieceID } });
            window.dispatchEvent(event);
            this.$emit('close');
        }
    }
};
</script>
    
<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    padding: 20px;
    margin: auto;
    max-width: 80%;
}

.item-card {
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
}
</style>    