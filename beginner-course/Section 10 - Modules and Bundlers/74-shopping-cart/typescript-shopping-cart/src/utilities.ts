const formatter = new Intl.NumberFormat(undefined, {
	style: "currency",
	currency: "USD"
})

export default function formatCurrency(amount: number) {
	return formatter.format(amount)
}
