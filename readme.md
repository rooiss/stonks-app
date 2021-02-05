## stonks page

### frontend requirements:

- a form that adds stonks to the users saved stonks
  - input field for ticker
  - submit button
- a list of the users saved stonks
  - pass in the list of stonks to the template

### backend requirements:

- stonks store
  - an array of objects
  - each object contains
    - user id
    - ticker
  - methods of the stonks store
    - get all stonks by userid (getStonksByUserId)
      - arg: userId
    - save stonk (saveStonk)
      - arg: userId, ticker
- POST end point for adding a stonk
  - get the ticker from the body
  - get the username from req.user
  - render stonks.ejs
