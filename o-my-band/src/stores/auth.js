import { defineStore } from 'pinia';
import axios from 'axios';

export const authStore = defineStore({
    id: '',
    state: () => ({
        user: {
            email : "",
            password : "",
        },
        users: [],
        departments: []
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
                console.error('Erreur De tes morts');
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
                if(response.data)
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
        async getDepartements() {
            try {
            const response = await axios.get("https://happyapi.fr/api/getDeps");
            const datas = response.data.result.result;
            let newData = datas.map((data) => {
                return {
                name: data.dep_name,
                code: data.num_dep
            }
            });
            return newData;
            } catch(error) {
                console.error("Données non récupérées");
            }
        }
    }
})