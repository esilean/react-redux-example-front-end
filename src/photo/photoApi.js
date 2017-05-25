import axios from 'axios'
import { toastr } from 'react-redux-toastr'

const BASE_URL = 'http://localhost:3004/api'

export function getImages() {

    const request = axios.get(`${BASE_URL}/photos`)
    return request
}