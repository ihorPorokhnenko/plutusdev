export const formatToCurrency = amount => {
    if (typeof amount === "number") {
        // return (amount).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return "$" + (amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return amount;
}