import { mount } from '@vue/test-utils'
import ConnectionComponent from '../components/ConnectionComponent.vue';

describe('ConnectionComponent', () => {
    it('affichage du composant avec les champs de connexion', () => {
        const wrapper = mount(ConnectionComponent);
        expect(wrapper.exists()).toBe(true);
    })
});