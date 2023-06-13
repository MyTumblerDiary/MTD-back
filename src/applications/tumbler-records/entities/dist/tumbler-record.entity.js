"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TumblerRecord = void 0;
var graphql_1 = require("@nestjs/graphql");
var store_entity_1 = require("src/applications/stores/entities/store.entity");
var user_entity_1 = require("src/applications/users/entities/user.entity");
var common_entity_1 = require("src/infrastructures/database/entities/common.entity");
var typeorm_1 = require("typeorm");
var TumblerRecord = /** @class */ (function (_super) {
    __extends(TumblerRecord, _super);
    function TumblerRecord(partial) {
        var _this = _super.call(this) || this;
        Object.assign(_this, partial);
        return _this;
    }
    __decorate([
        graphql_1.Field(function () { return graphql_1.Int; }, { description: '텀블러 할인 금액', nullable: true }),
        typeorm_1.Column({ type: 'int', nullable: true })
    ], TumblerRecord.prototype, "prices");
    __decorate([
        graphql_1.Field(function () { return String; }, { description: '텀블러 기록 메모', nullable: true }),
        typeorm_1.Column({ type: 'text', nullable: true })
    ], TumblerRecord.prototype, "memo");
    __decorate([
        graphql_1.Field(function () { return String; }, { description: '텀블러 이미지 파일 키', nullable: true }),
        typeorm_1.Column({ type: 'text', nullable: true })
    ], TumblerRecord.prototype, "imageFileKey");
    __decorate([
        graphql_1.Field(function () { return String; }, {
            description: '텀블러를 사용한 날짜입니다. 양식은 YYYY-MM-DD입니다. ',
            nullable: false
        }),
        typeorm_1.Column({ type: 'varchar', length: 10, nullable: false })
    ], TumblerRecord.prototype, "usedAt");
    __decorate([
        graphql_1.Field(function () { return String; }, {
            description: '텀블러를 사용한 장소의 타입입니다. ',
            nullable: true
        }),
        typeorm_1.Column({
            type: 'varchar',
            length: 40
        })
    ], TumblerRecord.prototype, "placeType");
    __decorate([
        graphql_1.Field(function () { return user_entity_1.User; }, {
            description: '텀블러 기록을 가진 유저',
            nullable: false
        }),
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.tumblerRecords; }, {
            onDelete: 'CASCADE',
            nullable: false
        }),
        typeorm_1.JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    ], TumblerRecord.prototype, "user");
    __decorate([
        graphql_1.Field(function () { return store_entity_1.Store; }, {
            description: '텀블러를 사용한 매장',
            nullable: true
        }),
        typeorm_1.ManyToOne(function () { return store_entity_1.Store; }, function (store) { return store.tumblerRecords; }, {
            onDelete: 'CASCADE',
            nullable: true
        }),
        typeorm_1.JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
    ], TumblerRecord.prototype, "store");
    TumblerRecord = __decorate([
        typeorm_1.Entity({
            name: 'tumbler_records'
        }),
        graphql_1.InputType('TumblerRecordInputType', { isAbstract: true }),
        graphql_1.ObjectType({ description: '텀블러 기록 Entity' })
    ], TumblerRecord);
    return TumblerRecord;
}(common_entity_1.CommonEntity));
exports.TumblerRecord = TumblerRecord;
