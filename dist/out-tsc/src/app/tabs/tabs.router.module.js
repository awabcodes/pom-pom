"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tabs_page_1 = require("./tabs.page");
var timer_page_1 = require("../timer/timer.page");
var tasks_page_1 = require("../tasks/tasks.page");
var stats_page_1 = require("../stats/stats.page");
var routes = [
    {
        path: 'tabs',
        component: tabs_page_1.TabsPage,
        children: [
            {
                path: '',
                redirectTo: '/tabs/(timer:timer)',
                pathMatch: 'full',
            },
            {
                path: 'timer',
                outlet: 'timer',
                component: timer_page_1.TimerPage
            },
            // {
            //   path: 'timer/:id',
            //   outlet: 'timer',
            //   component: TimerPage
            // },
            {
                path: 'tasks',
                outlet: 'tasks',
                component: tasks_page_1.TasksPage
            },
            {
                path: 'stats',
                outlet: 'stats',
                component: stats_page_1.StatsPage
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/(timer:timer)',
        pathMatch: 'full'
    }
];
var TabsPageRoutingModule = /** @class */ (function () {
    function TabsPageRoutingModule() {
    }
    TabsPageRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], TabsPageRoutingModule);
    return TabsPageRoutingModule;
}());
exports.TabsPageRoutingModule = TabsPageRoutingModule;
//# sourceMappingURL=tabs.router.module.js.map