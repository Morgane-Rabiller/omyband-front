import { defineStore } from "pinia";
import axios from "axios";
import cookiesStorage from "@/services/cookie";

export const authStore = defineStore({
    id: "",
    state: () => ({
        user: {
            email: "",
        },
        users: [],
        departments: [],
        announcements: [],
        jwToken: cookiesStorage.getItem("accessToken") || null,
    }),
    actions: {
        init() {
            const storedToken = cookiesStorage.getItem("accessToken");
            if (storedToken) {
                this.jwToken = storedToken;
                this.setAuthHeaders(storedToken);
            }
        },
        async fetchAnnouncements(payload) {
            payload.page = payload.page ? payload.page : 1;
            payload.limit = payload.limit ? payload.limit : 5;
            payload.styles = payload.styles ? payload.styles : "";
            try {
                const response = await axios.get(
                    `http://mathgiraud-server.eddi.cloud:8080/announcements?page=${payload.page}&limit=${payload.limit}&styles=${payload.styles}`
                );
                this.announcements = response.data;
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
                const response = await axios.post(
                    "http://mathgiraud-server.eddi.cloud:8080/login",
                    {
                        email,
                        password,
                    }
                );
                this.jwToken = response.data.accessToken;
                cookiesStorage.setItem(
                    "accessToken",
                    response.data.accessToken
                );
                this.user = {
                    email: email,
                };
                return response;
            } catch (error) {
                console.error("Erreur De tes morts", error);
                const wrongmail = "Email ou mot de passe incorrect";
                console.log("Email ou mot de passe incorrect");
                return wrongmail;
            }
        },
        async logoutUser() {
            try {
                this.jwToken = null;
                cookiesStorage.removeItem("accessToken");

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
            description
        ) {
            try {
                const response = await axios.post(
                    "http://mathgiraud-server.eddi.cloud:8080/users",
                    {
                        pseudo,
                        email,
                        password,
                        avatar,
                        location,
                        description,
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
                    });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchProfil(token) {
            try {
                const response = await axios.get(
                    "http://mathgiraud-server.eddi.cloud:8080/users/profil",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.error(error, "Le profil n'est pas récupéré");
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
                    "http://mathgiraud-server.eddi.cloud:8080/announcements",
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
                if (response.data) {
                    this.announcements.push({
                        title: response.data.announcement.title,
                        user_type: response.data.announcement.user_type,
                        research_type: response.data.announcement.research_type,
                        description: response.data.announcement.description,
                        styles: [response.data.announcement.styles],
                        instruments: [response.data.announcement.instruments],
                    });
                }
                console.log(response.data);
            } catch (error) {
                console.error(error, "annonce non crée");
            }
        },
        async fetchTypes(token) {
            try {
                const response = await axios.get(
                    "http://mathgiraud-server.eddi.cloud:8080/types",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.error(error, "types non récupérés");
            }
        },
        async fetchInstruments(token) {
            try {
                const response = await axios.get(
                    "http://mathgiraud-server.eddi.cloud:8080/instruments",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.error(error, "instruments non récupérés");
            }
        },
        async fetchStyles(token) {
            try {
                const response = await axios.get(
                    "http://mathgiraud-server.eddi.cloud:8080/styles",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.error(error, "instruments non récupérés");
            }
        },
    },
});
