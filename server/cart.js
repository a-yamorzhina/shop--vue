let add = (cart, req) => {
    cart.contents.push(req.body);

    let countGoods = 0;
    let amount = 0;

    cart.contents.forEach(function (item, i, arr) {
        countGoods += item.quantity;
        amount += item.price;
    });

    cart.countGoods = countGoods;
    cart.amount = amount;

    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;

    let countGoods = 0;
    let amount = 0;
    cart.contents.forEach(function (item, i, arr) {
        countGoods += item.quantity;
        amount += item.price;
    });

    cart.countGoods = countGoods;
    cart.amount = amount;
    return JSON.stringify(cart, null, 4);
};
let minus = (cart, req) => {
    cart.contents = cart.contents.filter(el => el.id_product !== +req.params.id);

    let countGoods = 0;
    let amount = 0;

    cart.contents.forEach(function (item, i, arr) {
        countGoods += item.quantity;
        amount += item.price;
    });

    cart.countGoods = countGoods;
    cart.amount = amount;

    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    minus
};
