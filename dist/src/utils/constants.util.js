"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDocumentType = exports.UserType = exports.PayoutStatusType = exports.EarningStatusType = exports.CurrencyType = exports.PaymentProcessorType = exports.ActionType = exports.ActionEntityType = exports.CommentEntityType = exports.PeriodType = exports.Event = exports.Message = void 0;
var Message;
(function (Message) {
    Message["FINAL_ERROR"] = "Something went wrong. It's not you, it's us and we are working on fixing it";
    Message["FORBIDDEN"] = "You do not have permission to perform this action. If it's a mistake please reach out";
    Message["UNAUTHORIZED"] = "You need to login to perform this action";
})(Message = exports.Message || (exports.Message = {}));
var Event;
(function (Event) {
    Event["LOG_REQUEST"] = "LOG_REQUEST";
    Event["LOG_RESPONSE"] = "LOG_RESPONSE";
    Event["LOG_ERROR"] = "LOG_ERROR";
    Event["LOG_ACTIVITY"] = "LOG_ACTIVITY";
    Event["ENTITY_AFTER_LOAD"] = "ENTITY_AFTER_LOAD";
    Event["ENTITY_BEFORE_INSERT"] = "ENTITY_BEFORE_INSERT";
    Event["ENTITY_AFTER_INSERT"] = "ENTITY_AFTER_INSERT";
    Event["ENTITY_BEFORE_UPDATE"] = "ENTITY_BEFORE_UPDATE";
    Event["ENTITY_AFTER_UPDATE"] = "ENTITY_AFTER_UPDATE";
    Event["ENTITY_BEFORE_REMOVE"] = "ENTITY_BEFORE_REMOVE";
    Event["ENTITY_AFTER_REMOVE"] = "ENTITY_AFTER_REMOVE";
    Event["ENTITY_BEFORE_TRANSACTION_START"] = "ENTITY_BEFORE_TRANSACTION_START";
    Event["ENTITY_AFTER_TRANSACTION_START"] = "ENTITY_AFTER_TRANSACTION_START";
    Event["ENTITY_BEFORE_TRANSACTION_COMMIT"] = "ENTITY_BEFORE_TRANSACTION_COMMIT";
    Event["ENTITY_AFTER_TRANSACTION_COMMIT"] = "ENTITY_AFTER_TRANSACTION_COMMIT";
    Event["ENTITY_BEFORE_TRANSACTION_ROLLBACK"] = "ENTITY_BEFORE_TRANSACTION_ROLLBACK";
    Event["ENTITY_AFTER_TRANSACTION_ROLLBACK"] = "ENTITY_AFTER_TRANSACTION_ROLLBACK";
    Event["USER_BEFORE_REGISTER"] = "USER_BEFORE_REGISTER";
    Event["USER_AFTER_REGISTER"] = "USER_AFTER_REGISTER";
    Event["USER_BEFORE_LOGIN"] = "USER_BEFORE_LOGIN";
    Event["USER_AFTER_LOGIN"] = "USER_AFTER_LOGIN";
    Event["USER_BEFORE_PROFILE_UPDATE"] = "USER_BEFORE_PROFILE_UPDATE";
    Event["USER_AFTER_PROFILE_UPDATE"] = "USER_AFTER_PROFILE_UPDATE";
    Event["BVN_BEFORE_UPDATE"] = "BVN_BEFORE_UPDATE";
    Event["BVN_AFTER_UPDATE"] = "BVN_AFTER_UPDATE";
    Event["NEVER_BOUNCE_VERIFY"] = "NEVER_BOUNCE_VERIFY";
    Event["BVN_BEFORE_FETCH"] = "BVN_BEFORE_FETCH";
    Event["BVN_AFTER_FETCH"] = "BVN_AFTER_FETCH";
    Event["ADDRESS_BEFORE_FETCH"] = "ADDRESS_BEFORE_FETCH";
    Event["ADDRESS_AFTER_FETCH"] = "ADDRESS_AFTER_FETCH";
    Event["IDENTITY_BEFORE_FETCH"] = "IDENTITY_BEFORE_FETCH";
    Event["IDENTITY_AFTER_FETCH"] = "IDENTITY_AFTER_FETCH";
})(Event = exports.Event || (exports.Event = {}));
var PeriodType;
(function (PeriodType) {
    PeriodType["DAILY"] = "DAILY";
    PeriodType["WEEKLY"] = "WEEKLY";
    PeriodType["MONTHLY"] = "MONTHLY";
    PeriodType["YEARLY"] = "YEARLY";
})(PeriodType = exports.PeriodType || (exports.PeriodType = {}));
var CommentEntityType;
(function (CommentEntityType) {
    CommentEntityType["Media"] = "Media";
})(CommentEntityType = exports.CommentEntityType || (exports.CommentEntityType = {}));
var ActionEntityType;
(function (ActionEntityType) {
    ActionEntityType["Media"] = "Media";
    ActionEntityType["Comment"] = "Comment";
    ActionEntityType["Chat"] = "Chat";
    ActionEntityType["Notification"] = "Notification";
})(ActionEntityType = exports.ActionEntityType || (exports.ActionEntityType = {}));
var ActionType;
(function (ActionType) {
    ActionType["Like"] = "Like";
    ActionType["Share"] = "Share";
    ActionType["Bookmark"] = "Bookmark";
    ActionType["Submit"] = "Submit";
    ActionType["Listen"] = "Listen";
    ActionType["Seen"] = "Seen";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
var PaymentProcessorType;
(function (PaymentProcessorType) {
    PaymentProcessorType["Paystack"] = "Paystack";
    PaymentProcessorType["Flutterwave"] = "Flutterwave";
})(PaymentProcessorType = exports.PaymentProcessorType || (exports.PaymentProcessorType = {}));
var CurrencyType;
(function (CurrencyType) {
    CurrencyType["NGN"] = "NGN";
})(CurrencyType = exports.CurrencyType || (exports.CurrencyType = {}));
var EarningStatusType;
(function (EarningStatusType) {
    EarningStatusType["Pending"] = "Pending";
    EarningStatusType["Processed"] = "Processed";
})(EarningStatusType = exports.EarningStatusType || (exports.EarningStatusType = {}));
var PayoutStatusType;
(function (PayoutStatusType) {
    PayoutStatusType["Pending"] = "Pending";
    PayoutStatusType["Processed"] = "Processed";
})(PayoutStatusType = exports.PayoutStatusType || (exports.PayoutStatusType = {}));
var UserType;
(function (UserType) {
    UserType["USER"] = "USER";
    UserType["MERCHANT"] = "MERCHANT";
})(UserType = exports.UserType || (exports.UserType = {}));
var UserDocumentType;
(function (UserDocumentType) {
    UserDocumentType["Driver"] = "Driver";
    UserDocumentType["NIN"] = "NIN";
    UserDocumentType["Passport"] = "Passport";
})(UserDocumentType = exports.UserDocumentType || (exports.UserDocumentType = {}));
//# sourceMappingURL=constants.util.js.map