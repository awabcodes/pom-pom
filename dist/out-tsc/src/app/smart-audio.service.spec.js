"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var smart_audio_service_1 = require("./smart-audio.service");
describe('SmartAudioService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(smart_audio_service_1.SmartAudioService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=smart-audio.service.spec.js.map