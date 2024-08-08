// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const form = event.target;
  const delayInput = form.querySelector('input[name="delay"]');
  const delay = form.querySelector('input[name="delay"]').value;
  const state = form.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    //* resolve - фукнція, яка переведе проміс у стан Fullfilled
    //* reject - функція, яка переведе проміс у стан Rejected
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        messageSize: '16',
        backgroundColor: 'green',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: 'white',
        messageSize: '16',
        backgroundColor: 'red',
        position: 'topRight',
      });
    });

  const radioBtnDeact = form.querySelectorAll('input[name="state"]');

  radioBtnDeact.forEach(radio => {
    radio.checked = false;
  });

  delayInput.value = '';
});
