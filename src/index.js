import axios from "axios";
// 👉 TASK 1- Test out the following endpoints:
//  https://dog.ceo/api/breeds/image/random
//  * With Firefox and the Network Tab
//  * With JS using the native fetch [STRETCH]
// 👉 TASK 2- Select the "entry point", the element
// inside of which we'll inject our dog cards 
const entryPoint = document.querySelector(".entry");
// 👉 TASK 3- `dogCardMaker` takes an object and returns a Dog Card.
// Use this function to build a Card, and append it to the entry point.
function dogCardMaker({ imageURL, breed }) {
  const dogCardDiv = document.createElement("div");
  const dogImage = document.createElement("img");
  const dogCardHeading = document.createElement("h3");

  dogCardDiv.classList.add("dog-card");
  dogImage.classList.add("dog-image");
  dogImage.src = imageURL;
  dogCardHeading.textContent = `Breed: ${breed}`;
  
  dogCardDiv.appendChild(dogImage);
  dogCardDiv.appendChild(dogCardHeading);

  dogCardDiv.addEventListener("click", () => {
    dogCardDiv.classList.toggle("selected");
  })
  return dogCardDiv;
}
// 👉 TASK 4- Bring the Axios library into the project using one of two methods:
//    * Traditional way: put another script tag inside index.html (`https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`)
//    * Projects with npm: install it with npm and import it into this file
// 👉 TASK 5- Fetch dogs from `https://dog.ceo/api/breed/{breed}/images/random/{number}`
//    * ON SUCCESS: use the data to create dogCards and append them to the entry point
//    * ON FAILURE: log the error to the console
//    * IN ANY CASE: log "done" to the console
function getDogs(breed, count) {
  axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
    .then(res => {
      res.data.message.forEach(imageURL => {
        const dogCard = dogCardMaker({ imageURL, breed })
        entryPoint.appendChild(dogCard)
      })
    })
    .catch(err => {
      console.log('Something went wrong', err)
    })
    .finally(() => {
      console.log('done')
    })
}

document.querySelector("button").addEventListener("click", () => {
  getDogs("appenzeller", 3);
  getDogs("mastiff", 3);
  getDogs("chihuahua", 2)
})


// 👉 (OPTIONAL) TASK 6- Wrap the fetching operation inside a function `getDogs`
// that takes a breed and a count (of dogs)


// 👉 (OPTIONAL) TASK 7- Put a button in index.html to 'get dogs' and add a click
// event listener that executes `getDogs`


// 👉 (OPTIONAL) TASK 8- Import the breeds from `breeds.js`
// and loop over them, fetching a dog at each iteration
