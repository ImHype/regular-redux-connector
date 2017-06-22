class DoneFlag {
    constructor() {
        this.reset();
    }

    done() {
        this.isDone = true;
    }
    
    isDone() {
        return this.isDone === true;
    }

    reset() {
        this.isDone = false;
    }
}

export default DoneFlag;