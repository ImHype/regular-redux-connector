import DoneFlag from './helpers/DoneFlag';

const StoreProvider = Regular.extend({
    name: 'StoreProvider',
    template: '{#include this.$body}',
    config({store} = this.data) {
       if (!store) {
           throw new Error('Provider expected data.store to be store instance created by redux.createStore()')
       }

       let doneFlag = new DoneFlag();
       
       store.subscribe(() => {
           doneFlag.done();

           setTimeout(() => {
               if (doneFlag.isDone()) {
                   this.$update();
                   doneFlag.reset();
               }
           });
       });
    }
});

export default StoreProvider;