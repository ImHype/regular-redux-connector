const keypath = require('keypather')();

function getStore(ctx) {
    let parent = ctx.$parent;
    while(true) {
        if (!parent) {
            throw new Error('Expected root Component use Provider!')
        }

        if (parent.data.store) {
            return parent.data.store;
        }

        parent = parent.$parent;
    }
}

function Container(Component) {
    return Component.implement({
        events: {
            $config(data = this.data) {
                const store = getStore(this);
                const getters = this.data.getters;

                store.subscribe(function () {
                    const state = store.getState();
                    Object.keys(getters).forEach(item => {
                        keypath.set(data, getters[item], 
                            keypath.get(state, item)
                        )
                    });
                });

                store.dispatch({
                    type: 'CONTAINER_INIT'
                });
                
                this.subscribe = store.subscribe;
                this.dispatch = store.dispatch;
            } 
        }
    })
}

module.exports = Container;