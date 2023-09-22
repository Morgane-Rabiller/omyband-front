import { defineStore } from 'pinia';
import axios from 'axios';

export const authStore = defineStore({
    id: '',
    state: () => ({
        user: {
            email : "",
            password : "",
        }
    }),
    actions: {
        async loginUser(email, password) {
            try {
                const user = await axios.post('http://robinho54-server.eddi.cloud:8080/login', {
                    email,
                    password,
                })
                this.user = user;
            } catch (error) {
                console.error('Erreur De tes morts')
            }
            
        }
    },
    getters: {

    }
})