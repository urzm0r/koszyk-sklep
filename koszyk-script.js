user_menu_is_hidden = true
user_menu = document.getElementById('user-menu')

function btntoggle() {
    if (user_menu_is_hidden) {
        user_menu.classList.remove('user-menu-hide');
        user_menu_is_hidden = false
    } else {
        user_menu.classList.add('user-menu-hide')
        user_menu_is_hidden = true
    }
}

const items = [
    {
        itname : 'Mikrofon',
        srcPath : 'img/mikrofon.jpg',
        itemPrice : 5.00
    },
    {
        itname : 'Drzwi',
        srcPath : 'img/drzwi.jpg',
        itemPrice : 15.00
    },
    {
        itname : 'Komoda',
        srcPath : 'img/komoda.jpg',
        itemPrice : 24.24
    }
]

let next_item_id = 1;
const cart = document.getElementById('cart')

function add(id) {

    const card = document.createElement('div');
    card.id = next_item_id;
    card.className = 'item';
    cart.appendChild(card);

    const header = document.createElement('h3');
    header.className = String(id);
    header.innerHTML = items[id].itname;
    card.appendChild(header)

    const inDiv = document.createElement('div');
    card.appendChild(inDiv);


    const img = document.createElement('img');
    img.src = items[id].srcPath;
    img.width = 50;
    img.height = 50;
    img.alt = items[id].itname;
    inDiv.appendChild(img);

    const itemPrice = document.createElement('p');
    itemPrice.innerHTML = '$' + String(items[id].itemPrice);
    itemPrice.className = 'item-price';
    inDiv.appendChild(itemPrice);

    const iptDiv = document.createElement('div');
    iptDiv.className = 'input-div';
    inDiv.appendChild(iptDiv)

        const label = document.createElement('label');
        label.htmlFor = "item-quantity-" + String(next_item_id);
        label.innerHTML = 'ilość';
        iptDiv.appendChild(label);
        
        const input = document.createElement('input');
        input.max = '999';
        input.min = '1';
        input.value = '1';
        input.type = 'number';
        input.name = 'item-quantity';
        input.id = "item-quantity-" + String(next_item_id);
        input.setAttribute('onchange','refreshTotal()')
        iptDiv.appendChild(input);

    const button = document.createElement('button');
    button.className = 'remove';
    button.innerHTML = 'Usuń';
    button.setAttribute('onclick', 'iremove(' + String(next_item_id) + ')');
    next_item_id++;
    inDiv.appendChild(button);

    refreshTotal();

}

function iremove(id) {
    document.getElementById(id).remove()
    refreshTotal()
}

let total = 0;
refreshTotal();

/*function getId(pre) {
    return pre.slice(pre.lastIndexOf('-') + 1)
}*/

function refreshTotal() {
    total = 0;
    for (const child of cart.children) {
        let itemid = Number(child.children[0].className);
        let inpt = child.children[1].children[2].children[1]
        total = total + Number(inpt.value * items[itemid].itemPrice) ;
        // * Number(getId(child.lastChild.children[1].id))
    }
    document.getElementById('value').innerHTML = '$' + String(total.toFixed(2));
}