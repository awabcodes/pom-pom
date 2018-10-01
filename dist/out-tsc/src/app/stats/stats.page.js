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
var tasks_service_1 = require("../tasks.service");
var StatsPage = /** @class */ (function () {
    function StatsPage(tasksService) {
        this.tasksService = tasksService;
    }
    StatsPage.prototype.ngOnInit = function () {
        this.tasksService.showPieChart(this.pieCanvas);
    };
    __decorate([
        core_1.ViewChild('pieCanvas'),
        __metadata("design:type", Object)
    ], StatsPage.prototype, "pieCanvas", void 0);
    StatsPage = __decorate([
        core_1.Component({
            selector: 'app-stats',
            templateUrl: 'stats.page.html',
            styleUrls: ['stats.page.scss']
        }),
        __metadata("design:paramtypes", [tasks_service_1.TasksService])
    ], StatsPage);
    return StatsPage;
}());
exports.StatsPage = StatsPage;
//# sourceMappingURL=stats.page.js.map