console.log('%c HI', 'color: firebrick');

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

document.addEventListener("DOMContentLoaded", () => {
  addImages(imgUrl);
  addBreeds(breedUrl, 'all');
  select = document.getElementById('breed-dropdown');
  select.addEventListener("change", function(e) {
    addBreeds(breedUrl, select.value)
  });
});

function getData(url) {
  return fetch(url)
  .then(resp => resp.json())
};

function addImages(imgUrl) {
  getData(imgUrl).then(json => 
    createImages(json));
};

function createImages(json) {
  const div = document.getElementById('dog-image-container')
  for (imageUrl of json.message) {
    const imgDiv = document.createElement('div')
    const img = document.createElement('img')
    imgDiv.class = "dog-image"
    img.src = imageUrl
    img.width = 400
    img.style = 'object-fit: contain'
    imgDiv.appendChild(img)
    div.appendChild(imgDiv)
  };
  addOnClick();
};

function addBreeds(breedUrl, filter) {
  getData(breedUrl).then(json => createBreeds(json, filter))
};

function createBreeds(json, filter='all') {
  const ul = document.getElementById('dog-breeds')
  let breeds = Object.keys(json.message)
  
  if (filter != 'all') {
    breeds = breeds.filter(breed => breed[0] == filter)
  };

  clearBreeds();

  for (breed of breeds) {
    const li = document.createElement('li')
    li.innerText = breed
    ul.appendChild(li)
  };
};

function clearBreeds() {
  const ul = document.getElementById('dog-breeds')
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  };
};

function addOnClick() {
  document.getElementById("dog-breeds").addEventListener("click", function(e) {
    if (e.target && e.target.matches("li")) {
      if (e.target.style.color == "blue") {
        e.target.style.color = "black";
      } else {
        e.target.style.color = "blue";
      };
    }
  });
};