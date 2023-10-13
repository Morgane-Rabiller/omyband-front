import Cookies from 'js-cookie';

const cookiesStorage = {
    setItem(name, token) {
        Cookies.set(name, token, {expires: 3});
    },
    getItem() {
        return Cookies.get('accessToken');
    },
    removeItem() {
        Cookies.remove('accessToken');
    }
};

export default cookiesStorage;