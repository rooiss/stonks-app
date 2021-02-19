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
