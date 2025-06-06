/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export enum Collections {
  Bookmarks = "bookmarks",
  Categories = "categories",
  Teams = "teams",
  Users = "users",
  Whitelist = "whitelist",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

type ExpandType<T> = unknown extends T
  ? T extends unknown
    ? { expand?: unknown }
    : { expand: T }
  : { expand: T };

// System fields
export type BaseSystemFields<T = unknown> = {
  id: RecordIdString;
  collectionId: string;
  collectionName: Collections;
} & ExpandType<T>;

export type AuthSystemFields<T = unknown> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type BookmarksRecord = {
  categories: RecordIdString[];
  icon?: string;
  name: string;
  order?: number;
  url: string;
};

export type CategoriesRecord = {
  color?: string;
  icon?: string;
  name: string;
  order?: number;
};

export type TeamsRecord = {
  categories?: RecordIdString[];
  name: string;
};

export type UsersRecord = {
  avatar?: string;
  is_admin?: boolean;
  name?: string;
  teams?: RecordIdString[];
};

export type WhitelistRecord = {
  email: string;
  is_active?: boolean;
  user?: RecordIdString[];
};

// Response types include system fields and match responses from the PocketBase API
export type BookmarksResponse<Texpand = unknown> = Required<BookmarksRecord> &
  BaseSystemFields<Texpand>;
export type CategoriesResponse<Texpand = unknown> = Required<CategoriesRecord> &
  BaseSystemFields<Texpand>;
export type TeamsResponse<Texpand = unknown> = Required<TeamsRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;
export type WhitelistResponse<Texpand = unknown> = Required<WhitelistRecord> &
  BaseSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  bookmarks: BookmarksRecord;
  categories: CategoriesRecord;
  teams: TeamsRecord;
  users: UsersRecord;
  whitelist: WhitelistRecord;
};

export type CollectionResponses = {
  bookmarks: BookmarksResponse;
  categories: CategoriesResponse;
  teams: TeamsResponse;
  users: UsersResponse;
  whitelist: WhitelistResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: "bookmarks"): RecordService<BookmarksResponse>;
  collection(idOrName: "categories"): RecordService<CategoriesResponse>;
  collection(idOrName: "teams"): RecordService<TeamsResponse>;
  collection(idOrName: "users"): RecordService<UsersResponse>;
  collection(idOrName: "whitelist"): RecordService<WhitelistResponse>;
};
