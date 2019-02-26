window.onload = (e) => {
    if(document.getElementById('order-list')) {
        const rootElement = document.getElementById('order-list');
        const orders = getOrder();
        if(orders[0] === "" || orders === undefined) return;
        let overAllPrice = 0;
        orders.forEach(order => {
            if(order === null) return;

            const li =  document.createElement('li');
            const a = document.createElement('a')
            
            overAllPrice = overAllPrice + parseFloat(order.price)
            a.innerText = `${order.name} - $${order.price}`;
            li.appendChild(a);

            rootElement.parentNode.insertBefore(li, rootElement.nextSibling);
        });

        const li =  document.createElement('li');
        const a = document.createElement('a')

        a.innerText = `Check Out - Costing $${overAllPrice}`

        li.appendChild(a);
        document.getElementById('checkOut').replaceWith(li)
    }
}

function addItem (item) {
    const order = window.localStorage.getItem('order')
    let items = [];
    if(order) items = JSON.parse(order);
    items.push(item)
    window.localStorage.setItem('order', JSON.stringify(items));
    location.reload(); 
}

function removeItem (item) {
    const order = JSON.parse(window.localStorage.getItem('order'));

    for(let _item in order) {
        if(order[_item] === item) delete order[_item]
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