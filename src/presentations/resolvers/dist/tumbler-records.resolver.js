"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TumblerRecordResolver = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var tumbler_record_dto_1 = require("src/applications/tumbler-records/dto/tumbler-record.dto");
var tumbler_record_entity_1 = require("src/applications/tumbler-records/entities/tumbler-record.entity");
var gql_auth_guard_1 = require("src/commons/auth/gql-auth.guard");
var gql_user_param_1 = require("src/commons/auth/gql-user.param");
var TumblerRecordResolver = /** @class */ (function () {
    function TumblerRecordResolver(tumblerRecordsService) {
        this.tumblerRecordsService = tumblerRecordsService;
    }
    TumblerRecordResolver.prototype.createTumblerRecord = function (userAuth, input) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tumblerRecordsService.createWithTransaction(input, userAuth)];
            });
        });
    };
    TumblerRecordResolver.prototype.createTumblerRecordOnPrivateSpace = function (user, input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tumblerRecordsService.create(input, user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TumblerRecordResolver.prototype.tumblerRecords = function (user, searchTumblerRecordInput) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tumblerRecordsService.findByUserId(user, searchTumblerRecordInput)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TumblerRecordResolver.prototype.tumblerRecord = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tumblerRecordsService.findOne(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TumblerRecordResolver.prototype.updateTumblerRecord = function (id, updateTumblerRecordInput) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tumblerRecordsService.update(id, updateTumblerRecordInput)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TumblerRecordResolver.prototype.deleteTumblerRecord = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tumblerRecordsService["delete"](id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthAccessGuard),
        graphql_1.Mutation(function () { return tumbler_record_entity_1.TumblerRecord; }, {
            description: '텀블러 기록을 생성합니다. '
        }),
        __param(0, gql_user_param_1.CurrentUser('userAuth')),
        __param(1, graphql_1.Args('input'))
    ], TumblerRecordResolver.prototype, "createTumblerRecord");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthAccessGuard),
        graphql_1.Mutation(function () { return tumbler_record_entity_1.TumblerRecord; }, {
            description: '개인 공간에서의 텀블러 기록을 생성합니다. '
        }),
        __param(0, gql_user_param_1.CurrentUser('user')),
        __param(1, graphql_1.Args('input'))
    ], TumblerRecordResolver.prototype, "createTumblerRecordOnPrivateSpace");
    __decorate([
        common_1.UseGuards(gql_auth_guard_1.GqlAuthAccessGuard),
        graphql_1.Query(function () { return tumbler_record_dto_1.TumblerRecordsOutput; }, {
            description: "\uC720\uC800\uC758 \uBAA8\uB4E0 \uD140\uBE14\uB7EC \uC0AC\uC6A9 \uAE30\uB85D\uACFC \uB204\uC801 \uD560\uC778 \uAE08\uC561, \uD560\uC778 \uD69F\uC218\uB97C \uAC00\uC838\uC635\uB2C8\uB2E4.\n    \uC774\uB54C, \uAC80\uC0C9 \uD544\uD130\uB97C \uC801\uC6A9\uD558\uBA74 \uAC80\uC0C9\uB41C \uD140\uBE14\uB7EC \uAE30\uB85D\uB9CC \uAC00\uC838\uC635\uB2C8\uB2E4. "
        }),
        __param(0, gql_user_param_1.CurrentUser('user')),
        __param(1, graphql_1.Args('searchTumblerRecordInput', {
            nullable: true
        }))
    ], TumblerRecordResolver.prototype, "tumblerRecords");
    __decorate([
        graphql_1.Query(function () { return tumbler_record_entity_1.TumblerRecord; }, {
            description: '텀블러 기록을 하나 가져옵니다.'
        }),
        __param(0, graphql_1.Args('id'))
    ], TumblerRecordResolver.prototype, "tumblerRecord");
    __decorate([
        graphql_1.Mutation(function () { return tumbler_record_entity_1.TumblerRecord; }, {
            description: '텀블러 기록을 수정합니다.'
        }),
        __param(0, graphql_1.Args('id')),
        __param(1, graphql_1.Args('updateTumblerRecordInput'))
    ], TumblerRecordResolver.prototype, "updateTumblerRecord");
    __decorate([
        graphql_1.Mutation(function () { return Boolean; }, {
            description: '텀블러 기록을 삭제합니다.'
        }),
        __param(0, graphql_1.Args('id'))
    ], TumblerRecordResolver.prototype, "deleteTumblerRecord");
    TumblerRecordResolver = __decorate([
        graphql_1.Resolver('TumblerRecord')
    ], TumblerRecordResolver);
    return TumblerRecordResolver;
}());
exports.TumblerRecordResolver = TumblerRecordResolver;
