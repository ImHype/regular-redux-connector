const Provider = Regular.extend({
    name: 'Provider',
    template: '{#include this.$body}',
    config({store} = this.data) {
       if (!store) {
           throw new Error('Provider expected data.store to be store instance created by redux.createStore()')
       }
    }
})

module.exports = Provider;