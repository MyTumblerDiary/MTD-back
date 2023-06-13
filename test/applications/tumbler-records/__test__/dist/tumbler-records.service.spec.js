"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var testing_1 = require("@nestjs/testing");
var create_tumbler_record_transaction_1 = require("src/applications/tumbler-records/transactions/create.tumbler-record.transaction");
var tumbler_records_module_1 = require("src/applications/tumbler-records/tumbler-records.module");
var tumbler_records_service_1 = require("src/applications/tumbler-records/tumbler-records.service");
var users_service_1 = require("src/applications/users/users.service");
var mock_tumbler_records_repository_1 = require("../mocks/mock.tumbler-records.repository");
var tumbler_records_builder_1 = require("../mocks/tumbler-records.builder");
describe('TumblerRecordsService', function () {
    var service;
    var mockBuilder;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockBuilder = new tumbler_records_builder_1.TumblerRecordBuilder();
                    return [4 /*yield*/, testing_1.Test.createTestingModule({
                            providers: [
                                tumbler_records_service_1.TumblerRecordsService,
                                {
                                    provide: users_service_1.UserService,
                                    useValue: {
                                        findOneByEmail: jest.fn()
                                    }
                                },
                                create_tumbler_record_transaction_1["default"],
                                {
                                    provide: tumbler_records_module_1.TUMBLER_RECORDS_REPOSITORY,
                                    useValue: mock_tumbler_records_repository_1.MockTumblerRecordsTypeOrmRepository
                                },
                            ]
                        })
                            .overrideProvider(create_tumbler_record_transaction_1["default"])
                            .useFactory({
                            factory: function () { return ({
                                run: function (input) {
                                    return mockBuilder.build(__assign(__assign({}, input.createTumblerRecordInput), { store: input.createStoreInput, user: input.userAuth }));
                                }
                            }); }
                        })
                            .compile()];
                case 1:
                    module = _a.sent();
                    service = module.get(tumbler_records_service_1.TumblerRecordsService);
                    return [2 /*return*/];
            }
        });
    }); });
    it('서비스가 정의된다. ', function () {
        expect(service).toBeDefined();
    });
    describe('createWithTransaction', function () {
        var createTumblerRecordInput;
        var createStoreInput;
        var userAuth;
        beforeEach(function () {
            createTumblerRecordInput = {
                prices: 1000,
                memo: 'test',
                imageFileKey: 'test_key.jpg',
                placeType: 'STORE',
                usedAt: "2023-01-01"
            };
            createStoreInput = {
                name: 'test',
                discountPrice: 100,
                streetNameAddress: 'Test Street Name Address',
                lotNumberAddress: 'Test Lot Number Address',
                detailAddress: 'Test Detail Address',
                kakaoUId: 'test',
                latitude: 103.7,
                longitude: 114.5,
                imageFileKey: 'test_key.jpg'
            };
            userAuth = {
                id: 'test',
                email: 'test@test.com'
            };
        });
        it('메서드가 정의된다. ', function () {
            expect(service.createWithTransaction).toBeDefined();
        });
        it('주어진 데이터로 올바르게 트랜잭션을 호출하고 결과값을 받아온다. ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createTumblerRecordTransactionInput, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createTumblerRecordTransactionInput = {
                            createTumblerRecordInput: createTumblerRecordInput,
                            createStoreInput: createStoreInput,
                            userAuth: userAuth
                        };
                        return [4 /*yield*/, service.createWithTransaction(createTumblerRecordTransactionInput, userAuth)];
                    case 1:
                        result = _a.sent();
                        // then
                        expect(result).toEqual(mockBuilder.build(__assign(__assign({}, createTumblerRecordInput), { store: createStoreInput, user: userAuth })));
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
