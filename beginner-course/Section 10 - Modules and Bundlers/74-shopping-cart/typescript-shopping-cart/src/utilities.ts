const formatter = new Intl.NumberFormat(undefined, {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0
})

export default function formatCurrency(amount: number) {
	return formatter.format(amount)
}
