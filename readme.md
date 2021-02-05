## stonks page

### frontend requirements:

- [ ] a form that adds stonks to the users saved stonks
  - [ ] input field for ticker
  - [ ] submit button
- [ ] a list of the users saved stonks
  - [ ] pass in the list of stonks to the template

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
- [ ] POST end point for adding a stonk
  - [ ] get the ticker from the body
  - [ ] get the username from req.user
  - [ ] render stonks.ejs
