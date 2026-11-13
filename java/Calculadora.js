const calcular = () => {
  const contenedor = document.querySelector("#Resultados");
  contenedor.innerHTML = "<img src='Multimedia/200w.webp' width='200px' height='200px'>";

  setTimeout(() => {
    const num = parseFloat(document.querySelector("#Numero").value) || 0;
    document.querySelector("#Num").textContent = num;

    let filas = "";
    for (let i = 1; i <= 10; i++) {
      filas += `<div>${i}X${num}=${num * i}</div>`;
    }
    contenedor.innerHTML = filas;
  }, 1000);
};

const reset = () => {
  document.querySelector("#Num").textContent = 1;
  document.querySelector("#Resultados").innerHTML = "0";
};