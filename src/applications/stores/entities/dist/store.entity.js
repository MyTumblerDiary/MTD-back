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
exports.Store = void 0;
var graphql_1 = require("@nestjs/graphql");
var franchise_entity_1 = require("src/applications/franchises/entities/franchise.entity");
var tumbler_record_entity_1 = require("src/applications/tumbler-records/entities/tumbler-record.entity");
var common_entity_1 = require("src/infrastructures/database/entities/common.entity");
var typeorm_1 = require("typeorm");
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({
            nullable: false,
            unique: true
        }),
        graphql_1.Field(function () { return String; }, {
            nullable: false,
            description: '가게 이름입니다. '
        })
    ], Store.prototype, "name");
    __decorate([
        typeorm_1.Column({
            type: 'int',
            nullable: false
        }),
        graphql_1.Field(function () { return graphql_1.Int; }, {
            nullable: false,
            description: '해당 가게에서의 텀블러 할인 가격입니다. '
        })
    ], Store.prototype, "discountPrice");
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            nullable: false,
            length: 100
        }),
        graphql_1.Field(function () { return String; }, {
            nullable: false,
            description: '가게의 도로명 주소입니다. '
        })
    ], Store.prototype, "streetNameAddress");
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            nullable: false,
            length: 100
        }),
        graphql_1.Field(function () { return String; }, {
            nullable: false,
            description: '가게의 지번 주소입니다. '
        })
    ], Store.prototype, "lotNumberAddress");
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            nullable: false,
            length: 100
        }),
        graphql_1.Field(function () { return String; }, {
            nullable: false,
            description: '가게의 상세 주소입니다. '
        })
    ], Store.prototype, "detailAddress");
    __decorate([
        typeorm_1.Column({
            nullable: false,
            type: 'float'
        }),
        graphql_1.Field(function () { return graphql_1.Float; }, {
            nullable: false,
            description: '가게의 위도입니다. '
        })
    ], Store.prototype, "latitude");
    __decorate([
        typeorm_1.Column({
            nullable: false,
            type: 'float'
        }),
        graphql_1.Field(function () { return graphql_1.Float; }, {
            nullable: false,
            description: '가게의 경도입니다. '
        })
    ], Store.prototype, "longitude");
    __decorate([
        typeorm_1.Column({
            nullable: false,
            type: 'varchar'
        }),
        graphql_1.Field(function () { return String; }, {
            nullable: false,
            description: '카카오 API에서 제공하는 가게의 고유 ID입니다. '
        })
    ], Store.prototype, "kakaoUId");
    __decorate([
        typeorm_1.Column({
            nullable: true
        }),
        graphql_1.Field(function () { return String; }, {
            nullable: true,
            description: 'AWS S3 버킷에 저장되는 가게의 대표 이미지 파일키 입니다. '
        })
    ], Store.prototype, "imageFileKey");
    __decorate([
        typeorm_1.OneToMany(function () { return tumbler_record_entity_1.TumblerRecord; }, function (tumblerRecords) { return tumblerRecords.store; }),
        graphql_1.Field(function () { return [tumbler_record_entity_1.TumblerRecord]; }, {
            nullable: true,
            description: '가게의 텀블러 기록들입니다. '
        })
    ], Store.prototype, "tumblerRecords");
    __decorate([
        typeorm_1.ManyToOne(function () { return franchise_entity_1.Franchise; }, function (franchise) { return franchise.stores; }, {
            nullable: true
        }),
        typeorm_1.JoinColumn({
            name: 'franchise_id'
        }),
        graphql_1.Field(function () { return franchise_entity_1.Franchise; }, {
            nullable: true,
            description: '가게가 속한 프랜차이즈입니다. '
        })
    ], Store.prototype, "franchise");
    Store = __decorate([
        typeorm_1.Entity({
            name: 'stores'
        }),
        graphql_1.InputType('StoreInputType', { isAbstract: true }),
        graphql_1.ObjectType({ description: '가게 Entity' })
    ], Store);
    return Store;
}(common_entity_1.CommonEntity));
exports.Store = Store;
