import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formPromises = document.querySelector('.form');

formPromises.addEventListener('submit', event => {
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;

    createPromise(delay, state)
        .then((delay) => {
            iziToast.success({
                titleSize: '16px',
                titleLineHeight: 1.5,
                title: 'OK',
                message: `✅ Fulfilled promise in ${delay}ms`,
                messageColor: '#fff',
                messageSize: '16px',
                messageLineHeight: 1.5,
                backgroundColor: '#59a10d',
                position: 'topRight',
                theme: 'dark',
                closeOnEscape: true,
                transitionIn: 'bounceInDown'
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: 'Error',
                titleSize: '16px',
                titleLineHeight: 1.5,
                message: `❌ Rejected promise in ${delay}ms`,
                messageColor: '#fff',
                messageSize: '16px',
                messageLineHeight: 1.5,
                backgroundColor: '#EF4040',
                iconColor: '#fff',
                position: 'topRight',
                theme: 'dark',
                closeOnEscape: true,
                transitionIn: 'bounceInDown',
                transitionOut: 'fadeOutUp',
            });
        });
});

function createPromise(delay, state) {
    return new Promise((resolveConfig, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolveConfig(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}