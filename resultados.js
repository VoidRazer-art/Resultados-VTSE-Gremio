const API = "https://script.google.com/macros/s/AKfycbwNyJ92Unh-TFD3QYz1TbwK117e4mIU9qJqRoFqajADbI5cgQ0XDseDIJHW1_0tG4p2MQ/exec";

function atualizar() {
    fetch(API)
        .then(r => r.json())
        .then(dados => {
            const total = dados.total;
            const chapas = dados.chapas;

            document.getElementById("totalVotos").innerText =
                "Total de votos: " + total;

            const container = document.getElementById("listaResultados");
            container.innerHTML = "";

            const listaChapas = ["11", "22", "33"];

            listaChapas.forEach(num => {
                const votos = chapas[num] || 0;
                const porcentagem = total > 0 ? ((votos / total) * 100).toFixed(1) : 0;

                const bloco = document.createElement("div");
                bloco.className = "resultado";
                bloco.innerHTML = `
                    <div class="label"><b>Chapa ${num}</b> – ${votos} votos (${porcentagem}%)</div>
                    <div class="barra" id="barra${num}"></div>
                `;

                container.appendChild(bloco);

                // animação suave
                setTimeout(() => {
                    document.getElementById("barra" + num).style.width = porcentagem + "%";
                }, 100);
            });
        })
        .catch(() => {
            document.getElementById("totalVotos").innerText = "Erro ao buscar resultados";
        });
}

atualizar();
setInterval(atualizar, 1000);