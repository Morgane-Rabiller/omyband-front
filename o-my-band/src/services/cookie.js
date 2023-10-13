import Cookies from 'js-cookie';

const cookiesStorage = {
    setItem(name, token) {
        console.log('testi');
        Cookies.set(name, token, {expires: 3});
        console.log('testo');
    },
    getItem() {
        return Cookies.get('accessToken');
    },
    removeItem() {
        Cookies.remove('accessToken');
    }
};

export default cookiesStorage;