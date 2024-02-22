import { defineStore } from "pinia";
import axios from "axios";
import cookiesStorage from "@/services/cookie";

export const contactStore = defineStore('contactStore', {
    id: "",
    state: () => ({
        // jwToken: cookiesStorage.getItem() || null,
    }),
    actions: {
        async contactAnnouncement(announcement_id, subject, text) {
            try {
                const token = cookiesStorage.getItem();
                const response = await axios.post(
                    "http://localhost:8080/contactAnnouncement",
                    {
                        announcement_id,
                        subject,
                        text,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                );
                return response;
            } catch (error) {
                console.error(error, "Le message n'est pas envoyé");
                throw error;
            }
        },
        async contactAdmin(subject, text) {
            try {
                const response = await axios.post(
                    "http://localhost:8080/contactAdmin",
                    {
                        subject,
                        text,
                    },
                );
                return response;
            } catch (error) {
                console.error(error, "Le message n'est pas envoyé");
                throw error;
            }
        },
    },
});
