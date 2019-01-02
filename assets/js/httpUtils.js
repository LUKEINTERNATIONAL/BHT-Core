function POST (config, data = {}, successCallback, failureCallback) {
  const request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 201) {
      successCallback(JSON.parse(request.responseText), request.status)
    } else if (request.readyState === 4 && request.status === 204) {
      successCallback({}, request.status)
    } else if (request.readyState === 4 && request.status >= 400) {
      failureCallback(request.responseText, request.status)
    } 
  }

  request.open('POST', config.url, config.async)

  Object.keys(config.headers).forEach((key) => {
    request.setRequestHeader(key, config.headers[key])
  })

  request.send(encodeURI(buildParametersString(data)))
}

function GET (config, data = {}, successCallback, failureCallback) {
  const request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      successCallback(JSON.parse(request.responseText), request.status)
    } else if (request.readyState === 4 && request.status >= 400) {
      failureCallback(request.responseText, request.status)
    } 
  }

  request.open('GET', config.url + `?${encodeURI(buildParametersString(data))}`, config.async)

  Object.keys(config.headers).forEach((key) => {
    request.setRequestHeader(key, config.headers[key])
  })

  request.send()
}