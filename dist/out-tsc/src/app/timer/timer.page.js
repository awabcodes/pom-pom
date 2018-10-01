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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tasks_service_1 = require("../tasks.service");
var angular_1 = require("@ionic/angular");
var info_modal_component_1 = require("../info-modal/info-modal.component");
var smart_audio_service_1 = require("../smart-audio.service");
var ngx_1 = require("@ionic-native/local-notifications/ngx");
var ngx_2 = require("@ionic-native/background-mode/ngx");
var TimerPage = /** @class */ (function () {
    function TimerPage(route, tasksService, alertController, modalController, toastController, smartAudio, localNotifications, backgroundMode) {
        this.route = route;
        this.tasksService = tasksService;
        this.alertController = alertController;
        this.modalController = modalController;
        this.toastController = toastController;
        this.smartAudio = smartAudio;
        this.localNotifications = localNotifications;
        this.backgroundMode = backgroundMode;
        // public pomodoros: number = 0;
        this.pomodoroTime = 3;
        this.shortBreakTime = 1;
        this.LongBreakTime = 2;
        this.breakCounter = 1;
        this.isPom = false;
    }
    TimerPage.prototype.ngOnInit = function () {
        this.backgroundMode.enable;
        this.tasksService.load();
        this.initTimer();
    };
    // ngDoCheck() {
    //   this.taskSelected = this.tasksService.isTaskSelected;
    // }
    TimerPage.prototype.initTimer = function () {
        this.BreakOrPom();
        this.time = this.timeInSeconds;
        this.runTimer = false;
        this.hasStarted = false;
        this.hasFinished = false;
        this.remainingTime = this.timeInSeconds;
        this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
    };
    TimerPage.prototype.BreakOrPom = function () {
        if (this.breakCounter == 2 || this.breakCounter == 4 || this.breakCounter == 6) {
            this.timeInSeconds = this.shortBreakTime;
            this.isPom = false;
        }
        else if (this.breakCounter == 8) {
            this.timeInSeconds = this.LongBreakTime;
            this.isPom = false;
            this.breakCounter = 0;
        }
        else {
            this.timeInSeconds = this.pomodoroTime;
            this.isPom = true;
        }
    };
    TimerPage.prototype.startTimer = function () {
        if (this.tasksService.isTaskSelected) {
            this.runTimer = true;
            this.hasStarted = true;
            this.timerTick();
        }
        else {
            this.showToast('You have to select a task first');
        }
    };
    TimerPage.prototype.pauseTimer = function () {
        this.runTimer = false;
    };
    TimerPage.prototype.resumeTimer = function () {
        this.startTimer();
    };
    TimerPage.prototype.timerTick = function () {
        var _this = this;
        setTimeout(function () {
            if (!_this.runTimer) {
                return;
            }
            _this.remainingTime--;
            _this.displayTime = _this.getSecondsAsDigitalClock(_this.remainingTime);
            if (_this.remainingTime > 0) {
                _this.timerTick();
            }
            else {
                if (_this.isPom) {
                    _this.tasksService.updateTotalPomodoros();
                }
                _this.smartAudio.play('ring');
                _this.hasFinished = true;
                _this.breakCounter++;
                _this.showNotification();
                _this.initTimer();
            }
        }, 1000);
    };
    TimerPage.prototype.getSecondsAsDigitalClock = function (inputSeconds) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return minutesString + ':' + secondsString;
    };
    TimerPage.prototype.taskFinished = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.tasksService.isTaskSelected) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Confirm!',
                                message: '<strong>Are you sure</strong>!!!',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function (blah) {
                                            console.log('Confirm Cancel: blah');
                                        }
                                    }, {
                                        text: 'Okay',
                                        handler: function () {
                                            console.log('Confirm Okay');
                                            _this.finishTask();
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.showToast('You have to select a task first');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TimerPage.prototype.finishTask = function () {
        this.tasksService.addFinishedTask(this.tasksService.currentTask);
    };
    TimerPage.prototype.showInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: info_modal_component_1.InfoModalComponent,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TimerPage.prototype.showToast = function (messageStr) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: messageStr,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    TimerPage.prototype.showNotification = function () {
        this.localNotifications.schedule({
            text: 'Timer Complete',
            trigger: { at: new Date(new Date().getTime()) },
            led: 'FF0000',
            sound: null
        });
    };
    TimerPage = __decorate([
        core_1.Component({
            selector: 'app-timer',
            templateUrl: 'timer.page.html',
            styleUrls: ['timer.page.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            tasks_service_1.TasksService,
            angular_1.AlertController,
            angular_1.ModalController,
            angular_1.ToastController,
            smart_audio_service_1.SmartAudioService,
            ngx_1.LocalNotifications,
            ngx_2.BackgroundMode])
    ], TimerPage);
    return TimerPage;
}());
exports.TimerPage = TimerPage;
//# sourceMappingURL=timer.page.js.map