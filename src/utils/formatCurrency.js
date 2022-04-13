export const formatToCurrency = amount => {
    if (typeof amount === "number") {
        // return (amount).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return "$" + (amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return amount;
}

export const convertToBTC = price => {
    return Number(price) * 0.00002356;
}

export const convertToETH = price => {
    return Number(price) * 0.00033269;
}

export const convertToUSDC = price => {
    return Number(price) * 0.99990054;
}
