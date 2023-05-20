const container=document.querySelector(".card-container");
const modal=document.querySelector(".modal");
const cerrarModal=document.querySelector(".modal_close")
const gameover=document.querySelector(".anuncio")
const cuadro=document.querySelector(".cuadro")
const inicio=document.querySelector(".newgame")
const start=document.querySelector(".modal_close")
const user=document.querySelector("#name")
const info=document.querySelector(".usuario")
const timer=document.querySelector(".tiempo")
const textpuntaje=document.querySelector(".puntaje")


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
    textpuntaje.classList.remove("show")
    //inicializar()
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
    faltante=180;
    clearInterval(interval);
    gameover.innerHTML ="";
    textpuntaje.innerHTML="<h3>Puntaje:</h3>";
    puntaje=100;
    modal.showModal()
})

start.addEventListener("click", ()=>{
    if(user.value!=""){
    
    setTimeout( ()=> {
        info.innerHTML=`<h3>Nombre de usuario: ${user.value} </h3>`
        textpuntaje.classList.add("show")
        inicio.classList.add("show")
        inicializar()
        
    }
        ,1000)
    seconds=59;
    minutes=3;
    faltante=180;
    interval = setInterval(Timer, 1000);  
    
    }  
})


//const pares=[...imagenes,...imagenes];

let seconds = 59,
minutes = 3;
let faltante=180;
let puntaje;
let puntuación_máxima=100;
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
    faltante-=1
  //minutes logic

if( faltante==0) {
       clearInterval(interval);
       timer.innerHTML=`<h3>Tiempo: ${00}:${00}</h3>`
       gameover.innerHTML += `<h2>Juego Terminado</h2>
                              <h3>Felicidades haz ganado</h3>`;
       

  }

  else if (seconds == 0) {
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
    escogido=false;
     tarjetaabierta;
     tarjetaabierta2;
     match;
    contadortarjetas=0;
    container.innerHTML="";
    esperar=false

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
                if(faltante>0) {
                    //todo esto aplicara para cartas que no tenga pareja
                    if (!card.classList.contains("emparejada")) {
                        console.log(esperar)
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
                          tarjetaabierta2 = card;
                          esperar=true;
                          let match2 = card.getAttribute("data-card-value");
                          if (match == match2) {
                           
                            tarjetaabierta.classList.add("emparejada");
                            tarjetaabierta2.classList.add("emparejada");
                            setTimeout(()=>{esperar=false},1000)
                            escogido = false;
                            contadortarjetas += 1;
                            
                            if (contadortarjetas == (numtarjetas/ 2)) {
                                victoria()
                              esperar=true;
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
                } else if (faltante<=0) {
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
            )
        }
    )


}


function victoria() {

    clearInterval(interval);
    gameover.innerHTML += `<h2>Juego Terminado</h2>
    <h3>Felicidades haz ganado</h3>`;
    puntaje=Math.round(puntuación_máxima * (faltante / 180))
    textpuntaje.innerHTML=`<h3>Puntaje: ${puntaje}</h3>`
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





