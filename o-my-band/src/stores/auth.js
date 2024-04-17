import { defineStore } from "pinia";
import axios from "axios";
import cookiesStorage from "@/services/cookie";
import router from "@/router";

export const authStore = defineStore("authStore", {
    id: "",
    state: () => ({
        user: {
            email: "",
        },
        users: [],
        departments: [],
        announcements: [],
        // jwToken: cookiesStorage.getItem() || null,
        url: "http://localhost:8080/",
    }),
    actions: {
        init() {
            const storedToken = cookiesStorage.getItem();
            if (storedToken) {
                // this.jwToken = storedToken;
                this.setAuthHeaders(storedToken);
            }
        },
        async fetchAnnouncements(payload) {
            payload.page = payload.page ? payload.page : 1;
            payload.limit = payload.limit ? payload.limit : 5;
            payload.styles = payload.styles ? payload.styles : "";
            payload.instruments = payload.instruments
                ? payload.instruments
                : "";
            payload.userLocation = payload.userLocation
                ? payload.userLocation
                : "";
            try {
                const response = await axios.get(
                    `${this.url}announcements?page=${payload.page}&limit=${payload.limit}&styles=${payload.styles}&instruments=${payload.instruments}&userLocation=${payload.userLocation}`
                );
                this.announcements = response.data;
                localStorage.setItem(
                    "announcements",
                    JSON.stringify(response.data)
                );
                console.log(this.announcements);
                return this.announcements;
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des annonces",
                    error
                );
            }
        },
        async loginUser(email, password) {
            const response = await axios.post(`${this.url}login`, {
                email,
                password,
            });
            if (email) {
                cookiesStorage.setItem(
                    "accessToken",
                    response.data.accessToken
                );
                this.user.email = email;
            }
            return response;
        },
        async forgotPassword(email) {
            const response = await axios.post(`${this.url}forgotPassword`, {
                email,
            });
            console.log(response);
        },
        async newPasswordIfForgot(id, password) {
            const response = await axios.put(
                `${this.url}updatePassword/${id}`,
                { password }
            );
            console.log(response);
            console.log(id);
        },
        async logoutUser() {
            try {
                // this.jwToken = null;
                cookiesStorage.removeItem();

                this.user = {};

                delete axios.defaults.headers.common["Authorization"];
            } catch (error) {
                console.error(error, "La déconnexion a échouée");
            }
        },
        async setAuthHeaders(token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        },
        async registerUser(
            pseudo,
            email,
            password,
            passwordRepeat,
            avatar,
            location,
            description,
            instruments
        ) {
            const response = await axios.post(
                `${this.url}users`,
                {
                    pseudo,
                    email,
                    password,
                    passwordRepeat,
                    avatar,
                    location,
                    description,
                    instruments,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response;
        },
        async fetchProfil(token) {
            try {
                const response = await axios.get(`${this.url}users/profil`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                console.error(error, "Le profil n'est pas récupéré");
                router.push({ name: "home" });
            }
        },
        async createAnnouncement(
            title,
            user_type,
            research_type,
            description,
            styles,
            instruments,
            token
        ) {
            const response = await axios.post(
                `${this.url}announcements`,
                {
                    title,
                    user_type,
                    research_type,
                    description,
                    styles,
                    instruments,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response;
        },
        async setAnnouncement(id, data) {
            const response = axios.put(`${this.url}announcements/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${cookiesStorage.getItem()}`,
                },
            });
            return response;
        },
        async deleteAnnouncement(id) {
            const response = axios.delete(`${this.url}announcements/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookiesStorage.getItem()}`,
                },
            });
            return response;
        },
        async setProfil(id, token, data) {
            const response = axios.put(`${this.url}users/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        },
        async deleteProfil(id, token) {
            const response = axios.delete(`${this.url}users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        },
        async setPassword(id, token, data) {
            const response = axios.put(
                `${this.url}users/changePassword/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response;
        },
        async fetchTypes(token) {
            try {
                const response = await axios.get(`${this.url}types`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                console.error(error, "types non récupérés");
                if (error.response.status === 401) {
                    router.push({ name: "home" });
                }
            }
        },
        async fetchInstruments() {
            try {
                const response = await axios.get(`${this.url}instruments`);
                return response.data;
            } catch (error) {
                console.error(error, "instruments non récupérés");
            }
        },
        async fetchStyles(token) {
            try {
                const response = await axios.get(`${this.url}styles`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                console.error(error, "instruments non récupérés");
            }
        },
    },
    getters: {
        // Getter permettant de récupérer une annonce de la liste à partir de son id
        getAnnouncementByID: (state) => (id) => {
            state.announcements = JSON.parse(
                localStorage.getItem("announcements")
            );
            return state.announcements.data.find(
                (announcement) => announcement.announcement_id === Number(id)
            );
        },
        getFetchProfil: (state) => async () => {
            const currentUser = await state.fetchProfil(
                cookiesStorage.getItem()
            );
            state.user = currentUser;
            return currentUser;
        },
    },
});
