/**
 * Navega entre as abas do formulário
 * @param {number} step - O número da etapa para a qual navegar (1, 2 ou 3)
 */
function goToStep(step) {
  // Remove a classe 'active' de todas as etapas
  document.querySelectorAll(".step").forEach((el) => {
    el.classList.remove("active");
  });

  // Adiciona a classe 'active' na etapa solicitada
  document.getElementById("step" + step).classList.add("active");

  // Rola a tela para o topo para melhor experiência no celular
  window.scrollTo(0, 0);
}

/**
 * Coleta os dados, salva no LocalStorage e exibe o resumo na etapa final
 */
function processChecklist() {
  // Coleta os valores digitados
  const placa = document.getElementById("placa").value || "Não informada";
  const modelo = document.getElementById("modelo").value || "Não informado";
  const cliente = document.getElementById("cliente").value || "Não informado";

  // Mapeia os checkboxes marcados
  const checkboxes = document.querySelectorAll(".avaria:checked");
  const avariasSelecionadas = Array.from(checkboxes).map((cb) => cb.value);

  // Formata o texto das avarias
  const avariasTexto =
    avariasSelecionadas.length > 0
      ? avariasSelecionadas.join(", ")
      : "Nenhuma avaria marcada";

  // Cria o objeto de dados
  const checklistData = {
    placa: placa,
    modelo: modelo,
    cliente: cliente,
    avarias: avariasTexto,
    data: new Date().toLocaleString("pt-BR"),
  };

  // Salva na memória do navegador do usuário
  localStorage.setItem("prismaChecklistMVP", JSON.stringify(checklistData));

  // Prepara e insere o HTML do resumo na tela final
  const resumoDiv = document.getElementById("resumo");
  resumoDiv.innerHTML = `
        <p><strong>Veículo:</strong> ${modelo} (${placa.toUpperCase()})</p>
        <p><strong>Cliente:</strong> ${cliente}</p>
        <p><strong>Avarias:</strong> ${avariasTexto}</p>
        <p class="text-xs text-gray-400 mt-2">Data da simulação: ${checklistData.data}</p>
    `;

  // Avança para a tela final
  goToStep(3);
}
