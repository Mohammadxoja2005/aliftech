<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();

// Accessing module state
// const users = computed(() => store.state.quotes.quotes);
// console.log(users.value);

// Accessing the module getters
// const getUsers = computed(() => store.getters.getUsers);

// console.log(getUsers.value.quotes);

// Accessing the module getters
// const getUsers = computed(() => store.getters['quotes']);
//  const getIsLoading = computed(() => store.getters['data/getIsLoading']);
// console.log(getUsers)

// Accessing the module actions
// const fetchUsers = () => store.dispatch('');

// console.log(fetchUsers);

const now = new Date();
const date: string = now.toISOString().slice(0, 19).replace('T', ' ');

const genres = computed(() => store.getters.getGenres);
const selectedGenre = ref<string>('');
const quote = ref<string>('');
const author = ref<string>('');

const onSubmit = (event: any): void => {
    event.preventDefault();

    store.dispatch('createQuote', {
        author: author.value,
        quote: quote.value,
        genre: selectedGenre.value,
        createdAt: date,
        updatedAt: date
    })
}

</script>

<template>
    <form>
        <input type="text" v-model="quote" placeholder="тескт цитаты">
        <input type="text" v-model="author" placeholder="автор цитаты">

        <select v-model="selectedGenre" name="" id="">
            <option disabled value="">Выбирете один жанр</option>

            <option v-for="(item) in genres" :value="item">
                {{ item }}
            </option>
        </select>
        <button @click="onSubmit($event)">create quote</button>
    </form>
</template>

<style scoped></style>
