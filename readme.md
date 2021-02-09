## stonks page

### frontend requirements:

- [x] a form that adds stonks to the users saved stonks
  - [x] input field for ticker
  - [x] submit button
- [x] a list of the users saved stonks
  - [x] pass in the list of stonks to the template
- [x] add empty elements where prices will go for each stonk
  - [x] each empty element should have an id using the ticker
- [ ] on page load make an ajax request to get the prices for all tickers
  - [x] fill in the empty elements with appropriate prices
- [ ] if the market is open make another ajax request every 3 seconds

### backend requirements:

- [x] stonks store
  - [x] an array of objects, stored in a file
  - [x] each object contains
    - [x] user id
    - [x] ticker
  - [x] methods of the stonks store
    - [x] get all stonks by userid (getStonksByUserId)
      - [x] arg: userId
    - [x] save stonk (saveStonk)
      - [x] arg: userId, ticker
- [x] POST end point for adding a stonk
  - [x] get the ticker from the body
  - [x] get the username from req.user
  - [x] render stonks.ejs
- [x] GET end point for retrieving stonk prices
  - [x] get stonks for the given user
  - [x] fetch prices from API
  - [x] return results
