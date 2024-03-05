function SearchClaimed(arrayOfObjects) {
    let newArray = [];
    for (let i = 0; i < arrayOfObjects.length; i++) {
      if (arrayOfObjects[i].claimed === 0) {
        arrayOfObjects[i].claimed = "Claim";
        newArray.push(arrayOfObjects[i]);
      } else if (arrayOfObjects[i].claimed === 1) {
        arrayOfObjects[i].Claimed = "Claimed";
        newArray.push(arrayOfObjects[i]);
      } 
    }
  
    return newArray;
  }
  
  export default SearchClaimed;