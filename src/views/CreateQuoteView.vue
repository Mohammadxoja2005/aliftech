<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from "axios";

const now = new Date();
const date: string = now.toISOString().slice(0, 19).replace('T', ' ');

const genres = ref<Array<string>>(['Inspirational', 'Motivational', 'Philosophical', 'Funny', 'Romantic', 'Political', 'Religious/Spiritual', 'Life Lessons'])

const selectedGenre = ref<string>('');
const quote = ref<string>('');
const author = ref<string>('');

// const url = ref(process.env.VUE_APP_BACKEND_URL)

const onSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData()

    formData.append('author', author.value);
    formData.append('quote', quote.value);
    formData.append("genre", selectedGenre.value);
    formData.append("createdAt", date);
    formData.append("updatedAt", date);


    axios.post('http://localhost:3000/quotes', )
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
