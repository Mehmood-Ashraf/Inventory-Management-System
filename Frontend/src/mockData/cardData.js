export const cardData = [
    {title : "Total Payable", value: 1000000},
    {title : "Total Recievable", value: 2000000},
    {title : "Todays's Sale", value: 200000},
    {title : "Total Customers", value : 100},
    {title : "Total Products", value : 60},
    {title : "Total Vendors", value : 20}
]

const pkrCards = ["Total Payable", "Total Recievable", "Todays's Sale"]

export const formattedCardData = cardData.map((item) => ({
  ...item,
  formattedValue: pkrCards.includes(item.title) ? `PKR ${item.value.toLocaleString("en-US")}` : item.value.toLocaleString()
}));  