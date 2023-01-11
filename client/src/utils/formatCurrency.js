// format currency when passed an amount and currency
export const formatCurrency = (amount, currency) => {
	// create a new Intl.NumberFormat object
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		currencyDisplay: "symbol",
	});

	// return the formatted currency
	return formatter.format(amount);
};
