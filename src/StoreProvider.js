const StoreProvider = Regular.extend({
    name: 'StoreProvider',
    template: '{#include this.$body}',
    config({store} = this.data) {
       if (!store) {
           throw new Error('Provider expected data.store to be store instance created by redux.createStore()')
       }
    }
})

export default StoreProvider;