const app = new Vue({
    el: '#app',
    data: {
        re: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        errors: [],
        name: null,
        phone: null,
        email: null,
        error: {
            name: false,
            phone: false,
            email: false
        },
        notifications: []
    },
    methods: {
        checkName(){
            this.name = this.name.replace(/[0-9]/g, "");
        },

        checkPhone(){
            let number = this.phone.replace(/\D/g, '');
            let x = number.match(/(\d{1})(\d{3})(\d{3})(\d{4})/);

            if(x && x.length > 4) {
                if(x[1] != 7) {
                    x[1] = 7;
                }

               this.phone = '+' + x[1] + ' (' + x[2] + ') ' + x[3] + '-' + x[4];
            }
        },

        checkEmail(){

        },

        checkoutValid(){
            if(!this.name || this.name.length < 2) {
                // notification
                this.notifications.push('Имя введено неверно');
                setTimeout(() => this.notificationDelete(), 5000);
                this.error.name = true;
            } else {
                this.error.name = false;
            }

            if(!this.phone || this.phone.replace(/\D/g, '').length < 11) {
                // notificztion
                this.notifications.push('Телефон введен неверно');
                setTimeout(() => this.notificationDelete(), 5000);
                this.error.phone = true;
            } else {
                this.error.phone = false;
            }

            if(!this.re.test(this.email)) {
                // notification
                this.notifications.push('Email введен неверно');
                setTimeout(() => this.notificationDelete(), 5000);
                this.error.email = true;
            } else {
                this.error.email = false;
            }
        },

        notificationDelete() {
            this.notifications.shift();
        },
    },
});



