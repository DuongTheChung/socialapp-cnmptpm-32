const list = (user) => {
    return fetch('/api/users/list', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body:JSON.stringify(user)
    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err))
}

const getUserById=(userId)=>{
  return fetch('/api/users/'+userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const getDetailApi=(publickey)=>{
  return fetch('/api/transaction/detail/'+publickey, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

export {
  list,
  getUserById,
  getDetailApi
}