const Provider = Regular.extend({
    name: 'Provider',
    template: '{#include this.$body}',
    config({store} = this.data) {
        if (store) {
            this.store = store;
        }
    }
})

module.exports = Provider;