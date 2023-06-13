"use strict";
exports.__esModule = true;
exports.TumblerRecordBuilder = void 0;
var tumbler_record_entity_1 = require("src/applications/tumbler-records/entities/tumbler-record.entity");
var functions_1 = require("src/commons/utils/functions");
var TumblerRecordBuilder = /** @class */ (function () {
    function TumblerRecordBuilder() {
    }
    TumblerRecordBuilder.prototype.build = function (data) {
        return new tumbler_record_entity_1.TumblerRecord(data);
    };
    TumblerRecordBuilder.prototype.buildMany = function (data) {
        return data.map(function (d) { return new tumbler_record_entity_1.TumblerRecord(d); });
    };
    TumblerRecordBuilder.prototype.buildMockTumblerRecord = function () {
        return this.build({
            id: functions_1.uuid(),
            prices: 1000,
            memo: "test-memo",
            imageFileKey: Math.random().toString(36).substring(7),
            placeType: 'STORE',
            usedAt: "2023-01-01"
        });
    };
    TumblerRecordBuilder.prototype.buildMockCreateTumblerRecordInput = function () {
        return {
            prices: 1000,
            memo: "test-memo",
            imageFileKey: Math.random().toString(36).substring(7),
            placeType: 'STORE',
            usedAt: "2023-01-01"
        };
    };
    return TumblerRecordBuilder;
}());
exports.TumblerRecordBuilder = TumblerRecordBuilder;
