# STONKS

## Tech Debt

- [ ] convert project to typescript
- [ ] move routes to separate route files, under `/routes/*`
- [ ] move json read logic into utility function(s) for stores
- [ ] prettier config
- [ ] continuous integration

## stonks page

### frontend requirements:

- [x] a form that adds stonks to the users saved stonks
  - [x] input field for ticker
  - [x] submit button
- [x] a list of the users saved stonks
  - [x] pass in the list of stonks to the template
- [x] add empty elements where prices will go for each stonk
  - [x] each empty element should have an id using the ticker
- [x] on page load make an ajax request to get the prices for all tickers
  - [x] fill in the empty elements with appropriate prices

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

## stonk page

### frontend requirements:

- [x] new ejs template for single stonk metadata
  - [x] show various metadata from api
  - [x] render DD for this stonk and user, using markdown to HTML converter (DD is stored as markdown)
  - [x] add link under rendered DD to edit the DD
- [x] new ejs template for updating DD
  - [x] form for updating DD (method = POST, action is to the new POST endpoint for upserting DD)
  - [x] textarea containing existing markdown DD (if there is any)
  - [x] submit button

### backend requirements:

- [x] GET end point for rendering single stonk page
  - [x] should have param in url for ticker
- [x] add methods to the stonks store
  - [x] getStonkData
  - [x] upsertDD (insert or update)
  - [x] getDD (takes two arg, username and ticker)
- [x] POST end point for upserting DD for a given ticker
  - [x] upon success redirect to metadata stonk page with param

## Game Plan

- [ ] finish notifications (actually notifying, email / text)
- [x] switch to ts (ongoing process)
- [x] switch to mongodb
- [x] redis for sessions
- [ ] deploy to digital ocean (cd, continuous deployment)
- [ ] ci (continuous integration, tests automatically running) on github
- [ ] styling
