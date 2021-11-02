import axios from '../../src/index'

interface ResponseData<T = any> {
  banners: Array<any>
}

interface User {
  banner: Array<any>
}

const url = 'http://localhost:3000/banner'
function getUser<T>() {
  return axios<ResponseData<T>>(url).then(res => res.data)



}
async function test() {
  const user = await getUser<User>()
  console.log(user.banners)
}

test()
getUser<User>()