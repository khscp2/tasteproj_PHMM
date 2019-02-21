let items = {};

function addItem (item) {
    const order = window.localStorage.getItem('order')

    if(order) items = JSON.parse(order);

    items.push(item)
    
    window.localStorage.setItem('order', JSON.stringify(items));
}

function removeItem(item) {

}

