import axios, { AxiosTransformer } from '../../src/index'

const url = 'http://localhost:3000/banner'

const instance = axios.create()

axios.get(url).then(res => console.log(res))
