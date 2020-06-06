Vue.component('search',
    {
        data() {
            return {
                searchModel: null
            }
        },
        template: `
         <form action="#" class="search">
            <label class="label-search" for="search">
                <input type="text" class="search-input" id="search" name="search" v-on:keyup="filter" v-model="searchModel">
                <button class="search-btn">
                    <svg  class=" search-btn search-svg" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 511.999 511.999" xml:space="preserve">
                    <path d="M508.874,478.708L360.142,329.976c28.21-34.827,45.191-79.103,45.191-127.309c0-111.75-90.917-202.667-202.667-202.667
                    S0,90.917,0,202.667s90.917,202.667,202.667,202.667c48.206,0,92.482-16.982,127.309-45.191l148.732,148.732
                    c4.167,4.165,10.919,4.165,15.086,0l15.081-15.082C513.04,489.627,513.04,482.873,508.874,478.708z M202.667,362.667
                    c-88.229,0-160-71.771-160-160s71.771-160,160-160s160,71.771,160,160S290.896,362.667,202.667,362.667z"/>
                    </svg>
                </button>
            </label>
        </form>
        `,
        methods: {
            filter() {
                this.$emit('filter-search', this.searchModel);
            }
        }
    });
