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
        departments: [],
        announcements: [],
        jwToken: null,
    }),
    actions: {
        async fetchAnnouncements() {
            try {
                const response = await axios.get('http://robinho54-server.eddi.cloud:8080/announcements');
                this.announcements = response.data;
                console.log(this.announcements);
                return this.announcements;
            } catch (error) {
                console.error('Erreur lors de la récupération des annonces', error);
            }
        },
        async loginUser(email, password) {
            try {
                const response = await axios.post('http://robinho54-server.eddi.cloud:8080/login', {
                    email,
                    password,
                })
                    this.jwToken = response.data.accessToken;
                    this.user = response;
                    return this.user;
            } catch (error) {
                console.error('Erreur De tes morts', error);
                const wrongmail = 'Email ou mot de passe incorrect';
                console.log("Email ou mot de passe incorrect");
                return wrongmail;
            }
            
        },
        async setAuthHeaders(token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        async registerUser(pseudo, email, password, avatar, location, description) {
            try {
                const response = await axios.post("http://robinho54-server.eddi.cloud:8080/users", {
                    pseudo, 
                    email,
                    password,
                    avatar,
                    location,
                    description,
                }, { headers: {
                    'Content-Type': 'application/json',
                }})
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
                console.error(error);
            }
        }
    }
})