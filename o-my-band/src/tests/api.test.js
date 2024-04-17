import { mount } from '@vue/test-utils';
import RegistrationComponent from "../components/RegistrationComponent.vue";

describe("Number data of api gouv", () => {
    it('api gouv', async () => {
        const wrapper = mount(RegistrationComponent);

    // Attend que les données soient chargées (si l'appel à axios est asynchrone)
    await wrapper.vm.$nextTick();

    // Accéder à la propriété department du composant
    const department = wrapper.vm.$data.department;

    // Vérifier la longueur de la propriété department
    expect(department).toHaveLength(101); // Remplacez avec la longueur attendue

    // Autre exemple de test pour vérifier que la propriété department est un tableau
    expect(Array.isArray(department)).toBe(true);

    })
})