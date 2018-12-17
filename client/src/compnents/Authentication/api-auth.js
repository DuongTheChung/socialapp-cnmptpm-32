const signin = (user) => {
    return fetch('/api/auth/signin/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      .then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
}

const create = (user) => {
    return fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then((response) => {
        return response.json()
      }).catch((err) => console.log(err))
}

const commit=(transaction)=>{
  return fetch('/api/transaction/commit', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  })
  .then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}


const signout = () => {
    return fetch('/auth/signout/', {
      method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}

export { 
    signin,
    create,
    signout,
    commit
}