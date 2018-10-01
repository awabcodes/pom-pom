"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var tasks_service_1 = require("./tasks.service");
describe('TasksService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [tasks_service_1.TasksService]
        });
    });
    it('should be created', testing_1.inject([tasks_service_1.TasksService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=tasks.service.spec.js.map