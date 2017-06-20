const {createStore} = Redux;
const {StoreProvider, connect} = RegularRedux;


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

const Header = Regular.extend({
    template: `
        你的名字，{NAME} <br/> <br/>
        <input type="text" ref="ipt"/> <br/> <br/>
        <button on-click={this.changeName()}>点击按钮改名</button>    
    `,
    changeName() {
        this.dispatch(actions.changeName(this.$refs['ipt'].value));
    }
})
const HeaderContainer = connect({
    mapState(state) {
        return {
            'NAME': state.name 
        }
    }
})(Header);

const Demo = Regular.extend({
    template: `
        <StoreProvider store={store}>
            <Header isolate></Header> 
        </StoreProvider>
    `,
    config() {
        this.data.store = createStore(reducer, {
            'name': 'junyu'
        });;
        this.supr();
    }
}).component('Header', HeaderContainer)

const demo = new Demo();

demo.$inject(document.body)
