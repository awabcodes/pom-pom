"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskModel = /** @class */ (function () {
    function TaskModel(name, totalPomodoros, isFinished) {
        if (totalPomodoros === void 0) { totalPomodoros = 0; }
        this.name = name;
        this.totalPomodoros = totalPomodoros;
        this.isFinished = isFinished;
    }
    TaskModel.prototype.setName = function (name) {
        this.name = name;
    };
    TaskModel.prototype.setIsFinished = function (finished) {
        this.isFinished = finished;
    };
    return TaskModel;
}());
exports.TaskModel = TaskModel;
//# sourceMappingURL=task-model.js.map