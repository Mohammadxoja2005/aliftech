import axios from 'axios';

const state = {
    quotes: []
}

const mutations = {
    SET_POSTS(state: any, payload: any) {
        state.quotes = payload;
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
    }
}

const getters = {
    getPosts: (state: any) => state
}

export default {
    state,
    getters,
    mutations,
    actions,
};