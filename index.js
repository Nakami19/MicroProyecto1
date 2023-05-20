const container=document.querySelector(".card-container");
const modal=document.querySelector(".modal");
const cerrarModal=document.querySelector(".modal_close")
const gameover=document.querySelector(".game_over")
const cuadro=document.querySelector(".cuadro")
const inicio=document.querySelector(".newgame")
const start=document.querySelector(".modal_close")
const user=document.querySelector("#name")
const info=document.querySelector(".usuario")
const timer=document.querySelector(".tiempo")


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

window.addEventListener("load", ()=>{
    inicializar()
     setTimeout(
     ()=>{modal.showModal()},100
                )

    })

window.onkeydown = function(e){
    if(e.keyCode === 27){ 
        e.preventDefault();
    }
}; 

inicio.addEventListener("click",()=>{
    seconds=59
    minutes=3
    clearInterval(interval);
    modal.showModal()
})

start.addEventListener("click", ()=>{

    if(user.value!=""){
    setTimeout( ()=> {
        info.innerHTML=`<h3>Nombre de usuario: ${user.value} </h3>`}
        ,1000)
    seconds=59;
    minutes=3;
    interval = setInterval(Timer, 1000);  
    inicializar()
    }  
})


//const pares=[...imagenes,...imagenes];

let seconds = 59,
minutes = 3;

const numtarjetas= imagenes.length *2 ;
let escogido=false;
let esperar=false;
let tarjetaabierta;
let tarjetaabierta2;
let match;
let contadortarjetas=0;

function inicializar() {
    const cartas=mezclar()
    tabla(cartas)
}

const Timer=() => {
    seconds -= 1;
  //minutes logic
  if (seconds == 0) {
    minutes -= 1;
    seconds=59;}

  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timer.innerHTML = `<h3>Tiempo: ${minutesValue}:${secondsValue}</h3>`;

}


function mezclar() {
    const pares=[...imagenes,...imagenes];
    const cartas=[];
    for (let i=0; i<numtarjetas ; i++ ) {
        const indice=Math.floor(Math.random()*pares.length);
        cartas.push(pares[indice]);
        pares.splice(indice,1);
    }
    return cartas;
}

//const cartas=mezclar()

//tabla(cartas)


function tabla(cartas) {
    let escogido=false;
    let esperar=false;
    let tarjetaabierta;
    let tarjetaabierta2;
    let match;
    let contadortarjetas=0;
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
    container.style.margin="auto";


    let cards = document.querySelectorAll(".card");
 
    cards.forEach(
        (card)=> {
            card.addEventListener("click",
                ()=>{
                    //todo esto aplicara para cartas que no tenga pareja
                    if (!card.classList.contains("emparejada")) {

                        if(!esperar) {
                        card.classList.add("flipped");
                        //si la carta clickeada es la primera
                        if (!escogido) {
                          //la clickeada es la tarjeta abierta
                          tarjetaabierta = card;
                          //el nombre de la tarjeta
                          match = card.getAttribute("data-card-value");

                          escogido=true;
                        } else { //si la clickeada es la segunda
                          //secondCard and value
                          tarjetaabierta2 = card;
                          esperar=true;
                          let match2 = card.getAttribute("data-card-value");
                          if (match == match2) {
                           
                            tarjetaabierta.classList.add("matched");
                            tarjetaabierta2.classList.add("matched");
                            setTimeout(()=>{esperar=false},900)
                            escogido = false;
                            contadortarjetas += 1;
                            
                            if (contadortarjetas == (numtarjetas/ 2)) {
                            
                              gameover.innerHTML += `<h2>Juego Terminado</h2>
                              <h3>Felicidades haz ganado</h3>`;
                              //stopGame();
                            }
                          } else {
                            //if the cards dont match
                            //flip the cards back to normal
                            let [tempFirst, tempSecond] = [tarjetaabierta, tarjetaabierta2];
                            escogido=false;
                            tarjetaabierta = null;
                            tarjetaabierta2 = null;
                             setTimeout(() => {
                              tempFirst.classList.remove("flipped");
                              tempSecond.classList.remove("flipped");
                              esperar=false;
                            }, 900);
                          }
                        }
                      }
                    }
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





