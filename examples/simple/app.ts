import axios from '../../src/index'

const url = 'http://localhost:3000/search'

axios.get(`${url}?keywords=Intro`).then(res => console.log(res))