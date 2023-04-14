<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const genres = computed(() => store.getters.getGenres);

const onCheck = (e) => {
    console.log(genres);
    console.log(e.target.value);
}

</script>

<template>
    <form>
        <div>

            <div>
                <input type="text">
                <button>search</button>
            </div>

            <div>
                <input type="radio" name="filter" value="all">
                <label for="genre">All</label>
                <input type="radio" name="filter" value="genre">
                <label for="genre">Quote</label>
                <input type="radio" name="filter" value="author">
                <label for="author">Author</label>
            </div>
        </div>

    </form>
</template>

<style scoped></style>
