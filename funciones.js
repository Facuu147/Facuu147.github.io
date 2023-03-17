
//guardamos en variables los elementos que queremos modificar cuando se use fetch
let fotoPerfil = document.getElementById('photo')
let nombreCompleto = document.getElementsByClassName('name')
let ubicacion = document.getElementById('textLocation')
let celular = document.getElementById('textCel')
let correo = document.getElementById('textMail')
let pagWeb = document.getElementById('textWeb')
let linkedin = document.getElementById('textLink')

//obtenemos con fetch la informacion de la pagina "randomuser" que queremos utilizar en nuestro documento
fetch('https://randomuser.me/api/')
    .then(response => response.json())      //si la respuesta es exitosa, captura la informacion y la transforma en un json
    .then(data => {

        //remplazamos el contenido de los elementos por la informacion obtenida del json
        fotoPerfil.innerHTML = `<img src="${data.results['0'].picture.large}">`

        for(let i=0; i<nombreCompleto.length; i++){
            nombreCompleto[i].innerHTML = (`${data.results['0'].name.first}`) + " " + (`${data.results['0'].name.last}`)
        }
        
        ubicacion.innerHTML = (`${data.results['0'].location.street.name}`) +" "+ (`${data.results['0'].location.street.number}`)+", "+(`${data.results['0'].location.city}`) + ", " +(`${data.results['0'].location.country}`)
        celular.innerHTML = `${data.results['0'].cell}`

        //creamos un nuevo email a partir del que se extrajo del json
        let correo_completo = `${data.results['0'].email}`
        let new_correo
        for(let i=0; i<correo_completo.length; i++){
            if(correo_completo[i] == '.'){
                new_correo = correo_completo.slice(i)    //recorremos la variable correo_completo y con slice la recortamos para obtener
                break                                    //una nueva variable que empiece a partir del primer "." que encuentre
            }
        }
        //tomamos el primer caracter del email original y lo unimos a esa nueva variable que creamos con slice
        correo.innerHTML = correo_completo[0] + new_correo

        pagWeb.innerHTML = "www."+(`${data.results['0'].name.first}`)+""+(`${data.results['0'].name.last}`)+".com"
        linkedin.innerHTML ="/"+(`${data.results['0'].name.first}`)+""+(`${data.results['0'].name.last}`)

        //si el genero del usuario random es "female", cambia en el documento algunas palabras clave para que este tenga coherencia
        if(`${data.results['0'].gender}` == "female"){
            
            document.getElementById('cambio_genero1').innerHTML = 'Programadora'
            document.getElementById('cambio_genero2').innerHTML = 'Especializada'
            document.getElementById('cambio_genero3').innerHTML = 'Desarrolladora'
            document.getElementById('cambio_genero4').innerHTML = 'Programadora'
        }

    })

//desarrollamos en la navbar una serie de links ancla que hagan refenrencia y se redireccionen
//a partes especificas del documento
let punteros_izq = Array.from(document.getElementsByClassName('left_section'));       //guardamos en variables los links ancla que hacen referencia a sus contrapartes en el
let punteros_der = Array.from(document.getElementsByClassName('right_section'));      // lado izquierdo y derecho del documento y los transformamos en arrays

let reversa = punteros_der.reverse(); 

const lista_punteros = punteros_izq.concat(reversa);            //lista de todos los links ancla ordenados en el mismo orden que la lista de titulos

const lista_titulos = document.getElementsByClassName('titulo_marcado');    //lista de los titulos a los cuales va a direccionar los links ancla

for(let i=0; i<lista_punteros.length; i++){
    lista_punteros[i].addEventListener('click', function(){     //recorre la lista de punteros y cuando se hace un click sobre alguno ejecuta la funcion

        for(let i=0; i<lista_titulos.length; i++){

            //primero recorre uno por uno los titulos y si alguno tiene fondo "yellowgreen",
            //lo cambia por el color por defecto que tenia de fondo
            if(lista_titulos[i].style.backgroundColor == 'yellowgreen'){            
                let padreElemento = lista_titulos[i].parentElement;
                
                if(padreElemento.className == 'titulos_1'){
                    lista_titulos[i].style.backgroundColor = '#fff';
                 }
                if(padreElemento.className == 'titulos_2'){
                    lista_titulos[i].style.backgroundColor = '#aa141a';
                }
            }
        }
        //cuando se hace un click sobre el link ancla, le cambia el color de fondo al titulo sobre el que hace referencia
        lista_titulos[i].style.backgroundColor = 'yellowgreen';          
    });
}

const reload = document.getElementById('recargar');

//cuando se hace click sobre "curriculum vitae" se recarga la pagina
reload.addEventListener('click', function(){
    location.reload();
});
