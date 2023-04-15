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

const searchByChoice = computed(() => {

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
})
console.log(searchByChoice)

</script>

<template>
    <form>
        <div class="form-container">
            <div class="form-inputs">
                <div class="search-input">
                    <input type="text" v-model="searchInput" placeholder="Search...">
                </div>

                <div class="radio-buttons">
                    <label>
                        <input v-model="selectedChoice" type="radio" name="filter" value="quote">
                        Quote
                    </label>

                    <label>
                        <input v-model="selectedChoice" type="radio" name="filter" value="author">
                        Author
                    </label>
                </div>

                <div class="select-inputs">
                    <select v-model="selectedGenre">
                        <option disabled value="">Choose a genre</option>
                        <option v-for="(item) in genres" :value="item">{{ item }}</option>
                    </select>

                    <select v-model="selectedAuthor">
                        <option disabled value="">Choose an author</option>
                        <option v-for="(item) in authors" :value="item">{{ item }}</option>
                    </select>
                </div>
            </div>

            <div class="card-container">
                <div class="card" v-for="(item, index) in searchByChoice" :key="index">
                    <div class="card-author">{{ item.author }}</div>
                    <div class="card-quote">{{ item.quote }}</div>

                    <div class="card-container-updates">
                        <div class="card-genre">Genre: {{ item.genre }}</div>
                        <div class="card-updated">Last Updated: {{ item.updatedAt }}</div>
                    </div>

                    <div class="card-btns">
                        <button class="card-see">See details</button>
                        <button class="card-delete">Delete quote</button>
                        <button class="card-update">Update quote</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
  
<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
}

.search-input {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.search-input input {
    margin-right: 1rem;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.search-input button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #0099ff;
    color: #fff;
    cursor: pointer;
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #0099ff;
    color: #fff;
    cursor: pointer;
}

.radio-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.radio-buttons label {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    font-weight: bold;
}

.radio-buttons input[type="radio"] {
    margin-right: 0.5rem;
}

.select-inputs {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.select-inputs select {
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin-right: 1rem;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
}

.card-container-updates {
    display: flex;
    align-items: center;
    gap: 10px;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0.5rem;
    max-width: 300px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.card-author {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.card-quote {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.card-genre {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.card-updated {
    font-size: 0.8rem;
    color: #999;
}

.card-btns {
    display: flex;
    gap: 10px;
}

.card-delete {
    background-color: red;
}

.card-update {
    background-color: orange;
}
</style>

