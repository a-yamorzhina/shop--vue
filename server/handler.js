const cart = require('./cart');
const fs = require('fs');

const actions = {
    add: cart.add,
    change: cart.change,
    minus: cart.minus,
};

let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data)=> {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            let newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if(err){
                    res.sendStatus(404, JSON.stringify({result:0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 1}))
                }
            })
        }
    })

    fs.readFile('server/db/stats.json', 'utf-8', (err, data)=> {
        if(err){
            // error log
        } else {
            let newData = JSON.parse(data);
            newData.result.push('cart / ' + action + ' / ' + new Date());
            // newData = newData.list.push({result:0, text: 'err'});
            fs.writeFile('server/db/stats.json', JSON.stringify(newData, null, 1), (err) => {
                if(err){
                    // error log
                } else {
                    // success log
                }
            })
        }
    })
};

module.exports = handler;
