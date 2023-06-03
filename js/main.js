const $formulario = document.getElementById("formulario");
const $inputs = document.querySelectorAll("#formulario input");

const expresiones = {
    usuario : /^[a-zA-Z0-9\_\-]{4,16}$/, //Aqui le estamos diciendo que en el campo usuario acepte letras minúsculas
    nombre:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //Aqui aceptara letras con o sin acento y espacios
    password : /^.{4,12}$/, //Solo aceptara un mínimo de 4 dígitos y un máximo de 12 dígitos
    correo : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //Acepta de todo menos caracteres especiales
    telefono : /^\d{9}$/ //Aceptara solo 9 números por ser de Perú 01 311 1111
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
    if (expresiones.test(input.value)) { //si esta bien rellenado el campo del form
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.getElementById(`#grupo__${campo} i`).classList.remove("bi bi-x-circle-fill");
        document.getElementById(`#grupo__${campo} i`).classList.add("bi bi-check-circle-fill");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    } else { //si no se llenó correctamente los campos del form
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
        document.getElementById(`#grupo__${campo} i`).classList.add("bi bi-x-circle-fill");
        document.getElementById(`#grupo__${campo} i`).classList.remove("bi bi-check-circle-fill");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    let inputPassword1 = document.getElementById("password");
    let inputPassword2 = document.getElementById("password2");

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto");
        document.getElementById(`#grupo__password2 i`).classList.add("fbi bi-x-circle-fill");
        document.getElementById(`#grupo__password2 i`).classList.remove("bi bi-check-circle-fill");
        document.getElementById(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo");
        campos[password] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
        document.getElementById(`#grupo__password2 i`).classList.remove("bi bi-x-circle-fill");
        document.getElementById(`#grupo__password2 i`).classList.add("bi bi-check-circle-fill");
        document.getElementById(`#grupo__password2 .formulario__input-error`).classList.remove
        ("formulario__input-error-activo");
        campos[password] = true;
    }
}

$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

$formulario.addEventListener("submit", e => {
    e.preventDefault();

    const terminos = document.getElementById("terminos");
    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
        formulario.reset();

        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

        setTimeout(() => {
            document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
            document.getElementById("formulario__grupo-terminos").style.display = "none";
        }, 3000);

        document.querySelectorAll("formulario__grupo-correcto").forEach((icono) => {
            icono.classList.remove("formulario__grupo-correcto");
        });

        setTimeout(() => {
            Location.reload();
        }, 3000);
    } else {
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    }
});

// falta corregir errores , depurarlo

