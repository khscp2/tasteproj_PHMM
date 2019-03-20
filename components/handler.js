window.onload = (e) => {
    if(window.innerWidth < 761) patchForPhone();
    if(document.getElementById('order-list')) initMenu();
    if(document.querySelector('#checkout-list > table')) finishMenu();
}

// Order menu code!
function initMenu() {
    const rootElement = document.getElementById('order-list');
    const orders = getOrder();

    if(orders === []) return;

    let overAllPrice = 0;
    orders.forEach(order => {
        if(order === null) return;

        const li =  document.createElement('li');
        const a = document.createElement('a')
        
        overAllPrice = overAllPrice + parseFloat(order.price)
        a.innerText = `${order.name} - $${order.price}`;
        li.appendChild(a);
        li.id = order.id;
        li.onclick = () => removeItem(li.id);

        rootElement.parentNode.insertBefore(li, rootElement.nextSibling);
    });

    const li =  document.createElement('li');
    const a = document.createElement('a');
    
    overAllPrice = Math.round(overAllPrice);
    a.innerText = `Check Out - Costing $${overAllPrice}`;

    a.href = window.location.pathname.split('/').includes('components') ? './checkout.html': './components/checkout.html';
    
    li.appendChild(a);
    document.getElementById('checkOut').replaceWith(li)
}

// Checkout code!
function finishMenu () {
    const rootElement = document.querySelector('#checkout-list > table');
    const orders = getOrder();

    if(orders.length === 0) {
        const row = rootElement.insertRow(0);
        const cell = row.insertCell(0);
        cell.innerText = 'Nothing! Go order something!'
    };

    let overAllPrice = 0;
    orders.forEach(order => {
        if(order === null) return;

        overAllPrice = overAllPrice + parseFloat(order.price)
        const row = rootElement.insertRow(0);
        const cell = row.insertCell(0);
        cell.innerText = `${order.name} - $${order.price}`;
    });

    overAllPrice = Math.round(overAllPrice);
    document.getElementById('overallPrice').innerHTML = `Total: $${overAllPrice}`;
    document.querySelector('body > div > div.dropdown.test1 > button').style.display = "none"
}

function addItem (item) {
    const order = window.localStorage.getItem('order')
    let items = [];
    if(order) items = JSON.parse(order);
    item['id'] = Math.floor((Math.random() * 100000) + 1).toString()
    items.push(item)
    window.localStorage.setItem('order', JSON.stringify(items));
    location.reload(); 
}

function removeItem(itemId) {
    const order = JSON.parse(window.localStorage.getItem('order'));

    for(let _item in order) {
        if(order[_item] === null) continue;
        if(order[_item].id === itemId) delete order[_item];
    }

    window.localStorage.setItem('order', JSON.stringify(order));
    location.reload();    
}

function getOrder () {
    return(JSON.parse(window.localStorage.getItem('order')) || [])
}

function clearOrder () {
    window.localStorage.removeItem('order')
    location.reload();
}

function patchForPhone () {
    document.querySelector('li.dropdown').classList.add('open');

    for(let data of document.querySelectorAll('.menu-table td')) {
        data.style.display = 'block'
    }
}