const base_url = 'https://api.football-data.org/v2/'
const apiKEY = '9c6c8406aab041b2a05bd976631d751e'

// dipanggil jika fetch berhasil
function status (response) {
  if (response.status !== 200) {
    console.log('Error: ' + response.status)
    return Promise.reject(new Error(response.statusText))
  } else {
    return Promise.resolve(response)
  }
}

// memparsing json menjadi array
function json (response) {
  return response.json()
}

// menghandle kesalahan di blok catch
function error (error) {
  console.log('Error: ' + error)
}

// request data json daftar team
function getListTeams () {
  if ('caches' in window) {
    caches.match(base_url + '/competitions/2021/teams', {
      headers: {
        'X-Auth-Token': apiKEY
      }
    })
      .then((response) => {
        if (response) {
          response.json().then((data) => {
            let teamsHTML = ''
            data.teams.forEach((team) => {
              teamsHTML += `
            <div class="card">
                <div class="card-image">
                  <a href="./matchteam.html?id=${team.id}">
                    <img src="${team.crestUrl}" alt="team-image">
                    <span class="card-title">${team.name}</span>
                  </a>
                </div>
                <div class="card-content">
                  <b>Alamat:</b> ${team.address} <br />
                  <b>Telepon:</b> ${team.phone} <br />
                  <b>Website:</b> ${team.website} <br />
                  <b>E-mail:</b> ${team.email} <br />
                  <b>Tahun didirikan:</b> ${team.founded} <br />
                  <b>Arena:</b> ${team.venue}
                </div>
              </div>
            `
            })
            document.getElementById('list-tim').innerHTML = teamsHTML
          })
        }
      })
  }

  fetch(base_url + '/competitions/2021/teams', {
    headers: {
      'X-Auth-Token': apiKEY
    }
  }
  )
    .then(status)
    .then(json)
    .then(function (data) {
      let teamsHTML = ''
      data.teams.forEach((team) => {
        teamsHTML += `
        <div class="card">
            <div class="card-image">
              <a href="./matchteam.html?id=${team.id}">
                <img src="${team.crestUrl}" alt="team-image">
                <span class="card-title">${team.name}</span>
              </a>
            </div>
            <div class="card-content">
              <b>Alamat:</b> ${team.address} <br />
              <b>Telepon:</b> ${team.phone} <br />
              <b>Website:</b> ${team.website} <br />
              <b>E-mail:</b> ${team.email} <br />
              <b>Tahun didirikan:</b> ${team.founded} <br />
              <b>Arena:</b> ${team.venue}
            </div>
          </div>
        `
      })
      document.getElementById('list-tim').innerHTML = teamsHTML
    })
    .catch(error)
}

// ---Get Teams By Id
function getTeamsById () {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')

    if ('caches' in window) {
      caches.match(base_url + `teams/${idParam}`, {
        headers: {
          'X-Auth-Token': apiKEY
        }
      })
        .then((response) => {
          if (response) {
            response.json().then((data) => {
              resolve(data)
            })
          }
        })
    }

    fetch(base_url + `teams/${idParam}`, {
      headers: {
        'X-Auth-Token': apiKEY
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {
        resolve(data)
      })
  })
}

// request data json klasemen/standings
function getStandings () {
  if ('caches' in window) {
    caches.match(base_url + 'competitions/2021/standings', {
      headers: {
        'X-Auth-Token': apiKEY
      }
    })
      .then((response) => {
        if (response) {
          response.json().then((data) => {
            let standingsHTML = ''
            data.standings[0].table.forEach((standing) => {
              standingsHTML += `
              <tr>
                <td class="valign center">${standing.position}</td>
                <td><img src="${standing.team.crestUrl}" class="logo-img" alt="logo"> ${standing.team.name}</td>
                <td>${standing.playedGames}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.goalsFor}</td>
                <td>${standing.goalsAgainst}</td>
                <td>${standing.goalDifference}</td>
                <td>${standing.points}</td>
              </tr>
              `
            })
            document.getElementById('table-standings').innerHTML = standingsHTML
          })
        }
      })
  }

  fetch(base_url + 'competitions/2021/standings', {
    headers: {
      'X-Auth-Token': apiKEY
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      let standingsHTML = ''
      data.standings[0].table.forEach((standing) => {
        standingsHTML += `
        <tr>
          <td class="valign center">${standing.position}</td>
          <td><img src="${standing.team.crestUrl}" class="logo-img" alt="logo"> ${standing.team.name}</td>
          <td>${standing.playedGames}</td>
          <td>${standing.won}</td>
          <td>${standing.draw}</td>
          <td>${standing.lost}</td>
          <td>${standing.goalsFor}</td>
          <td>${standing.goalsAgainst}</td>
          <td>${standing.goalDifference}</td>
          <td>${standing.points}</td>
        </tr>
        `
      })
      document.querySelector('.center-loader').remove()
      document.getElementById('table-standings').innerHTML = standingsHTML
    })
}

// request data json schedule
function getSchedules () {
  if ('caches' in window) {
    caches.match(base_url + 'competitions/2021/matches?status=SCHEDULED', {
      headers: {
        'X-Auth-Token': apiKEY
      }
    })
      .then((response) => {
        if (response) {
          response.json().then((data) => {
            let scheduleHTML = ''
            const date = (tgl) => {
              const newDate = new Date(tgl)
              return newDate
            }
            data.matches.forEach((match) => {
              scheduleHTML += `
              <tr>
                <td class="valign center">
                  ${match.homeTeam.name}
                  <br>vs<br>
                  ${match.awayTeam.name}
                </td>
                <td class="valign center">${date(match.utcDate)}</td>
              </tr>
              `
            })
            document.getElementById('table-schedules').innerHTML = scheduleHTML
          })
        }
      })
  }

  fetch(base_url + 'competitions/2021/matches?status=SCHEDULED', {
    headers: {
      'X-Auth-Token': apiKEY
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      let scheduleHTML = ''
      const date = (tgl) => {
        const newDate = new Date(tgl)
        return newDate
      }
      data.matches.forEach((match) => {
        scheduleHTML += `
        <tr>
          <td class="valign center">
            ${match.homeTeam.name}
            <br>vs<br>
            ${match.awayTeam.name}
          </td>
          <td class="valign center">${date(match.utcDate)}</td>
        </tr>
        `
      })
      document.querySelector('.center-loader').remove()
      document.getElementById('table-schedules').innerHTML = scheduleHTML
    })
}

// ---Get schedules By id
function getSchedulesById () {
  return new Promise((resolve, reject) => {
    // ambil parameter id
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')

    if ('caches' in window) {
      caches.match(base_url + `teams/${idParam}/matches?status=SCHEDULED`, {
        headers: {
          'X-Auth-Token': apiKEY
        }
      })
        .then((response) => {
          if (response) {
            response.json().then((data) => {
              let scheduleHTML = ''
              const date = (tgl) => {
                const newDate = new Date(tgl)
                return newDate
              }

              data.matches.forEach((match) => {
                scheduleHTML += `
                <tr>
                  <td class="valign center">
                    ${match.homeTeam.name}
                    <br>vs<br>
                    ${match.awayTeam.name}
                  </td>
                  <td class="valign center">${date(match.utcDate)}</td>
                </tr>
              `
              })
              document.querySelector('#body-content tbody').innerHTML = scheduleHTML
              resolve(data)
            })
          }
        })
    }

    fetch(base_url + `teams/${idParam}/matches?status=SCHEDULED`, {
      headers: {
        'X-Auth-Token': apiKEY
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {
        let scheduleHTML = ''
        const date = (tgl) => {
          const newDate = new Date(tgl)
          return newDate
        }

        data.matches.forEach((match) => {
          scheduleHTML += `
            <tr>
              <td class="valign center">
                ${match.homeTeam.name}
                <br>vs<br>
                ${match.awayTeam.name}
              </td>
              <td class="valign center">${date(match.utcDate)}</td>
            </tr>
          `
        })
        document.querySelector('#body-content tbody').innerHTML = scheduleHTML
        resolve(data)
      })
  })
}

// getSavedTeams
function getSavedTeams () {
  getTeams().then((teams) => {
    if (teams.length > 0) {
      let teamsHTML = ''
      teams.forEach((team) => {
        teamsHTML += `
      <div class="card">
          <div class="card-image">
            <a href="./matchteam.html?id=${team.id}&saved=true">
              <img src="${team.crestUrl}" alt="team-image">
              <span class="card-title">${team.name}</span>
            </a>
          </div>
          <div class="card-content">
            <b>Alamat:</b> ${team.address} <br />
            <b>Telepon:</b> ${team.phone} <br />
            <b>Website:</b> ${team.website} <br />
            <b>E-mail:</b> ${team.email} <br />
            <b>Tahun didirikan:</b> ${team.founded} <br />
            <b>Arena:</b> ${team.venue}
          </div>
        </div>
      `
      })
      document.getElementById('list-tersimpan-tim').innerHTML = teamsHTML
    } else {
      document.getElementById('list-tersimpan-tim').innerHTML = '<p>Tidak ada data tersimpan</p>'
    }
  })
}

// getSavedSchedule
function getSavedScheduleById () {
  const urlParams = new URLSearchParams(window.location.search)
  const idParam = urlParams.get('id')

  getSchedById(idParam).then((schedule) => {
    if (schedule) {
      let scheduleHTML = ''
      const date = (tgl) => {
        const newDate = new Date(tgl)
        return newDate
      }
      schedule.matches.forEach((match) => {
        scheduleHTML += `
      <tr>
        <td class="valign center">
          ${match.homeTeam.name}
          <br>vs<br>
          ${match.awayTeam.name}
        </td>
        <td class="valign center">${date(match.utcDate)}</td>
      </tr>
      `
      })
      document.querySelector('#body-content tbody').innerHTML = scheduleHTML
    } else {
      document.querySelector('#body-content table').innerHTML = 'Tidak ada data tersimpan'
    }
  })
}
