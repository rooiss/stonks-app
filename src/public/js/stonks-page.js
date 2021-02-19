const fetchStonkPrices = () => {
  // do fetch call to stonk price API
  fetch('/api/stonks')
    .then((response) => response.json())
    .then((data) => {
      data.stonks.forEach(({ ticker, price }) => {
        document.getElementById(`ticker-${ticker}`).innerText = price
      })
    })
}

fetchStonkPrices()
