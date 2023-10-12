<template>
    <div class="container flex flex-column align-items-center mb-8">
        <h2>Publier mon annonce</h2>
        <span class="flex flex-column">
            <label for="title" class="mb-1">Titre de l'annonce*</label>
            <InputText id="title" v-model="titleValue" class="w-20rem md:w-30rem" placeholder="Recherche guitariste amateur"/>
        </span>

        <div class="card mt-4 flex flex-column">
            <label for="type" class="mb-1">Je suis :*</label>
            <Dropdown id="type" v-model="selectedType" :options="types" optionLabel="name" placeholder="Sélectionne ton rôle" class="w-20rem md:w-30rem"/>
        </div>
        <!-- Si l'utilisateur sélectionne groupe en premier, il cherchera automatiquement un mucisien donc ce second dropdown diparaîtra-->
        <div class="card mt-4 flex flex-column">
            <label for="type" class="mb-1">Je cherche :*</label>
            <Dropdown id="type" v-model="selectedSearch" :options="types" optionLabel="name" placeholder="Sélectionne ce que tu cherches" class="w-20rem md:w-30rem"/>
        </div>
        <!-- Si l'utilisateur est un musicien qui cherche un groupe, donc il ne recherchera pas de musicien en particulier, donc ce 3ème dropdown diparaîtra -->
        <div class="card mt-4 flex flex-column">
            <label for="type" class="mb-1">Instrument recherché :*</label>
            <Dropdown id="type" v-model="selectedSearch" :options="instruments" optionLabel="name" placeholder="Sélectionne ce que tu cherches" class="w-20rem md:w-30rem"/>
        </div>
        <div class="card mt-4 flex flex-column">
            <label for="style">Mon/Mes style(s)</label>
            <MultiSelect id="style" v-model="selectedCities" display="chip" :options="styles" optionLabel="name" placeholder="Sélectionne un ou plusieurs style(s)"
                :maxSelectedLabels="3" class="w-20rem md:w-30rem" />
        </div>
        
        <div class="card mt-4 flex flex-column">
            <label for="description" class="mb-1">Description</label>
            <Textarea id="description" v-model="descValue" autoResize rows="5" cols="45" class="w-20rem md:w-30rem" placeholder="Décris ta recherche en détail, ton style si il n'est pas présent dans la liste ci-dessus, des exemple de références de morceaux, etc.."/>
        </div>
    
        <Button label="Poster l'annonce" icon="pi pi-send" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            titleValue: null,
            descValue: '',
            selectedType: null,
            selectedSearch: null,
            selectedCities: null,
            types: [
                { name: 'Musicien(ne)/chanteur(euse)', code: 'NY' },
                { name: 'Groupe', code: 'RM' },
            ],
            instruments: [
                { name: 'Voix', code: '1'},
                { name: 'Piano', code: '2'},
                { name: 'Guitare', code: '3'},
                { name: 'Basse', code: '4'},
                { name: 'Batterie', code: '5'},
            ],
            styles: [
                { name: 'Rock', code: '1' },
                { name: 'Métal', code: '2' },
                { name: 'Punk', code: '3' },
                { name: 'Jazz', code: '4' },
                { name: 'Pop', code: '5' }
            ]
        };
    },
};
</script>
