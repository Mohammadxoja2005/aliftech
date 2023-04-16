<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

store.dispatch('generateRandomQuote');
const randomQuote = computed(() => store.getters.getRandomQuotes);

const generateQuote = () => {
  store.dispatch('generateRandomQuote');
  console.log(randomQuote.author);

}

</script> 

<template>
  
  <div class="quote-generator">
    <button @click="generateQuote" class="quote-generator__button">
      Сгенерировать цитату
    </button>

    <div class="card">

      <div class="card-item">
        <div class="card-author">Автор: {{ randomQuote.author }}</div>
        <div class="card-quote">Цитата</div>

        <div class="card-container-updates">
          <div class="card-genre">Genre: </div>
          <div class="card-updated">Last Updated: </div>
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
.quote-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quote-generator__button {
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.quote-generator__button:hover {
  background-color: #0062cc;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 10px;
}

.card-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-author {
  font-weight: bold;
  margin-bottom: 10px;
}

.card-quote {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
}

.card-container-updates {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.card-genre,
.card-updated {
  font-size: 0.8rem;
}

/* @media only screen and (min-width: 768px) {
  .card-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .card-quote {
    margin: 0;
  }
} */
</style>