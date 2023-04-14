<script setup lang="ts">
import { computed, watch, reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const authors = reactive([]);
const genres = computed(() => store.getters.getGenres);

const selectedGenre = ref<string>('');
const selectedAuthor = ref<string>('');


store.dispatch('getAuthors')
    .then(() => {
        authors.push(...store.getters.getAuthors)
    })

const onCheck = (event) => {
    event.preventDefault();
    console.log(authors.value);
    store.dispatch('getAuthors');
}

</script>

<template>
    <form>
        <div>

            <div>
                <input type="text">
                <button @click="onCheck($event)">search</button>
            </div>

            <div>
                <input type="radio" name="filter" value="all">
                <label for="genre">All</label>
                <input type="radio" name="filter" value="genre">
                <label for="genre">Quote</label>
                <input type="radio" name="filter" value="author">
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

        </div>

    </form>
</template>

<style scoped></style>
