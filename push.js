const webPush = require('web-push')

const vapidKeys = {
  publicKey: 'BD2i1Aioru7eE1NRvfljS18prc0B1wtEbgHIuAWUh1aRDx76UOU0X3bomap-sqny1AnGuLkU2dCRc5zh6mJ7kQ4',
  privateKey: 'anjnG1VmqGgLyIlTnC1t8pOjMdaj_6hoctlkzPqnW6w'
}

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/d5UNYeVtFmo:APA91bE6dDuIF3ZoOKeO1fkPQi_vW3yjb_-SypSO_-9QVwge5xb5xNceST2E4advV-aCyWTivyye4ae62lA4RV14mmJy8_ozDTv5gwXFH29ixGfkQd2gFhrUlktFRe7jh6610tMT6n59',
  keys: {
    p256dh: 'BAvSvn9r8VDWB5tuAI+9tow7sZYeT4wONL+0uoxv6SXwTDDfSecEDPwTspjJAX+A405HqSezRquXoru9QEGonrA=',
    auth: 'ChA1bBIAjyw2OVMdIOWvpg=='
  }
}

const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi'

const options = {
  gcmAPIKey: '275474605632',
  TTL: 60
}
webPush.sendNotification(
  pushSubscription,
  payload,
  options
)
