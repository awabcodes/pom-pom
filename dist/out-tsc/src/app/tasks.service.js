"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var storage_1 = require("@ionic/storage");
var chart_js_1 = require("chart.js");
var TasksService = /** @class */ (function () {
    function TasksService(storage) {
        this.storage = storage;
        this.tasks = [];
        this.finishedTasks = [];
        this.loaded = false;
        this.finishedLoaded = false;
        this.isTaskSelected = false;
        this.isChartDrwan = false;
        this.tasksName = [];
        this.tasksPomodoros = [];
        this.chartColors = [];
    }
    TasksService.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get('tasks').then(function (tasks) {
                if (tasks != null) {
                    _this.tasks = tasks;
                }
                _this.loaded = true;
                resolve(true);
            });
            _this.storage.get('finishedTasks').then(function (finishedTasks) {
                if (finishedTasks != null) {
                    _this.finishedTasks = finishedTasks;
                }
                _this.finishedLoaded = true;
                resolve(true);
            });
        });
    };
    TasksService.prototype.save = function () {
        this.storage.set('tasks', this.tasks);
        this.storage.set('finishedTasks', this.finishedTasks);
        if (this.isChartDrwan) {
            this.populateChartData();
            this.pieChart.update();
        }
    };
    TasksService.prototype.addTask = function (task) {
        this.tasks.push(task);
        this.save();
    };
    TasksService.prototype.updateTotalPomodoros = function () {
        if (this.isTaskSelected) {
            this.currentTask.totalPomodoros += 1;
            this.save();
        }
    };
    TasksService.prototype.addFinishedTask = function (task) {
        task.isFinished = true;
        this.finishedTasks.push(task);
        this.save();
        this.removeTask(task);
    };
    TasksService.prototype.selectTask = function (task) {
        this.index = this.tasks.indexOf(task);
        this.currentTask = this.tasks[this.index];
        this.isTaskSelected = true;
    };
    TasksService.prototype.editTask = function (task, title) {
        task.setName(title);
        this.save();
    };
    TasksService.prototype.removeTask = function (task) {
        var index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
            this.save();
        }
        if (index == this.index) {
            this.isTaskSelected = false;
            this.currentTask = null;
        }
    };
    TasksService.prototype.removeCompletedTask = function (task) {
        var index = this.finishedTasks.indexOf(task);
        if (index > -1) {
            this.finishedTasks.splice(index, 1);
            this.save();
        }
    };
    TasksService.prototype.showPieChart = function (canvas) {
        this.pieChart = new chart_js_1.Chart(canvas.nativeElement, {
            type: 'horizontalBar',
            data: {
                labels: this.tasksName,
                datasets: [{
                        label: 'Pomodoros took by task',
                        data: this.tasksPomodoros,
                        backgroundColor: this.chartColors,
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
        this.isChartDrwan = true;
    };
    TasksService.prototype.populateChartData = function () {
        for (var _i = 0, _a = this.finishedTasks; _i < _a.length; _i++) {
            var task = _a[_i];
            this.tasksName.push(task.name);
            this.tasksPomodoros.push(task.totalPomodoros);
            this.chartColors.push('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
        }
    };
    TasksService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [storage_1.Storage])
    ], TasksService);
    return TasksService;
}());
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map