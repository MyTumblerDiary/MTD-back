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
exports.User = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var refreshToken_entity_1 = require("src/applications/auth/entities/refreshToken.entity");
var tumbler_record_entity_1 = require("src/applications/tumbler-records/entities/tumbler-record.entity");
var typeorm_1 = require("typeorm");
var common_entity_1 = require("../../../infrastructures/database/entities/common.entity");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(partial) {
        var _this = _super.call(this) || this;
        Object.assign(_this, partial);
        return _this;
    }
    __decorate([
        typeorm_1.Column({ unique: true, nullable: false }),
        class_validator_1.IsEmail(),
        graphql_1.Field(function () { return String; }, {
            description: '이메일',
            nullable: false
        })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            nullable: true,
            length: 120
        }),
        graphql_1.Field(function () { return String; }, {
            description: '비밀번호입니다. ',
            nullable: false
        }),
        class_transformer_1.Exclude()
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            nullable: true,
            length: 20
        }),
        graphql_1.Field(function () { return String; }, {
            description: '닉네임은 최대 20자까지만 가능합니다. ',
            nullable: true
        })
    ], User.prototype, "nickname");
    __decorate([
        typeorm_1.Column({ "default": 'local', nullable: true }),
        graphql_1.Field(function () { return String; }, {
            description: 'local, google, kakao, apple 중 하나입니다. '
        })
    ], User.prototype, "social");
    __decorate([
        graphql_1.Field(function () { return [tumbler_record_entity_1.TumblerRecord]; }, {
            description: '유저가 가지고 있는 텀블러 기록들입니다. ',
            nullable: true
        }),
        typeorm_1.OneToMany(function () { return tumbler_record_entity_1.TumblerRecord; }, function (tumblerRecord) { return tumblerRecord.user; })
    ], User.prototype, "tumblerRecords");
    __decorate([
        typeorm_1.OneToMany(function () { return refreshToken_entity_1.RefreshToken; }, function (refreshToken) { return refreshToken.user; })
    ], User.prototype, "refreshTokens");
    User = __decorate([
        graphql_1.InputType('UserInputType', { isAbstract: true }),
        typeorm_1.Entity({ name: 'users' }),
        graphql_1.ObjectType({ description: '유저 Entity' })
    ], User);
    return User;
}(common_entity_1.CommonEntity));
exports.User = User;
