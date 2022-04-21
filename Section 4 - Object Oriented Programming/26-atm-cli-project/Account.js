import FileSystem from "./FileSystem.js"
export default class Account {
	constructor(name) {
		this.#name = name
	}

	// Static members
	static async find(accountName) {
		const account = new Account(accountName)

		try {
			await account.#load()
			return account
		} catch (err) {
			return
		}
	}

	static async create(accountName) {
		const account = new Account(accountName)

		await FileSystem.write(account.filePath, 0)
		account.#balance = 0

		return account
	}

	// Private members (and their getters/setters)
	#name
	get name() {
		return this.#name
	}

	#balance
	get balance() {
		return this.#balance
	}

	async #load() {
		this.#balance = parseFloat(await FileSystem.read(this.filePath))
	}

	// Public members
	get filePath() {
		return `accounts/${this.name}.txt`
	}

	async deposit(amount) {
		await FileSystem.write(this.filePath, this.balance + amount)
		this.#balance += amount
	}

	async withdraw(amount) {
		if (this.balance < amount) throw new Error("Not enough balance")
		await FileSystem.write(this.filePath, this.balance - amount)
		this.#balance -= amount
	}
}
