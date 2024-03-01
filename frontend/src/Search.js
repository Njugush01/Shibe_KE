const arrayOfObjects = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'banana' },
    { id: 3, name: 'orange' },
    { id: 4, name: 'grape' },
    { id: 5, name: 'watermelon' }
  ];
  
  // Function to search through array of objects for values that contain specific characters
  export default function searchObjectsByValue(array, searchString) {
    // Use Array.prototype.filter() to filter out objects
    return array.filter(obj => {
      // Iterate over object properties
      for (let key in obj) {
        if(obj[key] === null) continue;
        // Check if the property value contains the searchString
        if (obj[key].toString().toLowerCase().includes(searchString)) {
          // If any property value contains the searchString, include the object in the filtered array
          return true;
        }
      }
      // If none of the property values contain the searchString, exclude the object from the filtered array
      return false;
    });
  }
  
   //Example usage:
  //  const searchResults = searchObjectsByValue(arrayOfObjects, 'p');
  //  console.log(searchResults);
  