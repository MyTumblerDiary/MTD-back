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
exports.CreateTumblerRecordWithCreateStoreInput = exports.CreateTumblerRecordTransactionInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var create_store_dto_1 = require("src/applications/stores/dto/create.store.dto");
var user_entity_1 = require("src/applications/users/entities/user.entity");
var create_tumbler_record_dto_1 = require("./create.tumbler-record.dto");
var CreateTumblerRecordTransactionInput = /** @class */ (function () {
    function CreateTumblerRecordTransactionInput() {
    }
    __decorate([
        graphql_1.Field(function () { return create_tumbler_record_dto_1.CreateTumblerRecordInput; }, {
            description: '텀블러 기록을 생성을 위한 Input data입니다. '
        })
    ], CreateTumblerRecordTransactionInput.prototype, "createTumblerRecordInput");
    __decorate([
        graphql_1.Field(function () { return create_store_dto_1.CreateStoreInput; }, {
            description: '공간 생성을 위한 Input data입니다. '
        })
    ], CreateTumblerRecordTransactionInput.prototype, "createStoreInput");
    __decorate([
        graphql_1.Field(function () { return user_entity_1.User; }, {
            description: '유저 정보입니다. '
        })
    ], CreateTumblerRecordTransactionInput.prototype, "userAuth");
    CreateTumblerRecordTransactionInput = __decorate([
        graphql_1.InputType('CreateTumblerRecordTransactionInputType', {
            isAbstract: true
        })
    ], CreateTumblerRecordTransactionInput);
    return CreateTumblerRecordTransactionInput;
}());
exports.CreateTumblerRecordTransactionInput = CreateTumblerRecordTransactionInput;
var CreateTumblerRecordWithCreateStoreInput = /** @class */ (function (_super) {
    __extends(CreateTumblerRecordWithCreateStoreInput, _super);
    function CreateTumblerRecordWithCreateStoreInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateTumblerRecordWithCreateStoreInput = __decorate([
        graphql_1.InputType()
    ], CreateTumblerRecordWithCreateStoreInput);
    return CreateTumblerRecordWithCreateStoreInput;
}(graphql_1.PickType(CreateTumblerRecordTransactionInput, ['createTumblerRecordInput', 'createStoreInput'])));
exports.CreateTumblerRecordWithCreateStoreInput = CreateTumblerRecordWithCreateStoreInput;
