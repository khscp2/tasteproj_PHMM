window.onload = (e) => {
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
    const a = document.createElement('a')

    a.innerText = `Check Out - Costing $${overAllPrice}`

    li.appendChild(a);
    document.getElementById('checkOut').replaceWith(li)
}

// Checkout code!
function finishMenu () {
    const rootElement = document.querySelector('#checkout-list > table');
    const orders = getOrder();

    if(orders === []) return;

    orders.forEach(order => {
        if(order === null) return;
        
        const row = rootElement.insertRow(0);
        const cell = row.insertCell(0);
        cell.innerText = `${order.name} - $${order.price}`;
    });
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