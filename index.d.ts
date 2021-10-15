export interface CollectionResponse<T> {
	items: T[]
	limit: number
	offset: number
	pageCount: number
	rowCount: number
}

export type MappedIndices = Record<string, {
	Format: string
	Index: string
}>

export interface EventMap {
	Codes?: Record<number, number[]>
	Indices?: Record<string, EventMapIndices[]>
}

interface EventMapIndices {
	Value: any
	Code: number
}

interface DeviceAppLinkExternal {
	type: 'external'
	/** resembles a full URL with placeholders e.g. https://app.whatever/devices/:ID */
	pattern: string
}

interface DeviceAppLinkInternal {
	type: 'internal'
	/** docker image space, e.g. sicon/vacuumlifter */
	app: string
	/** relative path from app, e.g. devices/:ID */
	pattern: string
}

/** Defines how devices should link to a specific view, if empty it uses the generic visualization */
export type DeviceAppLink = DeviceAppLinkExternal | DeviceAppLinkInternal

export interface DeviceInstance {
	ID: number
	Name?: string
	ParentDevID?: number
	AncestorMainDevID?: number
	DeviceClassID?: number
	Subinterface?: string
	RegStatusID: 1 | 2 | 3 | 4 | 5 | 6 | 7
	GuiDD_ID?: number
	DeviceDescription?: string
	LocationID?: number
	ConnectionState?: boolean
	ManuallyDeactivated?: boolean
	Active: string
	SerialNumber?: string
	ShortName?: string
	SampleRate?: string
	MQTT_Protocol?: string
	allowDelete: boolean
	ExportCloud: boolean
	Hidden: boolean
	CreatedOn: Date
	AppLink: DeviceAppLink
	EventMap: EventMap
	UID?: string
}

export interface DeviceClass {
	ID: number
	GuiDD_ID?: number
	DeviceID?: number
	VendorID?: number
	DeviceDescriptionAvailable?: boolean
	DeviceDescriptionIconName?: string
	DocumentationNames?: string
	PictureFileName?: string
	ProductID?: string
	ProductName?: string
	DeviceType?: string
	DeviceSubType?: string
	Description?: string
	IconFileName?: string
	PDbitLengthIn?: boolean
	PDbitLengthOut?: boolean
	PDbitLengthObserve?: boolean
	AllowFirmwareUpload: boolean
}

export type Device = DeviceClass & DeviceInstance
export type Hardware = Device & {
	ProductionStatus: ProductionStatus
}

export interface ProductionStatus {
	Status: 'incident' | 'maintenance' | 'changeover' | 'idle' | 'producing' | 'off'
	Context: Event
}

export interface DeviceData {
	Subtable: string
	ID: number
	DevID: number
	DataTypeID: 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
	BitLength?: number
	BitOffset?: number
	Index?: number
	Subindex?: number
	Dynamic?: boolean
	ModifiesOtherVariables?: boolean
	MQTTName?: string
	SubtopicID?: number
	Active?: boolean
	ParameterID?: string
	Access?: string
	MQTTLabel?: string
	Label?: string
	Range?: string
	Gradient?: string
	Resolution?: string
	Value?: string
	DefaultValue?: string
	Unit?: string
	Remark?: string
	ParameterDescriptor?: string
	RepresentationID?: string
	ParameterGroup0?: string
	ParameterGroup1?: string
	ParameterGroup2?: string
	ParameterGroup3?: string
	Offset?: string
	SubDataTypeID?: string
	SubBitLength?: string
	SubRange?: string
	SubParameterDescriptor?: string
	SubindexAccessSupported?: string
	RequestObject?: string
	SamplingRate?: string
	ByteOrder?: string
	ConditionID?: string
	SuccessStatus?: boolean
	LastSuccessDate?: Date
	DataType: string
}

export interface EventClass {
	DevID: number
	Code: number
	EventTypesID: number
	Name?: string
	Remark?: string
	Description?: string
	Cause?: string
	Impact?: string
	Solution?: string
	Source?: string
}

export interface EventInstance {
	TimestampAPPEARS: Date
	TimestampDISAPPEARS: Date
}

export type Event = EventClass & EventInstance & {
	Type: 'Warning' | 'Error' | 'Notification' | 'Unknown'
}

export interface EventGroup {
	groupName: string
	eventCodes: number[]
	computed: EventGroupComputed[]
}

export interface EventGroupComputed {
	name: string
	equation: string
}

export interface EventGroupDataQuery {
	/** If no start given, use start of time (`new Date(0)`) as start */
	rangeStart?: Date
	/** If no end given, use now (`new Date()`) as end */
	rangeEnd?: Date
	/** list of groupnames to fetch, if not defined, respond with all groups */
	groups?: string[]
}

export interface EventGroupQuery {
	/** If no start given, use start of time (`new Date(0)`) as start */
	rangeStart?: Date
	/** If no end given, use now (`new Date()`) as end */
	rangeEnd?: Date
	/** list of groupnames to fetch, if not defined, respond with all groups */
	groups?: string[]
}

export interface EventGroupDataProperty {
	Name: string
	Value: number
	Unit?: string
}

export interface EventGroupDataMQTTMessage {
	name: string
	property: EventGroupDataProperty
}

export interface EventGroupData {
	name: string
	properties: EventGroupDataProperty[]
}
