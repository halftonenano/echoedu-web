/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Classes = "classes",
	Courses = "courses",
	Secrets = "secrets",
	Sessions = "sessions",
	SessionsView = "sessionsView",
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

export type ClassesRecord = {
	course: RecordIdString
	courseName?: string
	teacher: RecordIdString
	teacherName?: string
}

export type CoursesRecord = {
	name: string
}

export type SecretsRecord = {
	value: string
}

export type SessionsRecord = {
	confirmed?: boolean
	datetime?: IsoDateString
	tutee?: RecordIdString
	tutor: RecordIdString
}

export type SessionsViewRecord = {
	confirmed?: boolean
	datetime?: IsoDateString
}

export type TeachersRecord = {
	display: string
	name: string
}

export type TutorsRecord = {
	classes?: RecordIdString[]
	grade: number
	name: string
	user: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ClassesResponse<Texpand = unknown> = Required<ClassesRecord> & BaseSystemFields<Texpand>
export type CoursesResponse<Texpand = unknown> = Required<CoursesRecord> & BaseSystemFields<Texpand>
export type SecretsResponse<Texpand = unknown> = Required<SecretsRecord> & BaseSystemFields<Texpand>
export type SessionsResponse<Texpand = unknown> = Required<SessionsRecord> & BaseSystemFields<Texpand>
export type SessionsViewResponse<Texpand = unknown> = Required<SessionsViewRecord> & BaseSystemFields<Texpand>
export type TeachersResponse<Texpand = unknown> = Required<TeachersRecord> & BaseSystemFields<Texpand>
export type TutorsResponse<Texpand = unknown> = Required<TutorsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	classes: ClassesRecord
	courses: CoursesRecord
	secrets: SecretsRecord
	sessions: SessionsRecord
	sessionsView: SessionsViewRecord
	teachers: TeachersRecord
	tutors: TutorsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	classes: ClassesResponse
	courses: CoursesResponse
	secrets: SecretsResponse
	sessions: SessionsResponse
	sessionsView: SessionsViewResponse
	teachers: TeachersResponse
	tutors: TutorsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'classes'): RecordService<ClassesResponse>
	collection(idOrName: 'courses'): RecordService<CoursesResponse>
	collection(idOrName: 'secrets'): RecordService<SecretsResponse>
	collection(idOrName: 'sessions'): RecordService<SessionsResponse>
	collection(idOrName: 'sessionsView'): RecordService<SessionsViewResponse>
	collection(idOrName: 'teachers'): RecordService<TeachersResponse>
	collection(idOrName: 'tutors'): RecordService<TutorsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
