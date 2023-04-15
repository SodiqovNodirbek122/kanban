import axios from "axios"

function Redirect(msg, redirect) {
  alert(msg)
}

function ErrorHandler(error) {
  if (error.message.startsWith("timeout")) {
    alert("Time Out", "Please check your internet!")
  }
  if (error.response) {
    // debugger
    let _error = error.response
    switch (_error.status) {
      case 400:
        alert("Bad request")
        break
      case 401:
        alert("Unauthorized")
        break
      case 403:
        alert("Forbidden")
        break
      case 404:
        alert("Not Found")
        break
      case 500:
        alert("Internal Server Error")
        break
      default:
        break
    }
  }
}

const axios_init = {
  request(method, url, params, data) {
    let config = {
      baseURL: "https://json-server-u620.onrender.com",
      timeout: 30000,
      url: url,
      method: method,
      params: params,
      body: data,
    }
    let result = axios(config)

    return new Promise((resolve, reject) => {
      result
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          ErrorHandler(error)
          reject(error)
        })
    })
  },
  get(url, params) {
    return this.request("GET", url, params)
  },
  post(url, data, params) {
    return this.request("POST", url, params, data)
  },
  put(url, data, params) {
    this.request("PUT", url, params, data)
  },
  patch(url, data, params) {
    this.request("PATCH", url, params, data)
  },
  remove(url, params) {
    this.request("DELETE", url, params, undefined)
  },
}

export default axios_init
