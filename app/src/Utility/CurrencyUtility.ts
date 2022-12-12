const currencyFormat = new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" });

export const formatCurrency = (value:number) => {
    return currencyFormat.format(value);
}