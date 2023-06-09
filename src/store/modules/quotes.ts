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
    authors: [],
    randomQuotes: []
}

const mutations = {
    SET_QUOTES(state: any, payload: any) {
        state.quotes = payload;
    },

    SET_AUTHORS(state: any, payload: any) {
        state.authors = payload;
    },

    SET_RANDOM_QUOTES(state: any, payload: any) {
        state.randomQuotes = payload;
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

    async updateQuote({ commit }: any, quote: { id: number, author: string, quote: string, genre: string, updatedAt: string }) {

        try {
            await axios.put(`https://aliftech-backend.onrender.com/quotes/${quote.id}`, quote)
                .then((response: any) => {
                    console.log(response.data);
                })
        } catch (error) {
            console.log(error);
        }
    },

    async deleteQuote({ commit }: any, id: number) {
        try {
            await axios.delete(`https://aliftech-backend.onrender.com/quotes/${id}`)
        } catch (error) {
            console.log(error);
        }
    },

    async getAuthors({ commit }: any) {
        const authors: Array<string> = [];

        try {
            await axios.get('https://aliftech-backend.onrender.com/quotes')
                .then((response) => {
                    response.data.forEach((element: { author: string }) => {
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
    },

    async generateRandomQuote({ commit }: any) {
        try {
            await axios.get('https://aliftech-backend.onrender.com/quotes')
                .then((response) => {
                    const randomIndex = Math.round(Math.random() * (response.data.length - 1));
                    // console.log(response.data[randomIndex]);
                    commit('SET_RANDOM_QUOTES', response.data[randomIndex]);
                })
        } catch (error) {
            console.log(error);
        }
    }
}

const getters = {
    getQuotes: (state: any) => state.quotes,
    getGenres: (state: any) => state.genres,
    getAuthors: (state: any) => state.authors,
    getRandomQuotes: (state: any) => state.randomQuotes
}

export default {
    state,
    getters,
    mutations,
    actions,
};

// "ignoreDeprecations": "5.0",
// "verbatimModuleSyntax": true,