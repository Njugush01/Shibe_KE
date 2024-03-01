function SearchRole(arrayOfObjects) {
  let newArray = [];
  for (let i = 0; i < arrayOfObjects.length; i++) {
    if (arrayOfObjects[i].account_type === 1) {
      arrayOfObjects[i].account_type = "Admin";
      newArray.push(arrayOfObjects[i]);
    } else if (arrayOfObjects[i].account_type === 2) {
      arrayOfObjects[i].account_type = "Donor";
      newArray.push(arrayOfObjects[i]);
    } else if (arrayOfObjects[i].account_type === 3) {
      arrayOfObjects[i].account_type = "Volunteer";
      newArray.push(arrayOfObjects[i]);
    }
  }

  return newArray;
}

export default SearchRole;

// let x = [
//     {
//         "id": 9,
//         "name": "Alice",
//         "email": "alice@gmail.com",
//         "phone": "254739356783",
//         "account_type": 3,
//         "created_at": "2024-02-22 08:36:05",
//         "id_number": null,
//         "address": null,
//         "privacy_policy": 0
//     },
//     {
//         "id": 6,
//         "name": "Patricia",
//         "email": "patricia@gmail.com",
//         "phone": "254712345678",
//         "account_type": 3,
//         "created_at": "2024-02-22 03:09:52",
//         "id_number": null,
//         "address": null,
//         "privacy_policy": 0
//     },
//     {
//         "id": 5,
//         "name": "Muchai Njuguna",
//         "email": "muchaie.njuguna@gmail.com",
//         "phone": "254707192915",
//         "account_type": 2,
//         "created_at": "2024-02-21 05:46:15",
//         "id_number": null,
//         "address": null,
//         "privacy_policy": 0
//     },
//     {
//         "id": 4,
//         "name": "Biggie N",
//         "email": "njugunamuchaie@gmail.com",
//         "phone": "254727421601",
//         "account_type": 1,
//         "created_at": "2024-02-18 13:37:13",
//         "id_number": null,
//         "address": null,
//         "privacy_policy": 0
//     },
//     {
//         "id": 3,
//         "name": "Elvis Muchai",
//         "email": "elvisnjuguna97@gmail.com",
//         "phone": "254790360003",
//         "account_type": 2,
//         "created_at": "2024-02-18 12:11:47",
//         "id_number": null,
//         "address": null,
//         "privacy_policy": 0
//     },
//     {
//         "id": 1,
//         "name": "James Mwangi",
//         "email": "james@example.com",
//         "phone": "254712345678",
//         "account_type": 2,
//         "created_at": "2024-02-17 16:12:50",
//         "id_number": null,
//         "address": null,
//         "privacy_policy": 0
//     }
    
// ]

// console.log(SearchRole(x));
