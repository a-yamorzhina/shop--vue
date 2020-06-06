Vue.component('basket',
    {
        props:['basket'],
        template: `     <div id="cart-product">
                            <div class="cart-products"  v-for="product in basket">
                                <p class="cart-id_product s">{{product.id_product}}</p>
                                <p class="cart-product_name s">{{product.product_name}}</p>
                                <p class="cart-price s">{{product.price}}</p>
                                <p class="cart-quantity s">
                                    <svg  class="minus" v-on:click="minus(product)"
                                         xmlns="http://www.w3.org/2000/svg" height="14px"
                                         viewBox="0 -192 469.33333 469" width="14px">
                                        <path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0
                                      17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938
                                      32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0"/>
                                    </svg>
                                    <span class="product-quantity">{{product.quantity}}</span>
                                    <svg v-on:click="plus(product)" class="plus" height="14px"
                                            viewBox="0 0 469.33333 469.33333" width="14px"
                                            xmlns="http://www.w3.org/2000/svg">
                                        <path d="m437.332031 192h-405.332031c-17.664062
                                          0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h405.332031c17.664063
                                          0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0"/>
                                        <path d="m192
                                          32v405.332031c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937
                                          32-32v-405.332031c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32
                                          32zm0 0"/>
                                    </svg>
                                </p>
                            </div>
                        </div>`,
        methods: {
            plus(product){
           this.$emit('add-product', product);
            },

            minus(product){
                this.$emit('del-product', product)
            }
        },
    });