<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router'
import { useStore } from "vuex";
import axios from "axios";

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

const store = useStore();

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
    }).then(() => {
        window.location.reload();
    })
}

</script>
<template>
    <form>
        <div class="form-container">
            <div class="input-container">
                <label for="quote">Текст цитаты:</label>
                <input type="text" v-model="quote" id="quote" placeholder="Введите текст цитаты">
            </div>
            <div class="input-container">
                <label for="author">Автор цитаты:</label>
                <input type="text" v-model="author" id="author" placeholder="Введите автора цитаты">
            </div>

            <div class="input-container">
                <label for="genre">Жанр:</label>
                <select v-model="selectedGenre" id="genre">
                    <option disabled value="">Выберите один жанр</option>
                    <option v-for="(item) in genres" :value="item">{{ item }}</option>
                </select>
            </div>

            <button @click="onSubmit($event)">Создать цитату</button>
            <router-link to="/" class=""><button>Go to Home</button></router-link>
        </div>
    </form>
</template>
  
<style scoped> .form-container {
     display: flex;
     flex-direction: column;
     align-items: center;
     gap: 20px;
 }

 .input-container {
     display: flex;
     flex-direction: column;
     margin-bottom: 1rem;
     width: 100%;
     max-width: 500px;
 }

 label {
     margin-bottom: 0.5rem;
     font-weight: bold;
 }

 input,
 select {
     padding: 0.5rem;
     font-size: 1rem;
     border: 1px solid #ccc;
     border-radius: 5px;
     width: 100%;
     box-sizing: border-box;
 }

 button {
     background-color: #007bff;
     color: #fff;
     padding: 0.5rem 1rem;
     border-radius: 5px;
     border: none;
     font-size: 1rem;
     cursor: pointer;
     transition: background-color 0.2s ease-in-out;
 }

 button:hover {
     background-color: #0062cc;
 }

 @media screen and (min-width: 768px) {
     form {
         flex-direction: row;
         justify-content: center;
         align-items: flex-start;
         flex-wrap: wrap;
     }

     .input-container {
         margin-right: 1rem;
         margin-bottom: 0;
         width: 33.33%;
     }

     button {
         width: 100%;
         max-width: 150px;
     }
 }
</style>


