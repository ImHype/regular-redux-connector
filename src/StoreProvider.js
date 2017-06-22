import createDoneFlag from './createDoneFlag';

const StoreProvider = Regular.extend({
    name: 'StoreProvider',
    template: '{#include this.$body}',
    config({store} = this.data) {
       if (!store) {
           throw new Error('Provider expected data.store to be store instance created by redux.createStore()')
       }

       let flag = createDoneFlag();
       
       store.subscribe(() => {
           flag.done();

           setTimeout(() => {
               if (flag.isDone()) {
                   this.$update();
                   flag.reset();
               }
           });
       });
    }
});

export default StoreProvider;