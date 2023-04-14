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
    SET_POSTS(state: any, payload: any) {
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

    async getQuotes({ commit }: any, quotes: { author: string, quote: string, genre: string, createdAt: string, updatedAt: string }) {
        console.log(quotes);
        // try {
        //     await axios.post('https://aliftech-backend.onrender.com/quotes', quotes)
        //         .then((response: any) => {
        //             console.log(response);
        //         })
        // } catch (error) {
        //     console.log(error);
        // }
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
    getPosts: (state: any) => state.quotes,
    getGenres: (state: any) => state.genres,
    getAuthors: (state: any) => state.authors
}

export default {
    state,
    getters,
    mutations,
    actions,
};