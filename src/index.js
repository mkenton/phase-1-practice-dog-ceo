const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
let dogArray= []

document.addEventListener('DOMContentLoaded', function(){
//on page load, fetches the images using the url below
loadImages()
//on page load, fetches the breeds using the url below
loadBreeds()
//console.log(dogArray)

})



function loadImages(){

    fetch(imgUrl)
    .then( r => r.json())
    .then(dogImages => {
        dogImages.message.forEach(doggy => addImage(doggy))
        //console.log(dogImages)

    })
}
//console.log(`dog array: ${dogArray}`)

function addImage(image){
    const img = document.createElement('img')
    img.src = image // this makes the source of the image equal to the fetched url (for each)
    img.classList.add('dog-image')
    const div = document.querySelector('div')
    div.append(img)
}



function loadBreeds(){
    fetch(breedUrl)
    .then( r => r.json())
    .then(dogBreeds => {
        const breeds = Object.keys(dogBreeds.message)
        breeds.forEach(breed => addBreed(breed))
        //console.log(dogBreeds)
        breeds.forEach(breed => dogArray.push(breed))
        addBreedListener()

        //return an array to use for filtering
        
    })
}

function addBreed(breed){
    
    const ul = document.getElementById('dog-breeds');
    const li = document.createElement('li')
    li.innerText = breed;
    ul.append(li);
    li.addEventListener('click', e => e.target.style.color = 'magenta' )

}

function addBreedListener(){
    let dropDown = document.querySelector('select')
    //console.log(dropDown);
    dropDown.addEventListener('change', function(e){
        filterByLetter(e.target.value);
        //console.log(e.target.value)
    }
    )
}

function filterByLetter(letter){
let newArray = dogArray.filter(el => el.startsWith(letter))
updateBreedList(newArray)
}

function updateBreedList(breed){
    ul = document.getElementById('dog-breeds');
    removeList(ul)
    breed.forEach(breed => addBreed(breed))
}


function removeList(ul){
    while (ul.lastElementChild) {
        ul.removeChild(ul.lastElementChild)
    }
}