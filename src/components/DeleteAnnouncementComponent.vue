<template>
    <div v-if="visible">
        <p>Es-tu sûr de vouloir supprimer cette annonce ?</p>
        <p class="m-0 p-0 text-red-700">{{ errorMessage }}</p>
        <div class="flex justify-content-around">
            <Button class="mr-5" @click="deleteAnnouncement">Confirmer</Button>
            <Dialog v-model:visible="deletedAnnouncement"
                    modal
                    header="Compte supprimé 🗑">
                <p>Cette annonce a bien été supprimée ! ✔</p>
            </Dialog>
            <Button @click="cancel">Annuler</Button>
        </div>
    </div>
</template>

<script>
import { authStore } from '@/stores/auth';

export default {
    data() {
        return {
            store: authStore(),
            errorMessage: "",
            deletedAnnouncement: false,
        };
    },
    methods: {
        cancel() {
            this.$emit("deletion-cancelled");
        },
        async deleteAnnouncement() {
            try {
                await this.store.deleteAnnouncement(this.announcementId);
                this.deletedAnnouncement = true;
                window.setTimeout(() => {
                    this.$emit("delete-announcement-successfull");
                }, 3000);
            } catch (error) {
                this.errorMessage = error.response.data.message;
            }
        }
    },
    props: {
        announcementId: {
            type: Number,
            required: true,
        },
        visible: {
            type: Boolean,
            required: true,
        }
    },
    emits: ["deletion-cancelled", "delete-announcement-successfull"],
};
</script>
