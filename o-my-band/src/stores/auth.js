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
            try {
                    const response = await axios.post(`${this.url}login`, {
                        email,
                        password,
                    });
                    // this.jwToken = response.data.accessToken;
                    cookiesStorage.setItem(
                        "accessToken",
                        response.data.accessToken
                    );
                    this.user.email = email;
                    return response;
            } catch (error) {
                console.error("Erreur De tes morts", error);
                const wrongmail = "Email ou mot de passe incorrect";
                console.log("Email ou mot de passe incorrect");
                return wrongmail;
            }
        },
        async forgotPassword(email) {
            const response = await axios.post(`${this.url}forgotPassword`, { email });
            console.log(response);
        },
        async newPassword(id, password) {
            const response = await axios.put(`${this.url}updatePassword/${id}`, { password });
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
            avatar,
            location,
            description,
            instruments
        ) {
            try {
                const response = await axios.post(
                    `${this.url}users`,
                    {
                        pseudo,
                        email,
                        password,
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
                if (response.data)
                    this.users.push({
                        pseudo: response.data.pseudo,
                        password: response.data.password,
                        email: response.data.email,
                        location: response.data.location,
                        avatar: response.data.avatar,
                        description: response.data.description,
                        instruments: response.data.instruments,
                    });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
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
            try {
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
                // console.log(typeof this.announcements);
                // if (response.data) {
                //     this.announcements.push({
                //         title: response.data.announcement.title,
                //         user_type: response.data.announcement.user_type,
                //         research_type: response.data.announcement.research_type,
                //         description: response.data.announcement.description,
                //         styles: [response.data.announcement.styles],
                //         instruments: [response.data.announcement.instruments],
                //     });
                // }
                console.log(response.data);
            } catch (error) {
                console.error(error, "annonce non crée");
            }
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
            const currentUser = await state.fetchProfil(cookiesStorage.getItem());
            state.user = currentUser;
            return currentUser;
        }
    },
});
