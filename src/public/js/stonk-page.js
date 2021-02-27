const CONDITION_TYPE_LABEL = {
  lte: 'less than',
  gte: 'greater than',
}

function getNotifications() {
  console.log(window.location.pathname)
  const ticker = window.location.pathname.split('/')[2]
  fetch('/api/notifications')
    .then((result) => result.json())
    .then(({ notifications }) => {
      console.log(`notifications`, notifications)
      const notifHtml = notifications
        .filter((n) => n.ticker === ticker)
        .map((n) => {
          return `<div>
          ${n.notificationType} when ${
            CONDITION_TYPE_LABEL[n.conditionType]
          } \$${parseFloat(n.targetPrice).toFixed(2)} 
        </div>`
        })
        .join('')
      document.getElementById('notifications').innerHTML = notifHtml
    })
}

getNotifications()

const toggleInfoButton = document.querySelector('button.toggleInfo')
const stonkInfoEl = document.querySelector('.stonkInfo')
const EXPANDED_CLASS = 'stonkInfo_expanded'
toggleInfoButton.addEventListener('click', () => {
  const curClasses = Array.from(stonkInfoEl.classList)
  let newClasses = curClasses
  if (curClasses.includes(EXPANDED_CLASS)) {
    newClasses.pop()
  } else {
    newClasses.push(EXPANDED_CLASS)
  }
  stonkInfoEl.className = newClasses.join(' ')
})
