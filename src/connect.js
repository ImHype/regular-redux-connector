const keypath = require('keypather')();

function getStore(ctx) {
    let parent = ctx.$parent;
    while(true) {
        if (!parent) {
            throw new Error('Expected root Component be Provider!')
        }

        if (parent.data.store) {
            return parent.data.store;
        }

        parent = parent.$parent;
    }
}

function connect({getters = {}} = {}) {
    return (Component) => Component.implement({
        events: {
            $config(data = this.data) {
                const store = getStore(this);

                const unSubscribe = store.subscribe(() => {
                    const state = store.getState();
                    Object.keys(getters).forEach(item => {
                        keypath.set(data, item, 
                            keypath.get(state, getters[item])
                        )
                    });
                });

                store.dispatch({
                    type: 'CONTAINER_INIT'
                });
                
                this.subscribe = store.subscribe;
                this.dispatch = store.dispatch;
                
                this.$on('destroy', unSubscribe);
            } 
        }
    })
}

module.exports = connect;
