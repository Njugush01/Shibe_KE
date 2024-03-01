function SearchStatus(arrayOfObjects) {
    let newArray = [];
    for (let i = 0; i < arrayOfObjects.length; i++) {
      if (arrayOfObjects[i].status === 0) {
        arrayOfObjects[i].status = "Pending";
        newArray.push(arrayOfObjects[i]);
      } else if (arrayOfObjects[i].status === 1) {
        arrayOfObjects[i].status = "Accepted";
        newArray.push(arrayOfObjects[i]);
      } else if (arrayOfObjects[i].status === 2) {
        arrayOfObjects[i].status = "Rejected";
        newArray.push(arrayOfObjects[i]);
      }
    }
  
    return newArray;
  }
  
  export default SearchStatus;