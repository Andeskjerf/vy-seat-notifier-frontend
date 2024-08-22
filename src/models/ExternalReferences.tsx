export default class ExternalReferences {
	origin: string
	code: string

	constructor(origin: string, code: string) {
		this.origin = origin
		this.code = code
	}

	static fromJson(json): ExternalReferences {
		return new ExternalReferences(
			json.origin,
			json.code,
		)
	}
}
