const {createStore} = Redux;
const {Provider, Container} = RegularRedux;


const ActionTypes = {
    changeName: 'changeName'
}

const actions = {
    changeName(name = 'xjy') {
        return {
            type: ActionTypes.changeName,
            msg: name
        }
    }
}

const reducer = (prevState, action) => {
    if (action.type === ActionTypes.changeName) {
        return Object.assign({}, prevState, {
            name: action.msg
        })
    }
    return prevState;
}

const store = createStore(reducer, {
    'name': 'junyu'
});

const Header = Regular.extend({
    template: `
        你的名字，{name} <br/> <br/>
        <input type="text" ref="ipt"/> <br/> <br/>
        <button on-click={this.changeName()}>点击按钮改名</button>    
    `,
    changeName() {
        this.dispatch(actions.changeName(this.$refs['ipt'].value));
    }
}).use(Container)

const Demo = Regular.extend({
    template: `
        <Provider store={store}>
            <Header
                getters={{"name": "name"}}
            ></Header>
        </Provider>
    `,
    config() {
        this.data.store = store;
        this.supr();
    }
}).component('Header', Header)

const demo = new Demo();

demo.$inject(document.body)
