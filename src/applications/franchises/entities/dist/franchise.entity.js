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
exports.Franchise = void 0;
var graphql_1 = require("@nestjs/graphql");
var store_entity_1 = require("src/applications/stores/entities/store.entity");
var common_entity_1 = require("src/infrastructures/database/entities/common.entity");
var typeorm_1 = require("typeorm");
var Franchise = /** @class */ (function (_super) {
    __extends(Franchise, _super);
    function Franchise() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({
            nullable: false,
            unique: true
        }),
        graphql_1.Field(function () { return String; }, {
            nullable: false,
            description: '가맹점 이름입니다. '
        })
    ], Franchise.prototype, "name");
    __decorate([
        typeorm_1.Column({
            nullable: false
        }),
        graphql_1.Field(function () { return graphql_1.Int; }, {
            nullable: true,
            description: '가맹점 텀블러 할인 금액입니다. '
        })
    ], Franchise.prototype, "discountPrice");
    __decorate([
        typeorm_1.OneToMany(function () { return store_entity_1.Store; }, function (stores) { return stores.franchise; }, {
            nullable: true,
            onDelete: 'CASCADE'
        }),
        graphql_1.Field(function () { return [store_entity_1.Store]; }, {
            nullable: true,
            description: '가맹점에 속한 가게들입니다. '
        })
    ], Franchise.prototype, "stores");
    Franchise = __decorate([
        typeorm_1.Entity({
            name: 'franchises'
        }),
        graphql_1.InputType('FranchiseInputType', { isAbstract: true }),
        graphql_1.ObjectType({ description: '가맹점 Entity' })
    ], Franchise);
    return Franchise;
}(common_entity_1.CommonEntity));
exports.Franchise = Franchise;
