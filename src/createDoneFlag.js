function DoneFlag () {
    this.reset();
}

let proto = DoneFlag.prototype;

proto.done = function () {
    this.doneFlag = true;
}

proto.isDone = function () {
    return this.doneFlag === true;
}

proto.reset = function () {
    this.doneFlag = false;
}

export default () => new DoneFlag();