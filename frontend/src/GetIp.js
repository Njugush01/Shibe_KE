function get() {
  return fetch('https://apiip.net/api/check?accessKey=918432d8-110d-4c12-9ac6-38596c84c2a7')
    .then(response => response.json())
   .then(data => {return data.regionName});
}   

export default get;