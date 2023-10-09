import { defineStore } from 'pinia';
import axios from 'axios';

export const authStore = defineStore({
    id: '',
    state: () => ({
        user: {
            email : "",
            password : "",
        },
        users: []
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
            
        },
        async registerUser(pseudo, email, password, avatar, location, description) {
            try {
                const response = await axios.post("http://robinho54-server.eddi.cloud:8080/users", {
                    pseudo, 
                    email,
                    password,
                    avatar,
                    location,
                    description
                })
                this.users.push({
                    pseudo: response.data.pseudo,
                    password: response.data.password,
                    email: response.data.email,
                    location: response.data.location,
                    avatar: response.data.avatar,
                    description: response.data.description,
                })
                console.log(response);
            } catch(error) {
                console.error('Erreur de tes grands morts')
            }
        }
    },
    getters: {

    }
})