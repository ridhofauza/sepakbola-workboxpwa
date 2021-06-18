const dbPromised = idb.open('EL-SB', 1, (upgradeDb) => {
  const scheduleObjectStore = upgradeDb.createObjectStore('schedule', {
    keyPath: 'idParam'
  })
  const teamsObjectStore = upgradeDb.createObjectStore('teams', {
    keyPath: 'id'
  })
  teamsObjectStore.createIndex('name', 'name', { unique: false })
  scheduleObjectStore.createIndex('idParam', 'idParam', { unique: false })
})

function saveSchedule (schedule) {
  dbPromised
    .then((db) => {
      const tx = db.transaction('schedule', 'readwrite')
      const store = tx.objectStore('schedule')
      console.log(schedule)
      store.put(schedule)
      return tx.complete
    })
    .then(() => {
      console.log('Schedule berhasil disimpan')
    })
}

function saveTeams (teams) {
  dbPromised
    .then((db) => {
      const tx = db.transaction('teams', 'readwrite')
      const store = tx.objectStore('teams')
      console.log(teams)
      store.put(teams)
      return tx.complete
    })
}

function getTeams () {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction('teams', 'readonly')
        const store = tx.objectStore('teams')
        return store.getAll()
      })
      .then((teams) => {
        resolve(teams)
      })
  })
}

function getSchedById (id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction('schedule', 'readonly')
        const store = tx.objectStore('schedule')
        return store.get(id)
      })
      .then((schedule) => {
        resolve(schedule)
      })
  })
}

function deleteSchedule (id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        // schedule
        const tx = db.transaction('schedule', 'readwrite')
        const store = tx.objectStore('schedule')
        store.delete(id)
        return tx.complete
      })
      .then(() => {
        const status = true
        resolve(status)
      })
  })
}

function deleteTeams (id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
      // teams
        const tx = db.transaction('teams', 'readwrite')
        const store = tx.objectStore('teams')
        store.delete(id)
        return tx.complete
      }).then(() => {
        const status = true
        resolve(status)
      })
  })
}
