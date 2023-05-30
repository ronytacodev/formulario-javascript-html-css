const $formulario = document.getElementById("formulario");
const $inputs = document.querySelectorAll("#formulario input");

const expresiones = {
    usuario : /^[a-zA-Z0-9\_\-]{4,16}$/, //Aqui le estamos diciendo que en el campo usuario acepte letras minúsculas
    nombre:  /^[a-zA-ZÁ-ÿ\s]{1,40}$/, //Aqui aceptara letras con o sin acento y espacios
    password : /^.{4,12}$/, //Solo aceptara un mínimo de 4 dígitos y un máximo de 12 dígitos
    correo : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.]+$/, //Acepta de todo menos caracteres especiales
    telefono : /^\d{7,14}$/ //Aceptara mínimo 7 y máximo 14 números
}

const campos = {
    usuario: false,
    nombre: false,
    password : false,
    correo : false,
    telefono : false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, "usuario");
            break;
        case "nombre":
                validarCampo(expresiones.nombre, e.target, "nombre");
            break;    
        case "password":
                validarCampo(expresiones.password, e.target, "password");
                validarPassword2();
            break;
        case "password2":
            validarPassword2();
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
            break;
        case "telefono":
                validarCampo(expresiones.telefono, e.target, "telefono");
            break;    
    }
}

const validarCampo = (expresiones, input, campo) => {
    if (expresiones.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.getElementById(`#grupo__${campo} i`).classList.remove("fa-times-circle");
        document.getElementById(`#grupo__${campo} i`).classList.add("fa-check-circle");
        document.getElementById(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
        document.getElementById(`#grupo__${campo} i`).classList.add("fa-times-circle");
        document.getElementById(`#grupo__${campo} i`).classList.remove("fa-check-circle");
        document.getElementById(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    let inputPassword1 = document.getElementById("password");
    let inputPassword2 = document.getElementById("password2");

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto");
        document.getElementById(`#grupo__password2 i`).classList.add("fa-times-circle");
        document.getElementById(`#grupo__password2 i`).classList.remove("fa-check-circle");
        document.getElementById(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[password] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
        document.getElementById(`#grupo__password2 i`).classList.remove("fa-times-circle");
        document.getElementById(`#grupo__password2 i`).classList.add("fa-check-circle");
        document.getElementById(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[password] = true;
    }
}

$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

$formulario.addEventListener("submit", e => {
    e.preventDefault();

    const $terminos = document.getElementById("terminos");
    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && $terminos.checked) {
        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

        setTimeout(() => {
            document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
            document.getElementById("formulario__grupo-terminos").style.display = "none";
        }, 3000);

        document.querySelectorAll("formulario__grupo--correcto").forEach((icono) => {
            icono.classList.remove("formulario__grupo--correcto");
        });

        setTimeout(() => {
            location.reload();
        }, 3000);
    } else {
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    }
});

