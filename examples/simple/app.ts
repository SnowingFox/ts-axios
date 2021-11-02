import axios from '../../src/index'

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  banner: Array<any>
}

const url = 'http://localhost:3000/banner'
function getUser<T>() {
  return axios(url).then(res => res.data)



}
async function test() {
  const user = await getUser<User>()
  console.log(user)
}

test()
getUser<User>()