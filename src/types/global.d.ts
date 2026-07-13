// Types for next-intl messages
type Messages = typeof import("../../messages/en.json").default;
declare interface IntlMessages extends Messages {}
