export enum Message {
  FINAL_ERROR = "Something went wrong. It's not you, it's us and we are working on fixing it",
  FORBIDDEN = "You do not have permission to perform this action. If it's a mistake please reach out",
  UNAUTHORIZED = 'You need to login to perform this action',
}

export enum Event {
  LOG_REQUEST = 'LOG_REQUEST',
  LOG_RESPONSE = 'LOG_RESPONSE',
  LOG_ERROR = 'LOG_ERROR',
  LOG_ACTIVITY = 'LOG_ACTIVITY',

  ENTITY_AFTER_LOAD = 'ENTITY_AFTER_LOAD',
  ENTITY_BEFORE_INSERT = 'ENTITY_BEFORE_INSERT',
  ENTITY_AFTER_INSERT = 'ENTITY_AFTER_INSERT',
  ENTITY_BEFORE_UPDATE = 'ENTITY_BEFORE_UPDATE',
  ENTITY_AFTER_UPDATE = 'ENTITY_AFTER_UPDATE',
  ENTITY_BEFORE_REMOVE = 'ENTITY_BEFORE_REMOVE',
  ENTITY_AFTER_REMOVE = 'ENTITY_AFTER_REMOVE',
  ENTITY_BEFORE_TRANSACTION_START = 'ENTITY_BEFORE_TRANSACTION_START',
  ENTITY_AFTER_TRANSACTION_START = 'ENTITY_AFTER_TRANSACTION_START',
  ENTITY_BEFORE_TRANSACTION_COMMIT = 'ENTITY_BEFORE_TRANSACTION_COMMIT',
  ENTITY_AFTER_TRANSACTION_COMMIT = 'ENTITY_AFTER_TRANSACTION_COMMIT',
  ENTITY_BEFORE_TRANSACTION_ROLLBACK = 'ENTITY_BEFORE_TRANSACTION_ROLLBACK',
  ENTITY_AFTER_TRANSACTION_ROLLBACK = 'ENTITY_AFTER_TRANSACTION_ROLLBACK',

  USER_BEFORE_REGISTER = 'USER_BEFORE_REGISTER',
  USER_AFTER_REGISTER = 'USER_AFTER_REGISTER',

  USER_BEFORE_LOGIN = 'USER_BEFORE_LOGIN',
  USER_AFTER_LOGIN = 'USER_AFTER_LOGIN',

  USER_BEFORE_PROFILE_UPDATE = 'USER_BEFORE_PROFILE_UPDATE',
  USER_AFTER_PROFILE_UPDATE = 'USER_AFTER_PROFILE_UPDATE',

  BVN_BEFORE_UPDATE = 'BVN_BEFORE_UPDATE',
  BVN_AFTER_UPDATE = 'BVN_AFTER_UPDATE',

  NEVER_BOUNCE_VERIFY = 'NEVER_BOUNCE_VERIFY',

  BVN_BEFORE_FETCH = 'BVN_BEFORE_FETCH',
  BVN_AFTER_FETCH = 'BVN_AFTER_FETCH',

  ADDRESS_BEFORE_FETCH = 'ADDRESS_BEFORE_FETCH',
  ADDRESS_AFTER_FETCH = 'ADDRESS_AFTER_FETCH',

  IDENTITY_BEFORE_FETCH = 'IDENTITY_BEFORE_FETCH',
  IDENTITY_AFTER_FETCH = 'IDENTITY_AFTER_FETCH',
}

export enum PeriodType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum CommentEntityType {
  Media = 'Media',
}

export enum ActionEntityType {
  Media = 'Media',
  Comment = 'Comment',
  Chat = 'Chat',
  Notification = 'Notification',
}

export enum ActionType {
  Like = 'Like',
  Share = 'Share',
  Bookmark = 'Bookmark',
  Submit = 'Submit',
  Listen = 'Listen',
  Seen = 'Seen',
}

export enum PaymentProcessorType {
  Paystack = 'Paystack',
  Flutterwave = 'Flutterwave',
}

export enum CurrencyType {
  NGN = 'NGN',
}

export enum EarningStatusType {
  'Pending' = 'Pending',
  'Processed' = 'Processed',
}

export enum PayoutStatusType {
  'Pending' = 'Pending',
  'Processed' = 'Processed',
}

export enum UserType {
  USER = 'USER',
  MERCHANT = 'MERCHANT',
}

export enum UserDocumentType {
  'Driver' = 'Driver',
  'NIN' = 'NIN',
  'Passport' = 'Passport',
}
