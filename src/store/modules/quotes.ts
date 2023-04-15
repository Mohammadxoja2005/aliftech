import axios from 'axios';

const state = {
    genres: ['Inspirational',
        'Motivational',
        'Philosophical',
        'Funny',
        'Romantic',
        'Political',
        'Religious/Spiritual',
        'Life Lessons'],
    quotes: [],
    authors: []
}

const mutations = {
    SET_QUOTES(state: any, payload: any) {
        state.quotes = payload;
    },

    SET_AUTHORS(state: any, payload: any) {
        state.authors = payload;
    }
}

const actions = {
    async createQuote({ commit }: any, quotes: { author: string, quote: string, genre: string, createdAt: string, updatedAt: string }) {

        try {
            await axios.post('https://aliftech-backend.onrender.com/quotes', quotes)
                .then((response: any) => {
                    console.log(response);
                })
        } catch (error) {
            console.log(error);
        }
    },

    async getQuotes({ commit }: any) {
        try {
            await axios.get('https://aliftech-backend.onrender.com/quotes')
                .then((response: any) => {
                    commit("SET_QUOTES", response.data);
                })
        } catch (error) {
            console.log(error);
        }
    },

    async deleteQuote({ commit }: any, id: number) {
        try {
            await axios.delete(`https://aliftech-backend.onrender.com/quotes/${id}`)
                .then((response: any) => {
                    commit("SET_QUOTES", response.data);
                })
        } catch (error) {
            console.log(error);
        }
    },

    async getAuthors({ commit }: any) {
        const authors = [];

        try {
            await axios.get('https://aliftech-backend.onrender.com/quotes')
                .then((response) => {
                    response.data.forEach(element => {
                        authors.push(element.author)
                    });
                    return authors;
                })
                .then((authors) => {
                    commit('SET_AUTHORS', authors);
                })
        } catch (error) {
            console.log(error);
        }
    }
}

const getters = {
    getQuotes: (state: any) => state.quotes,
    getGenres: (state: any) => state.genres,
    getAuthors: (state: any) => state.authors
}

export default {
    state,
    getters,
    mutations,
    actions,
};