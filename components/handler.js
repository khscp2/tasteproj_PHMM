function addItem (item) {
    const order = window.localStorage.getItem('order')
    let items = [];

    if(order) items = JSON.parse(order);

    items.push(item)
    
    window.localStorage.setItem('order', JSON.stringify(items));
}

function removeItem(item) {
    const order = JSON.parse(window.localStorage.getItem('order'));

    for(let _item in order) {
        if(order[_item] === item) order.splice(0, _item)
    }
    window.localStorage.setItem('order', JSON.stringify(order));
}

