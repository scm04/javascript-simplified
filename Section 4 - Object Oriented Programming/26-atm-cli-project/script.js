import Account from "./Account.js"
import CommandLine from "./CommandLine.js"

try {
	const accountName = await CommandLine.ask("Which account would you like to access?")
	let account = await Account.find(accountName)
	if (account == null) account = promptCreateAccount(accountName)
	if (account != null) await promptTask(account)
} catch (err) {
	CommandLine.print("ERROR: Please try again.")
}

async function promptCreateAccount(accountName) {
	const response = await CommandLine.ask(
		"That account does not exist. Would you like to create an it? (yes/no)"
	)
	if (response === "yes") {
		return await Account.create(accountName)
	}
}

async function promptTask(account) {
	const response = await CommandLine.ask(
		"What would you like to do? (view/deposit/withdraw)"
	)

	if (response === "deposit") {
		const amount = parseFloat(await CommandLine.ask("How much?"))
		await account.deposit(amount)
	} else if (response === "withdraw") {
		const amount = parseFloat(await CommandLine.ask("How much?"))
		try {
			await account.withdraw(amount)
		} catch (e) {
			CommandLine.print(
				"We were unable to make the withdrawal. Please ensure you have enough money in your account."
			)
		}
	}
	CommandLine.print(`Your balance is ${account.balance}`)
}
