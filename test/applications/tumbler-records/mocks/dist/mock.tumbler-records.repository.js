"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MockTumblerRecordsTypeOrmRepository = void 0;
var common_1 = require("@nestjs/common");
var tumbler_record_entity_1 = require("src/applications/tumbler-records/entities/tumbler-record.entity");
var MockTumblerRecordsTypeOrmRepository = /** @class */ (function () {
    function MockTumblerRecordsTypeOrmRepository() {
    }
    MockTumblerRecordsTypeOrmRepository.prototype.create = function (data) {
        return new tumbler_record_entity_1.TumblerRecord(data);
    };
    MockTumblerRecordsTypeOrmRepository.prototype.createMany = function (data) {
        return data.map(function (d) { return new tumbler_record_entity_1.TumblerRecord(d); });
    };
    MockTumblerRecordsTypeOrmRepository.prototype.save = function (data) {
        return new Promise(function (resolve, reject) {
            resolve(new tumbler_record_entity_1.TumblerRecord(data));
            reject(new Error("save tumblerRecord error"));
        });
    };
    MockTumblerRecordsTypeOrmRepository.prototype.find = function (options) {
        return new Promise(function (resolve, reject) {
            resolve([new tumbler_record_entity_1.TumblerRecord()]);
            reject(new Error("find tumblerRecord error"));
        });
    };
    MockTumblerRecordsTypeOrmRepository.prototype.findByUserId = function (id) {
        return new Promise(function (resolve, reject) {
            resolve([
                new tumbler_record_entity_1.TumblerRecord({
                    user: {
                        id: id
                    }
                }),
            ]);
            reject(new Error("findByUserId tumblerRecord error"));
        });
    };
    MockTumblerRecordsTypeOrmRepository.prototype.findOne = function (options) {
        return new Promise(function (resolve, reject) {
            resolve(new tumbler_record_entity_1.TumblerRecord());
            reject(new Error("findOne tumblerRecord error"));
        });
    };
    MockTumblerRecordsTypeOrmRepository.prototype.findOneOrFail = function (options) {
        return new Promise(function (resolve, reject) {
            resolve(new tumbler_record_entity_1.TumblerRecord());
            reject(new Error("findOneOrFail tumblerRecord error"));
        });
    };
    MockTumblerRecordsTypeOrmRepository.prototype.search = function (input) {
        return new Promise(function (resolve, reject) {
            resolve([new tumbler_record_entity_1.TumblerRecord()]);
            reject(new Error("search tumblerRecord error"));
        });
    };
    MockTumblerRecordsTypeOrmRepository.prototype.update = function (id, data) {
        return new Promise(function (resolve, reject) {
            resolve(new tumbler_record_entity_1.TumblerRecord({ id: id }));
            reject(new Error("update tumblerRecord error"));
        });
    };
    MockTumblerRecordsTypeOrmRepository.prototype["delete"] = function (id) {
        return new Promise(function (resolve, reject) {
            resolve(true);
            reject(new Error("delete " + id + " tumblerRecord error"));
        });
    };
    MockTumblerRecordsTypeOrmRepository.prototype.softDelete = function (id) {
        return new Promise(function (resolve, reject) {
            resolve(true);
            reject(new Error("softDelete tumblerRecord error"));
        });
    };
    MockTumblerRecordsTypeOrmRepository = __decorate([
        common_1.Injectable()
    ], MockTumblerRecordsTypeOrmRepository);
    return MockTumblerRecordsTypeOrmRepository;
}());
exports.MockTumblerRecordsTypeOrmRepository = MockTumblerRecordsTypeOrmRepository;
