const app = new Vue({
    el: '#app',
    data: {
        API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        isModalShow: false,
        isNotificationShow: false,
        notifications: [],
        userSearch: '',
        catalogUrl: '/catalogData.json',
        cartItems: [],
        filtered: [],
        products: [],
        basket: [],
        cart: [],
        imgProduct: 'https://placehold.it/200x150'
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        postJson(url, data){
            return this.putPostJson('POST', url, data);
        },
        putJson(url, data){
            return this.putPostJson('PUT', url, data);
        },
        putPostJson(method, url, data) {
            return fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        addProduct(item){
            let find = this.basket.contents.find(el => el.id_product === item.id_product);
            if(find){
                this.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.basket.contents.push(prod)
                        }
                    });
            }
        },
        sendNotification() {
            this.notifications.push('Товар добавлен в корзину');
            this.isNotificationShow = true;

            setTimeout(() => this.notificationDelete(), 5000);
        },
        notificationDelete() {
            this.notifications.shift();
        },

        delProduct(product) {
            let self = this;

            let item = this.basket.contents.find(el => el.id_product === product.id_product);

            // this.basket.contents.forEach(function (item, i, arr) {
            //     if (item.id_product === product.id_product) {

                    if (item.quantity === 1) {
                        self.deleteJson(`/api/cart/${item.id_product}`)
                            .then(data => {
                                if(data.result === 1){
                                    // self.basket.contents.splice(i, 1);
                                    this.basket.contents = this.basket.contents.filter(el => el.id_product !== product.id_product);
                                }
                            });
                    } else {
                        self.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                            .then(data => {
                                if(data.result === 1){
                                    item.quantity--;
                                }
                            });
                    }
                // }
            // });
        },

        clearBasket() {
            this.basket = [];
        },

        checkout() {
            location.href = 'checkout.html';
        },
        showModal() {
            this.isModalShow = !this.isModalShow;
        },
        closeModal() {
            this.isModalShow = !this.isModalShow;
        },
        filter(searchParams) {
            let regexp = new RegExp(searchParams, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
        closeNotification() {
            this.isNotificationShow = !this.isNotificationShow;
        }
    },
    mounted() {
        let self = this;

        this.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    self.products.push(item);
                    self.filtered.push(item);
                }
            });

        this.getJson(`http://localhost:3000/api/cart`)
            .then(data => {
                this.basket = data;
            });
    }
});
