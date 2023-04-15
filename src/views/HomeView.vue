<script setup lang="ts">
import { computed, watchEffect, reactive, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const selectedGenre = ref<string>('');
const selectedAuthor = ref<string>('');
const selectedChoice = ref<string>('quote')
const searchInput = ref<string>('');

const authors = reactive([]);
let quotes = reactive([]);
const filteredQuotes = reactive([]);
const genres = computed(() => store.getters.getGenres);

watchEffect(() => {
    store.dispatch('getAuthors')
        .then(() => {
            authors.push(...store.getters.getAuthors)
        })
})

watchEffect(() => {
    store.dispatch('getQuotes')
        .then(() => {
            quotes.push(...store.getters.getQuotes);
            filteredQuotes.push(...store.getters.getQuotes);
        })
})

const searchByChoice = () => {

    switch (selectedChoice.value) {
        case 'quote': {
            quotes = filteredQuotes.filter(item => item.quote.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim()))
        }; break;
        case 'author': {
            quotes = filteredQuotes.filter(item => item.author.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim()))
        }; break;

        default: console.log("nothing worked");
    }

    const filtered = quotes.filter((item) => {
        // Check search text
        const searchTextMatch =
            searchInput.value === '' ||
            item.quote.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            item.author.toLowerCase().includes(searchInput.value.toLowerCase())

        // Check author filter
        const authorFilterMatch =
            selectedAuthor.value === '' || item.author === selectedAuthor.value

        // Check genre filter
        const genreFilterMatch =
            selectedGenre.value === '' || item.genre === selectedGenre.value

        return searchTextMatch && authorFilterMatch && genreFilterMatch
    })

    return filtered;
}

// watch(quotes, (oldValue, newValue) => {
//     console.log(newValue);
// })

const onCheck = (event) => {
    event.preventDefault();

    quotes = searchByChoice();
    console.log(quotes);
}

</script>

<template>
    <form>
        <div>
            <div>
                <input type="text" v-model="searchInput">
                <button @click="onCheck($event)">search</button>
            </div>

            <div>
                <input v-model="selectedChoice" type="radio" name="filter" value="quote">
                <label for="genre">Quote</label>
                <input v-model="selectedChoice" type="radio" name="filter" value="author">
                <label for="author">Author</label>
            </div>

            <div>
                <select v-model="selectedGenre">

                    <option disabled value="">Выбирете жанр</option>

                    <option v-for="(item) in genres" :value="item">{{ item }}</option>

                </select>

                <select v-model="selectedAuthor">

                    <option disabled value="">Выбирете автора</option>

                    <option v-for="(item) in authors" :value="item">{{ item }}</option>

                </select>
            </div>

            <div>
                
            </div>

        </div>

    </form>
</template>

<style scoped></style>
