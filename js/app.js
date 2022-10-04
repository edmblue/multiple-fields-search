//mostrar todos los autos al cargar

// el .resultado p ya tiene estilos

//solo comprar carros de 2020 hasta 2010, 2020 debe mostrase primerp

// los options tiene value

//Variables

const resultado = document.querySelector('#resultado');
const actualYear = new Date().getFullYear() - 2;
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const autoBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',
};

//eventListeners

callEventListeners();

function callEventListeners() {
  document.addEventListener('DOMContentLoaded', iniciarApp);
  marca.addEventListener('change', actualizarResultados);
  year.addEventListener('change', actualizarResultados);
  minimo.addEventListener('change', actualizarResultados);
  maximo.addEventListener('change', actualizarResultados);
  puertas.addEventListener('change', actualizarResultados);
  transmision.addEventListener('change', actualizarResultados);
  color.addEventListener('change', actualizarResultados);
}

//Funciones

function iniciarApp() {
  imprimirResultadosHTML(autos);
  imprimirYear();
}

function actualizarResultados(e) {
  if (e.target.id === 'marca') {
    autoBusqueda.marca = e.target.value;
  }
  if (e.target.id === 'year') {
    autoBusqueda.year = e.target.value;
  }
  if (e.target.id === 'minimo') {
    autoBusqueda.minimo = parseInt(e.target.value);
  }
  if (e.target.id === 'maximo') {
    autoBusqueda.maximo = parseInt(e.target.value);
  }
  if (e.target.id === 'puertas') {
    autoBusqueda.puertas = e.target.value;
  }
  if (e.target.id === 'transmision') {
    autoBusqueda.transmision = e.target.value;
  }
  if (e.target.id === 'color') {
    autoBusqueda.color = e.target.value;
  }

  const resultadosActualizados = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMin)
    .filter(filtrarMax)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultadosActualizados.length) {
    imprimirResultadosHTML(resultadosActualizados);
  } else {
    limpiarResultadosHTML();
    const resultadoVacio = document.createElement('p');
    resultadoVacio.textContent =
      'Lo siento, no hay similitudes para tu busqueda';
    resultado.appendChild(resultadoVacio);
  }
}

function filtrarMarca(auto) {
  const { marca } = auto;
  if (autoBusqueda.marca) {
    return marca === autoBusqueda.marca;
  }

  return auto;
}

function filtrarYear(auto) {
  const { year } = auto;
  if (autoBusqueda.year) {
    return year === parseInt(autoBusqueda.year);
  }

  return auto;
}

function filtrarMin(auto) {
  const { precio } = auto;
  if (autoBusqueda.minimo) {
    return precio >= autoBusqueda.minimo;
  }

  return auto;
}

function filtrarMax(auto) {
  const { precio } = auto;
  if (autoBusqueda.maximo) {
    return precio <= autoBusqueda.maximo;
  }

  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = auto;
  if (autoBusqueda.puertas) {
    return puertas == autoBusqueda.puertas;
  }

  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = auto;
  if (autoBusqueda.transmision) {
    return transmision === autoBusqueda.transmision;
  }

  return auto;
}

function filtrarColor(auto) {
  const { color } = auto;
  if (autoBusqueda.color) {
    return color === autoBusqueda.color;
  }

  return auto;
}

function imprimirResultadosHTML(autos) {
  limpiarResultadosHTML();
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, color, transmision, precio } = auto;

    const resultadosRow = document.createElement('p');
    resultadosRow.innerHTML = ` 
       <p>Marca: ${marca} - Modelo ${modelo} - ${year} - Precio: ${precio} - Puertas: ${puertas} - ${color} - ${transmision}</p>
        `;

    resultado.appendChild(resultadosRow);
  });
}

function limpiarResultadosHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function imprimirYear() {
  for (let i = actualYear; i >= actualYear - 10; i--) {
    const yearOption = document.createElement('option');
    yearOption.value = i;
    yearOption.textContent = i;

    year.appendChild(yearOption);
  }
}
