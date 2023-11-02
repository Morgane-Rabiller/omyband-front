import { defineStore } from "pinia";
import axios from "axios";
import cookiesStorage from "@/services/cookie";

export const contactStore = defineStore('contactStore', {
    id: "",
    state: () => ({
        jwToken: cookiesStorage.getItem("accessToken") || null,
    }),
    actions: {
        async contactAnnouncement(announcement_id, subject, text) {
            try {
                const token = this.jwToken;
                const response = await axios.post(
                    "http://mathgiraud-server.eddi.cloud:8080/contactAnnouncement",
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
    },
});
