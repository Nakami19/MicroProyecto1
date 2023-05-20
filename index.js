const container=document.querySelector(".card-container");

const imagenes=[
    { name: "saman", image: "img/saman.jpg" },
  { name: "biblioteca", image: "img/biblioteca.jpg" },
  { name: "eugenio", image: "img/eugenio.jpg" },
  { name: "ceis", image: "img/ceis.jpg" },
  { name: "little_miss", image: "img/little_miss.jpg" },
  { name: "metrotech", image: "img/metrotech.jpg" },
  { name: "pelusa", image: "img/pelusa.jpg" },
  { name: "senet", image: "img/senet.jpg" }
];

//const colores=["blue","yellow","red","cyan","green","brown","purple","orange"]
const pares=[...imagenes,...imagenes];

//const pares=[...colores,...colores]

const numtarjetas= pares.length  
console.log(pares.length)
let esperar=false;
let tarjetaabierta;
let contadortarjetas=0;


function mezclar() {

    const cartas=[];
    for (let i=0; i<numtarjetas ; i++ ) {

        const indice=Math.floor(Math.random()*pares.length);
        cartas.push(pares[indice]);
        pares.splice(indice,1);
    }
    console.log(cartas)
    return cartas;
}
const cartas=mezclar()

tabla(cartas)


function tabla(cartas) {
    container.innerHTML="";

    for(let i=0; i< 4*4; i++) {

        container.innerHTML += `
     <div class="card" data-card-value="${cartas[i].name}">
        <div class="front">
        <img src="img/logo.jpg"  class="image"/>
        </div>
        <div class="back">
        <img src="${cartas[i].image}"  class="image"/></div>
     </div>
     `;

    }
    
    container.style.gridTemplateColumns = `repeat(${4},auto)`;

    let cards = document.querySelectorAll(".card");
    console.log(cards)
    cards.forEach(
        (card)=> {
            card.addEventListener("click",
                ()=>{
                    card.classList.add("flipped");
                }
            )
        }
    )


}


//<img src="img/logo.jpg" width="50px class="image"/>

// function crear(color) {

//     const element=document.createElement("div")
//     element.classList.add("card")
//     element.setAttribute("data-imagen", color)

//     element.addEventListener("click", ()=>{
//         if(esperar) {
//             return;
//         }
//        // element.style.backgroundImage = imagen
//         element.style.backgroundColor= color

//         if(!tarjetaabierta) {
//             tarjetaabierta=element;
//             return;
//         }

//         esperar=true;

//         setTimeout(()=>{
//             element.style.backgroundColor=null;
//             tarjetaabierta.style.backgroundColor=null;
//             esperar=false;
//             tarjetaabierta=null;
//         },1500)


//     })


//     return element;
// }


// //let movimiento=false;


// /*window.addEventListener("load", ()=>{

//     setTimeout(
//         ()=>{modal.showModal()},1000
//     )
            
//     }) */
