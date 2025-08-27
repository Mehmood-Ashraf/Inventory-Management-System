export const cardData = [
    {title : "Total Payable", value: 1000000},
    {title : "Total Recievable", value: 2000000},
    {title : "Todays's Sale", value: 200000}
]

export const formattedCardData = cardData.map((item) => ({
  ...item,
  formattedValue: item.value.toLocaleString("en-US", {
    style : "currency",
    currency : "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),
}));