/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
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

export type SessionsRecord = {
	date?: IsoDateString
	tutor: RecordIdString
}

export type TeachersRecord = {
	course: string
	display: string
	grade: number
	name: string
}

export type TutorsRecord = {
	grade: number
	name: string
	teachers: RecordIdString[]
	user: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type SessionsResponse<Texpand = unknown> = Required<SessionsRecord> & BaseSystemFields<Texpand>
export type TeachersResponse<Texpand = unknown> = Required<TeachersRecord> & BaseSystemFields<Texpand>
export type TutorsResponse<Texpand = unknown> = Required<TutorsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	sessions: SessionsRecord
	teachers: TeachersRecord
	tutors: TutorsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	sessions: SessionsResponse
	teachers: TeachersResponse
	tutors: TutorsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'sessions'): RecordService<SessionsResponse>
	collection(idOrName: 'teachers'): RecordService<TeachersResponse>
	collection(idOrName: 'tutors'): RecordService<TutorsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
