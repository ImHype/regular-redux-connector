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

function connect({
    mapState = () => ({}),
    dispatch
} = {}) {
    return (Component) => Component.implement({
        events: {
            $config(data = this.data) {
                const store = getStore(this);
                const mapStateFn = () => {
                    const state = store.getState();
                    const mappedData = mapState.call(this, state);
                    mappedData && Object.assign(this.data, mappedData);
                }
                mapStateFn();

                const unSubscribe = store.subscribe(mapStateFn);
                
                if (dispatch) {
                    this.$dispatch = store.dispatch;
                }
                
                this.$on('destroy', unSubscribe);
            } 
        }
    });
}

export default connect;
