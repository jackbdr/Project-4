export const getToken = () => {
  return window.localStorage.getItem('WOE-user-token')
}

export const getPayLoad = () => {
  const token = getToken()
  if (!token) return
  const payLoad = token.split('.')[1]
  // console.log(payLoad)
  // console.log(JSON.parse(atob(payLoad)))
  return JSON.parse(atob(payLoad)) // can try and use Buffer
}

export const isUserAuth = () => {
  const payLoad = getPayLoad()
  if (!payLoad) return 
  const currentTime = Math.floor(Date.now() / 1000)
  return payLoad.exp > currentTime
}

export const isUserOwner = (animal) => {
  const payLoad = getPayLoad()
  if (!payLoad) return
  // console.log(payLoad.sub)
  // console.log(bread.addedBy._id)
  return animal.added_by.id === payLoad.sub
}

export const isUserCommentOwner = (comment) => {
  const payLoad = getPayLoad()
  if (!payLoad) return 
  return comment.added_by.id === payLoad.sub
}