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
var ngx_1 = require("@ionic-native/in-app-browser/ngx");
var angular_1 = require("@ionic/angular");
var InfoModalComponent = /** @class */ (function () {
    function InfoModalComponent(inAppBrowser, modalCtrl) {
        this.inAppBrowser = inAppBrowser;
        this.modalCtrl = modalCtrl;
    }
    InfoModalComponent.prototype.ngOnInit = function () {
    };
    InfoModalComponent.prototype.redirect = function () {
        this.inAppBrowser.create("https://en.wikipedia.org/wiki/Pomodoro_Technique");
    };
    InfoModalComponent.prototype.closeInfo = function () {
        this.modalCtrl.dismiss();
    };
    InfoModalComponent = __decorate([
        core_1.Component({
            selector: 'app-info-modal',
            templateUrl: './info-modal.component.html',
            styleUrls: ['./info-modal.component.scss']
        }),
        __metadata("design:paramtypes", [ngx_1.InAppBrowser, angular_1.ModalController])
    ], InfoModalComponent);
    return InfoModalComponent;
}());
exports.InfoModalComponent = InfoModalComponent;
//# sourceMappingURL=info-modal.component.js.map