class DoneFlag {
    constructor() {
        this.reset();
    }

    done() {
        this.doneFlag = true;
    }
    
    isDone() {
        return this.doneFlag === true;
    }

    reset() {
        this.doneFlag = false;
    }
}

export default () => new DoneFlag();