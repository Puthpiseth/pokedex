// Convertir la permière lettre en majuscule
let nameCapitalized = (str) => str[0].toUpperCase() + str.substr(1); 


function getInfoPokemon(idPoke) {

let pokeName = document.querySelector(".poke-name");
let pokeId = document.querySelector(".poke-id");
let pokeFrontImg = document.querySelector(".poke-front-image");
let pokeBackImg = document.querySelector(".poke-back-image");
let pokeType1 = document.querySelector(".poke-type-one");
let pokeType2 = document.querySelector(".poke-type-two");
let pokeWeight = document.querySelector(".poke-weight");
let pokeHeight = document.querySelector(".poke-height");
let leftMainScreen = document.querySelector(".main-screen");


// Fetch data pour l'écran gauche
fetch("https://pokeapi.co/api/v2/pokemon/" + idPoke)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        // console.log(data.name);

        let dataTypes = data.types;
        let dataType1 = dataTypes[0];
        let dataType2 = dataTypes[1];

        // Affiche le premier type de Pokemon et converti la première lettre en majuscule
        pokeType1.textContent = nameCapitalized(dataType1.type.name);
        // pokeType2.textContent = dataType2.type.name;

        if (dataType2){
            pokeType2.classList.remove("hide")
             // Affiche le deuxième type de Pokemon et converti la première lettre en majuscule
            pokeType2.textContent = nameCapitalized(dataType2.type.name);
        } else {
            pokeType2.textContent = "";
            pokeType2.classList.add("hide");
        }
        
        // Enlève tous les class
        leftMainScreen.classList = "";
        // Ajouter la couleur de fond de l'écran gauche
        leftMainScreen.classList.add("main-screen", dataType1.type.name);
        leftMainScreen.classList.remove("hide");

        // Ajouter nom, id, weight et height de Pokemon
        pokeName.textContent = nameCapitalized(data.name); // converti la première lettre en majuscule
        pokeId.textContent = "#" + data.id.toString().padStart(3, "0");
        pokeWeight.textContent = data.weight;
        pokeHeight.textContent = data.height;

        // Afficher les images de Pokemon4 front et back
        pokeFrontImg.src = data.sprites.front_default; 
        pokeBackImg.src = data.sprites.back_default; 
    });

};

// getInfoPokemon();
function pokeListDisplay(url) {

    

    // fetch 
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // console.log(data)            
        
        pokeDom(data.results);
        });    
    
};
pokeListDisplay("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");

// Afficher pokemon sur l'ecran droit
function pokeDom (data) {
    let pokeListItems = document.querySelector(".right-container__screen");
        let output = "";
            data.forEach((pokemon)=>{
                let idPoke = pokemon.url.split("pokemon/")[1].split("/")[0];
                
            output += `<div class="list-item">${idPoke}. ${nameCapitalized(pokemon.name)}</div>`;
            })
            pokeListItems.innerHTML = output;

            pokeLeftScreen();
}

// Prev et next Button

function button () {
    let leftButton = document.querySelector(".left-button");
    let rightButton = document.querySelector(".right-button")
    let next = 0;

    rightButton.addEventListener("click", () =>{
        next += 20
        // console.log(rightButton);
        pokeListDisplay(`https://pokeapi.co/api/v2/pokemon?offset=${next}&limit=20`)
    })
    leftButton.addEventListener("click", ()=> {
        // console.log(leftButton);
        next -=20
        if(next<=0){
            next = 0
        }
        pokeListDisplay(`https://pokeapi.co/api/v2/pokemon?offset=${next}&limit=20`)
        
    })

}
button();

function pokeLeftScreen () {
    let listItems = document.querySelectorAll(".list-item")
    // console.log(listItems)

    listItems.forEach((element) =>{
        // console.log(element)
        let pokeElement = element.textContent.split(".")[0]
        element.addEventListener("click", ()=>{
           
            getInfoPokemon(pokeElement);
        })
    })

}


// Konami code

//Step 1
// DOM tous les éléments dans HTML

let btn = document.querySelectorAll(".buttons__button");
let arrowTop = document.querySelector(".d-pad__cell.top");
console.log(arrowTop)
let arrowBottom = document.querySelector(".d-pad__cell.bottom");
let arrowLeft = document.querySelector(".d-pad__cell.left");
let arrowRight = document.querySelector(".d-pad__cell.right");
let arrowMiddle = document.querySelector(".d-pad__cell.middle");


// Button A et B
btn[0].addEventListener("click", () =>{
console.log(btn[0])
})

btn[1].addEventListener("click", () =>{
    console.log(btn[1])
})

// Arrow Top
arrowTop.addEventListener("click", () =>{
    // console.log(arrowTop)
    // Si on clique arrowTop, ça affiche next pokemon    
    let pokeId = document.querySelector(".poke-id").textContent.split("#")[1];

    pokeId = Number(pokeId)
    pokeId +=1;

    // console.log(pokeId)
    getInfoPokemon(pokeId)
    
    })

// Arrow Bottom
arrowBottom.addEventListener("click", () =>{
    // console.log(arrowBottom)
    let pokeId = document.querySelector(".poke-id").textContent.split("#")[1];
    
    pokeId = Number(pokeId)
    pokeId -=1;

    console.log(pokeId)

    getInfoPokemon(pokeId)
})

// Arrow Left
arrowLeft.addEventListener("click", () =>{
    // console.log(arrowLeft)
})

// Arrow Right
arrowRight.addEventListener("click", () =>{
    // console.log(arrowRight)
})

// Arrow Middle
arrowMiddle.addEventListener("click", () =>{
    // console.log(arrowMiddle)
})


// Assigner des valeurs 
// let konomiCode = [up, up, down, down left, right, left, right, B, A]




