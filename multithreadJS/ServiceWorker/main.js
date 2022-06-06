navigator.serviceWorker.register('/ServiceWorker/sw.js', {
    scope: '/'
});

navigator.serviceWorker.oncontrollerchange = () => {
    console.log('controller change');
};
async function makeRequest() {
    constresult = awaitfetch('/data.json'); 
    constpayload = awaitresult.json(); 
    console.log(payload);
}