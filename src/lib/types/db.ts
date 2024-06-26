/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Applications = "applications",
	AutoNhsIds = "autoNhsIds",
	Classes = "classes",
	Courses = "courses",
	Notifications = "notifications",
	Phones = "phones",
	Secrets = "secrets",
	Sessions = "sessions",
	Teachers = "teachers",
	Tutors = "tutors",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ApplicationsRecord = {
	user: RecordIdString
}

export type AutoNhsIdsRecord = {
	email: string
}

export type ClassesRecord = {
	course: RecordIdString
	courseName?: string
	teacher: RecordIdString
	teacherName?: string
}

export type CoursesRecord = {
	name: string
}

export enum NotificationsReasonOptions {
	"reminder/5mins" = "reminder/5mins",
	"reminder/morning" = "reminder/morning",
	"booking/new" = "booking/new",
	"booking/canceled" = "booking/canceled",
}
export type NotificationsRecord = {
	datetime: IsoDateString
	phone: RecordIdString
	reason?: NotificationsReasonOptions
	session?: RecordIdString
	tutee?: boolean
	user?: RecordIdString
}

export enum PhonesCarrierOptions {
	"alltel" = "alltel",
	"att" = "att",
	"boost" = "boost",
	"consumer" = "consumer",
	"cricket" = "cricket",
	"googlefi" = "googlefi",
	"metropcs" = "metropcs",
	"republic" = "republic",
	"sprint" = "sprint",
	"tmobile" = "tmobile",
	"ting" = "ting",
	"uscellular" = "uscellular",
	"verizon" = "verizon",
	"virgin" = "virgin",
	"xfinity" = "xfinity",
	"mint" = "mint",
}
export type PhonesRecord = {
	carrier: PhonesCarrierOptions
	confirmed?: boolean
	number: number
	user: RecordIdString
}

export type SecretsRecord = {
	value: string
}

export type SessionsRecord = {
	datetime: IsoDateString
	location?: string
	tutee?: RecordIdString
	tutor: RecordIdString
}

export type TeachersRecord = {
	display: string
	name: string
}

export type TutorsRecord = {
	classes?: RecordIdString[]
	isNHS?: boolean
	name: string
	user: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	avatarUrl?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ApplicationsResponse<Texpand = unknown> = Required<ApplicationsRecord> & BaseSystemFields<Texpand>
export type AutoNhsIdsResponse<Texpand = unknown> = Required<AutoNhsIdsRecord> & BaseSystemFields<Texpand>
export type ClassesResponse<Texpand = unknown> = Required<ClassesRecord> & BaseSystemFields<Texpand>
export type CoursesResponse<Texpand = unknown> = Required<CoursesRecord> & BaseSystemFields<Texpand>
export type NotificationsResponse<Texpand = unknown> = Required<NotificationsRecord> & BaseSystemFields<Texpand>
export type PhonesResponse<Texpand = unknown> = Required<PhonesRecord> & BaseSystemFields<Texpand>
export type SecretsResponse<Texpand = unknown> = Required<SecretsRecord> & BaseSystemFields<Texpand>
export type SessionsResponse<Texpand = unknown> = Required<SessionsRecord> & BaseSystemFields<Texpand>
export type TeachersResponse<Texpand = unknown> = Required<TeachersRecord> & BaseSystemFields<Texpand>
export type TutorsResponse<Texpand = unknown> = Required<TutorsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	applications: ApplicationsRecord
	autoNhsIds: AutoNhsIdsRecord
	classes: ClassesRecord
	courses: CoursesRecord
	notifications: NotificationsRecord
	phones: PhonesRecord
	secrets: SecretsRecord
	sessions: SessionsRecord
	teachers: TeachersRecord
	tutors: TutorsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	applications: ApplicationsResponse
	autoNhsIds: AutoNhsIdsResponse
	classes: ClassesResponse
	courses: CoursesResponse
	notifications: NotificationsResponse
	phones: PhonesResponse
	secrets: SecretsResponse
	sessions: SessionsResponse
	teachers: TeachersResponse
	tutors: TutorsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'applications'): RecordService<ApplicationsResponse>
	collection(idOrName: 'autoNhsIds'): RecordService<AutoNhsIdsResponse>
	collection(idOrName: 'classes'): RecordService<ClassesResponse>
	collection(idOrName: 'courses'): RecordService<CoursesResponse>
	collection(idOrName: 'notifications'): RecordService<NotificationsResponse>
	collection(idOrName: 'phones'): RecordService<PhonesResponse>
	collection(idOrName: 'secrets'): RecordService<SecretsResponse>
	collection(idOrName: 'sessions'): RecordService<SessionsResponse>
	collection(idOrName: 'teachers'): RecordService<TeachersResponse>
	collection(idOrName: 'tutors'): RecordService<TutorsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
