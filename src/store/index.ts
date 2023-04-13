import { createStore } from 'vuex';
import quotes from './modules/quotes';

const store = createStore({
    state: {
        count: 0
    },

    modules: {
        quotes: quotes
    },

    getters: {
        getDevelopers() {
            return 'state'
        }
    }
});

export default store;