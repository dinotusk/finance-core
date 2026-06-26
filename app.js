const STORAGE_KEY = "finance-core-state-v1";

const categories = [
  { name: "Combustível", color: "#e45b42", keywords: ["gasolina", "combustivel", "combustível", "abasteci", "abastecimento", "posto", "shell", "etanol", "diesel"] },
  { name: "Alimentação", color: "#c9891a", keywords: ["almoco", "almoço", "janta", "restaurante", "hamburgueria", "burger", "ifood", "lanche", "cafe", "café"] },
  { name: "Mercado", color: "#159a6c", keywords: ["mercado", "supermercado", "atacadao", "atacadão", "compras"] },
  { name: "Transporte", color: "#008d9d", keywords: ["uber", "99", "pedagio", "pedágio", "estacionamento", "onibus", "ônibus"] },
  { name: "Moradia", color: "#246bfe", keywords: ["aluguel", "internet", "energia", "luz", "agua", "água", "condominio", "condomínio"] },
  { name: "Saúde", color: "#6853d9", keywords: ["farmacia", "farmácia", "remedio", "remédio", "consulta", "exame"] },
  { name: "Lazer", color: "#a15c22", keywords: ["cinema", "bar", "show", "viagem", "passeio"] },
  { name: "Trabalho", color: "#526173", keywords: ["ferramenta", "software", "assinatura", "cliente", "freela", "freelance"] },
  { name: "Receita Uber", color: "#159a6c", keywords: ["uber", "corrida", "faturei", "faturamento"] },
  { name: "Outros", color: "#687384", keywords: [] }
];

const payments = ["Pix", "Crédito", "Débito", "Dinheiro", "Boleto", "Transferência", "Não informado"];
const contexts = ["Casa", "Uber", "Empresa", "Investimentos", "Pessoal"];

const icons = {
  layout: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
  scan: '<svg viewBox="0 0 24 24"><path d="M7 3H5a2 2 0 0 0-2 2v2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M7 8h10"></path><path d="M7 12h10"></path><path d="M7 16h6"></path></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M8 6h13"></path><path d="M8 12h13"></path><path d="M8 18h13"></path><path d="M3 6h.01"></path><path d="M3 12h.01"></path><path d="M3 18h.01"></path></svg>',
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3"></path><path d="M12 19v3"></path><path d="M2 12h3"></path><path d="M19 12h3"></path></svg>',
  message: '<svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path></svg>',
  plug: '<svg viewBox="0 0 24 24"><path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v4a6 6 0 0 1-12 0V8Z"></path></svg>',
  spark: '<svg viewBox="0 0 24 24"><path d="M13 2 9 14l-5 2 5 2 4 4 2-8 5-2-5-2Z"></path></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path></svg>',
  upload: '<svg viewBox="0 0 24 24"><path d="M12 21V9"></path><path d="m17 14-5-5-5 5"></path><path d="M5 3h14"></path></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',
  save: '<svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M17 21v-8H7v8"></path><path d="M7 3v5h8"></path></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>',
  copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"></rect><rect x="2" y="2" width="13" height="13" rx="2"></rect></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 15H6L5 6"></path></svg>',
  sheet: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6"></path><path d="M8 13h8"></path><path d="M8 17h8"></path></svg>',
  database: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"></path><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"></path></svg>',
  arrowDown: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>',
  arrowUp: '<svg viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"></path></svg>'
};

const defaultState = () => {
  const today = new Date();
  const iso = (offset) => {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);
    return date.toISOString().slice(0, 10);
  };

  return {
    entries: [
      entry({ date: iso(0), type: "expense", category: "Combustível", merchant: "Posto Shell", description: "Abastecimento", amount: 180, payment: "Pix", source: "Texto", context: "Uber" }),
      entry({ date: iso(-1), type: "income", category: "Receita Uber", merchant: "Uber", description: "Faturamento do dia", amount: 420, payment: "Transferência", source: "Manual", context: "Uber" }),
      entry({ date: iso(-1), type: "expense", category: "Alimentação", merchant: "Hamburgueria", description: "Jantar", amount: 58.9, payment: "Crédito", source: "Texto", context: "Pessoal" }),
      entry({ date: iso(-2), type: "expense", category: "Mercado", merchant: "Supermercado", description: "Compras da casa", amount: 246.7, payment: "Débito", source: "Manual", context: "Casa" }),
      entry({ date: iso(-3), type: "expense", category: "Transporte", merchant: "Estacionamento", description: "Centro", amount: 18, payment: "Pix", source: "Texto", context: "Pessoal" }),
      entry({ date: iso(-4), type: "expense", category: "Moradia", merchant: "Internet", description: "Plano mensal", amount: 119.9, payment: "Boleto", source: "Manual", context: "Casa" }),
      entry({ date: iso(-6), type: "income", category: "Trabalho", merchant: "Cliente", description: "Serviço de automação", amount: 850, payment: "Pix", source: "Manual", context: "Empresa" })
    ],
    goals: [
      { id: uid(), category: "Combustível", limit: 900 },
      { id: uid(), category: "Alimentação", limit: 650 },
      { id: uid(), category: "Mercado", limit: 900 },
      { id: uid(), category: "Geral", limit: 3600 }
    ],
    chat: [
      { role: "assistant", text: "Pode perguntar sobre mês, semana, combustível, Uber, limite ou maior gasto." }
    ]
  };
};

let state = loadState();
let selectedPeriod = new Date().toISOString().slice(0, 7);

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

document.addEventListener("DOMContentLoaded", () => {
  hydrateIcons();
  fillStaticSelects();
  setupEvents();
  resetEntryForm();
  $("#periodInput").value = selectedPeriod;
  renderAll();
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    const name = node.dataset.icon;
    if (icons[name]) node.innerHTML = icons[name];
  });
}

function setupEvents() {
  $$("[data-view-target]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewTarget));
  });

  $("#periodInput").addEventListener("change", (event) => {
    selectedPeriod = event.target.value || new Date().toISOString().slice(0, 7);
    renderAll();
  });

  $("#seedButton").addEventListener("click", () => {
    state = defaultState();
    saveState();
    renderAll();
    toast("Exemplos recarregados");
  });

  $("#exportButton").addEventListener("click", exportCsv);

  $("#quickForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = $("#quickText").value.trim();
    if (!text) return toast("Escreva uma mensagem primeiro");
    addEntry(parseMessage(text, { source: "Texto" }));
    $("#quickText").value = "";
    $("#parsePreview").hidden = true;
    setView("dashboard");
  });

  $("#previewParseButton").addEventListener("click", () => {
    const text = $("#quickText").value.trim();
    if (!text) return toast("Escreva uma mensagem primeiro");
    renderParsePreview(parseMessage(text, { source: "Prévia" }));
  });

  $("#receiptFile").addEventListener("change", (event) => {
    const file = event.target.files[0];
    $("#fileName").textContent = file ? file.name : "Nenhum arquivo selecionado";
  });

  $("#receiptForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = $("#receiptText").value.trim();
    const file = $("#receiptFile").files[0];
    if (!text && !file) return toast("Adicione texto ou arquivo");
    const parsed = parseMessage(text || file.name, { source: "Comprovante", receipt: file ? file.name : "" });
    addEntry(parsed);
    $("#receiptText").value = "";
    $("#receiptFile").value = "";
    $("#fileName").textContent = "Nenhum arquivo selecionado";
    setView("dashboard");
  });

  $("#entryForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = formToEntry();
    if (!data) return;
    if (data.id) {
      state.entries = state.entries.map((item) => item.id === data.id ? data : item);
      toast("Lançamento atualizado");
    } else {
      state.entries.unshift(entry(data));
      toast("Lançamento salvo");
    }
    saveState();
    resetEntryForm();
    renderAll();
  });

  $("#clearFormButton").addEventListener("click", resetEntryForm);

  $("#searchInput").addEventListener("input", renderEntriesTable);
  $("#typeFilter").addEventListener("change", renderEntriesTable);
  $("#categoryFilter").addEventListener("change", renderEntriesTable);

  $("#entriesTable").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const id = button.dataset.id;
    if (button.dataset.action === "edit") {
      editEntry(id);
    }
    if (button.dataset.action === "delete") {
      deleteEntry(id);
    }
  });

  $("#goalForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const category = $("#goalCategory").value;
    const limit = Number($("#goalLimit").value);
    if (!category || !limit) return toast("Preencha a meta");
    const existing = state.goals.find((goal) => goal.category === category);
    if (existing) {
      existing.limit = limit;
    } else {
      state.goals.push({ id: uid(), category, limit });
    }
    $("#goalLimit").value = "";
    saveState();
    renderGoals();
    toast("Meta salva");
  });

  $("#assistantForm").addEventListener("submit", (event) => {
    event.preventDefault();
    askAssistant($("#assistantInput").value);
    $("#assistantInput").value = "";
  });

  $$(".quick-prompts button").forEach((button) => {
    button.addEventListener("click", () => askAssistant(button.dataset.prompt));
  });

  $("#copyPayloadButton").addEventListener("click", async () => {
    const text = $("#payloadBlock").textContent;
    try {
      await navigator.clipboard.writeText(text);
      toast("Payload copiado");
    } catch {
      toast("Não consegui copiar automaticamente");
    }
  });
}

function fillStaticSelects() {
  const categoryOptions = categories.map((category) => `<option value="${category.name}">${category.name}</option>`).join("");
  $("#entryCategory").innerHTML = categoryOptions;
  $("#goalCategory").innerHTML = `<option value="Geral">Geral</option>${categoryOptions}`;
  $("#categoryFilter").innerHTML = `<option value="all">Todas categorias</option>${categoryOptions}`;
  $("#entryPayment").innerHTML = payments.map((payment) => `<option value="${payment}">${payment}</option>`).join("");
  $("#entryContext").innerHTML = contexts.map((context) => `<option value="${context}">${context}</option>`).join("");
}

function setView(viewId) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.viewTarget === viewId));
  const titleMap = {
    dashboard: "Dashboard",
    capture: "Capturar",
    entries: "Lançamentos",
    goals: "Metas",
    assistant: "Assistente",
    channels: "Canais"
  };
  $("#view-title").textContent = titleMap[viewId] || "Finance Core";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAll() {
  renderDashboard();
  renderEntriesTable();
  renderGoals();
  renderChat();
  renderPayload();
}

function renderDashboard() {
  const monthEntries = entriesForPeriod();
  const expenses = sum(monthEntries.filter((entryItem) => entryItem.type === "expense"));
  const incomes = sum(monthEntries.filter((entryItem) => entryItem.type === "income"));
  const balance = incomes - expenses;
  const topCategory = topExpenseCategory(monthEntries);
  const generalGoal = state.goals.find((goal) => goal.category === "Geral");
  const usedPercent = generalGoal ? Math.min((expenses / generalGoal.limit) * 100, 999) : 0;

  $("#metricGrid").innerHTML = [
    metric("Despesas", formatCurrency(expenses), `${monthEntries.filter((item) => item.type === "expense").length} lançamentos`, "expense", "arrowDown"),
    metric("Receitas", formatCurrency(incomes), `${monthEntries.filter((item) => item.type === "income").length} entradas`, "income", "arrowUp"),
    metric("Saldo", formatCurrency(balance), balance >= 0 ? "Mês positivo" : "Atenção ao caixa", "balance", "database"),
    metric("Orçamento", generalGoal ? `${usedPercent.toFixed(0)}% usado` : "Sem meta geral", topCategory ? `Maior: ${topCategory.category}` : "Sem despesas", "alert", "target")
  ].join("");
  hydrateIcons($("#metricGrid"));

  renderCategoryChart(monthEntries);
  renderDailyBars(monthEntries);
  renderRecentEntries();
}

function metric(label, value, detail, tone, icon) {
  return `
    <article class="metric ${tone}">
      <div class="metric-top">
        <span>${label}</span>
        <span class="icon-wrap" data-icon="${icon}"></span>
      </div>
      <strong>${value}</strong>
      <small>${detail}</small>
    </article>
  `;
}

function renderCategoryChart(entries) {
  const byCategory = categoryTotals(entries.filter((item) => item.type === "expense"));
  const total = byCategory.reduce((acc, item) => acc + item.total, 0);
  const donut = $("#categoryDonut");
  donut.dataset.total = total ? formatCompactCurrency(total) : "Sem gastos";

  if (!total) {
    donut.style.background = "conic-gradient(var(--line) 0 100%)";
    $("#categoryLegend").innerHTML = '<div class="empty">Nenhuma despesa no período.</div>';
    return;
  }

  let start = 0;
  const stops = byCategory.map((item) => {
    const end = start + (item.total / total) * 100;
    const color = colorForCategory(item.category);
    const segment = `${color} ${start}% ${end}%`;
    start = end;
    return segment;
  });
  donut.style.background = `conic-gradient(${stops.join(", ")})`;

  $("#categoryLegend").innerHTML = byCategory.slice(0, 6).map((item) => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${colorForCategory(item.category)}"></span>
      <div>
        <strong>${item.category}</strong>
        <small>${item.count} lançamento${item.count === 1 ? "" : "s"}</small>
      </div>
      <span class="amount">${formatCurrency(item.total)}</span>
    </div>
  `).join("");
}

function renderDailyBars(entries) {
  const days = [...Array(7)].map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const iso = date.toISOString().slice(0, 10);
    const dayEntries = entries.filter((item) => item.date === iso && item.type === "expense");
    return {
      label: date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
      total: sum(dayEntries)
    };
  });
  const max = Math.max(...days.map((day) => day.total), 1);
  $("#dailyBars").innerHTML = days.map((day) => {
    const height = Math.max((day.total / max) * 100, day.total ? 6 : 0);
    return `
      <div class="bar-item" title="${day.label}: ${formatCurrency(day.total)}">
        <div class="bar-track">
          <div class="bar-fill" style="height:${height}%"></div>
        </div>
        <small>${day.label}</small>
      </div>
    `;
  }).join("");
}

function renderRecentEntries() {
  const items = [...state.entries]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  $("#recentEntries").innerHTML = items.length ? items.map(compactEntry).join("") : '<div class="empty">Nenhum lançamento ainda.</div>';
  hydrateIcons($("#recentEntries"));
}

function compactEntry(item) {
  return `
    <article class="compact-entry">
      <span class="entry-icon" data-icon="${item.type === "income" ? "arrowUp" : "arrowDown"}"></span>
      <div>
        <strong>${item.merchant || item.category}</strong>
        <small>${formatDate(item.date)} · ${item.category} · ${item.context}</small>
      </div>
      <span class="amount ${item.type}">${item.type === "income" ? "+" : "-"}${formatCurrency(item.amount)}</span>
    </article>
  `;
}

function renderEntriesTable() {
  const query = $("#searchInput")?.value?.trim().toLowerCase() || "";
  const type = $("#typeFilter")?.value || "all";
  const category = $("#categoryFilter")?.value || "all";

  const rows = state.entries
    .filter((item) => selectedPeriod ? item.date.startsWith(selectedPeriod) : true)
    .filter((item) => type === "all" || item.type === type)
    .filter((item) => category === "all" || item.category === category)
    .filter((item) => {
      if (!query) return true;
      return [item.category, item.merchant, item.description, item.context, item.payment].join(" ").toLowerCase().includes(query);
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  $("#entriesTable").innerHTML = rows.length ? rows.map((item) => `
    <tr>
      <td>${formatDate(item.date)}</td>
      <td><span class="badge ${item.type === "income" ? "ok" : "muted"}">${item.type === "income" ? "Receita" : "Despesa"}</span></td>
      <td>${item.category}</td>
      <td>${item.merchant || "-"}</td>
      <td>${item.context}</td>
      <td class="${item.type === "income" ? "positive" : "negative"}">${item.type === "income" ? "+" : "-"}${formatCurrency(item.amount)}</td>
      <td>
        <div class="row-actions">
          <button class="mini-button" type="button" data-action="edit" data-id="${item.id}" title="Editar" aria-label="Editar">
            <span data-icon="edit"></span>
          </button>
          <button class="mini-button" type="button" data-action="delete" data-id="${item.id}" title="Excluir" aria-label="Excluir">
            <span data-icon="trash"></span>
          </button>
        </div>
      </td>
    </tr>
  `).join("") : '<tr><td colspan="7"><div class="empty">Nenhum lançamento encontrado.</div></td></tr>';
  hydrateIcons($("#entriesTable"));
}

function renderGoals() {
  const monthEntries = entriesForPeriod().filter((item) => item.type === "expense");
  $("#goalsList").innerHTML = state.goals.length ? state.goals.map((goal) => {
    const spent = goal.category === "Geral"
      ? sum(monthEntries)
      : sum(monthEntries.filter((item) => item.category === goal.category));
    const percent = goal.limit ? (spent / goal.limit) * 100 : 0;
    const tone = percent >= 100 ? "danger" : percent >= 80 ? "warn" : "";
    const badge = percent >= 100 ? "Estourou" : percent >= 80 ? "Atenção" : "Dentro";
    return `
      <article class="goal-row">
        <div>
          <strong>${goal.category}</strong>
          <small>${formatCurrency(spent)} de ${formatCurrency(goal.limit)}</small>
        </div>
        <span class="badge ${tone || "ok"}">${badge}</span>
        <div class="goal-meter ${tone}" style="--progress:${Math.min(percent, 100)}%">
          <span></span>
        </div>
      </article>
    `;
  }).join("") : '<div class="empty">Nenhuma meta cadastrada.</div>';
}

function renderChat() {
  $("#chatWindow").innerHTML = state.chat.map((message) => `
    <div class="chat-message ${message.role === "user" ? "user" : "assistant"}">${escapeHtml(message.text)}</div>
  `).join("");
  const chat = $("#chatWindow");
  chat.scrollTop = chat.scrollHeight;
}

function renderPayload() {
  const payload = {
    channel: "whatsapp",
    phone: "5561999999999",
    message: "Gastei 120,50 no Posto Shell via Pix",
    attachment_url: "https://exemplo.com/comprovante.jpg",
    received_at: new Date().toISOString(),
    finance_core: {
      expected_action: "create_transaction",
      storage: "supabase_postgres",
      backup: "google_sheets"
    }
  };
  $("#payloadBlock").textContent = JSON.stringify(payload, null, 2);
}

function renderParsePreview(parsed) {
  const preview = $("#parsePreview");
  preview.hidden = false;
  preview.innerHTML = `
    <div class="preview-grid">
      <div><small>Tipo</small><strong>${parsed.type === "income" ? "Receita" : "Despesa"}</strong></div>
      <div><small>Valor</small><strong>${formatCurrency(parsed.amount)}</strong></div>
      <div><small>Categoria</small><strong>${parsed.category}</strong></div>
      <div><small>Pagamento</small><strong>${parsed.payment}</strong></div>
      <div><small>Estabelecimento</small><strong>${parsed.merchant || "Não identificado"}</strong></div>
      <div><small>Centro</small><strong>${parsed.context}</strong></div>
    </div>
  `;
}

function askAssistant(rawQuestion) {
  const question = rawQuestion.trim();
  if (!question) return;
  state.chat.push({ role: "user", text: question });
  state.chat.push({ role: "assistant", text: answerQuestion(question) });
  saveState();
  renderChat();
}

function answerQuestion(question) {
  const text = normalize(question);
  const monthEntries = entriesForPeriod();
  const expenses = monthEntries.filter((item) => item.type === "expense");
  const incomes = monthEntries.filter((item) => item.type === "income");
  const totalExpenses = sum(expenses);
  const totalIncomes = sum(incomes);
  const matchedCategory = categories.find((category) => {
    const categoryName = normalize(category.name);
    return text.includes(categoryName) || category.keywords.some((keyword) => text.includes(normalize(keyword)));
  });

  if (matchedCategory && (text.includes("ainda posso") || text.includes("limite") || text.includes("gastar"))) {
    const categoryTotal = sum(expenses.filter((item) => item.category === matchedCategory.name));
    const goal = state.goals.find((item) => item.category === matchedCategory.name);
    if (!goal) return `${matchedCategory.name}: ${formatCurrency(categoryTotal)} gastos neste mês. Ainda não há meta nessa categoria.`;
    const remaining = goal.limit - categoryTotal;
    return remaining >= 0
      ? `${matchedCategory.name}: você ainda pode gastar ${formatCurrency(remaining)} da meta de ${formatCurrency(goal.limit)}.`
      : `${matchedCategory.name}: você passou ${formatCurrency(Math.abs(remaining))} da meta de ${formatCurrency(goal.limit)}.`;
  }

  if (text.includes("ainda posso") || text.includes("limite") || text.includes("gastar")) {
    const goal = state.goals.find((item) => item.category === "Geral");
    if (!goal) return `Você gastou ${formatCurrency(totalExpenses)} este mês. Ainda não há meta geral cadastrada.`;
    const remaining = goal.limit - totalExpenses;
    return remaining >= 0
      ? `Você ainda pode gastar ${formatCurrency(remaining)} para ficar dentro da meta geral de ${formatCurrency(goal.limit)}.`
      : `Você passou ${formatCurrency(Math.abs(remaining))} da meta geral de ${formatCurrency(goal.limit)}.`;
  }

  if (text.includes("uber")) {
    const uberEntries = monthEntries.filter((item) => normalize(item.context).includes("uber") || normalize(item.category).includes("uber") || normalize(item.merchant).includes("uber"));
    const uberIncome = sum(uberEntries.filter((item) => item.type === "income"));
    const uberCosts = sum(uberEntries.filter((item) => item.type === "expense"));
    return `No centro Uber, entraram ${formatCurrency(uberIncome)} e saíram ${formatCurrency(uberCosts)} neste mês. Resultado parcial: ${formatCurrency(uberIncome - uberCosts)}.`;
  }

  if (matchedCategory) {
    const categoryTotal = sum(expenses.filter((item) => item.category === matchedCategory.name));
    const goal = state.goals.find((item) => item.category === matchedCategory.name);
    if (goal) {
      const remaining = goal.limit - categoryTotal;
      return `${matchedCategory.name}: ${formatCurrency(categoryTotal)} gastos neste mês. ${remaining >= 0 ? `Restam ${formatCurrency(remaining)} da meta.` : `Passou ${formatCurrency(Math.abs(remaining))} da meta.`}`;
    }
    return `${matchedCategory.name}: ${formatCurrency(categoryTotal)} gastos neste mês.`;
  }

  if (text.includes("semana")) {
    const weekTotal = sum(expenses.filter((item) => isCurrentWeek(item.date)));
    return `Nesta semana você gastou ${formatCurrency(weekTotal)}.`;
  }

  if (text.includes("maior")) {
    const biggest = [...expenses].sort((a, b) => b.amount - a.amount)[0];
    return biggest ? `Seu maior gasto do período foi ${formatCurrency(biggest.amount)} em ${biggest.merchant || biggest.category}, no dia ${formatDate(biggest.date)}.` : "Não encontrei despesas neste período.";
  }

  if (text.includes("mes") || text.includes("mês") || text.includes("saldo") || text.includes("resumo")) {
    const top = topExpenseCategory(monthEntries);
    return `Neste mês entraram ${formatCurrency(totalIncomes)}, saíram ${formatCurrency(totalExpenses)} e o saldo está em ${formatCurrency(totalIncomes - totalExpenses)}.${top ? ` A categoria que mais pesou foi ${top.category}.` : ""}`;
  }

  const topCategories = categoryTotals(expenses).slice(0, 3).map((item) => `${item.category}: ${formatCurrency(item.total)}`).join("; ");
  return topCategories ? `Resumo rápido do mês: ${topCategories}.` : "Ainda não há gastos suficientes neste mês.";
}

function parseMessage(message, extra = {}) {
  const text = normalize(message);
  const type = /(recebi|entrou|faturei|ganhei|salario|salário|receita|pix recebido|pagamento recebido)/.test(text) ? "income" : "expense";
  const amount = extractAmount(message);
  const category = inferCategory(text, type);
  const payment = inferPayment(text);
  const merchant = inferMerchant(message);
  const context = inferContext(text, category, type);
  const date = text.includes("ontem") ? offsetDate(-1) : new Date().toISOString().slice(0, 10);
  return entry({
    date,
    type,
    category,
    merchant,
    description: message,
    amount,
    payment,
    source: extra.source || "Texto",
    receipt: extra.receipt || "",
    context
  });
}

function inferCategory(text, type) {
  if (type === "income" && (text.includes("uber") || text.includes("corrida") || text.includes("faturei"))) return "Receita Uber";
  const found = categories.find((category) => category.keywords.some((keyword) => text.includes(normalize(keyword))));
  return found ? found.name : type === "income" ? "Trabalho" : "Outros";
}

function inferPayment(text) {
  if (text.includes("pix")) return "Pix";
  if (text.includes("debito") || text.includes("débito")) return "Débito";
  if (text.includes("credito") || text.includes("crédito") || text.includes("cartao") || text.includes("cartão")) return "Crédito";
  if (text.includes("dinheiro")) return "Dinheiro";
  if (text.includes("boleto")) return "Boleto";
  return "Não informado";
}

function inferContext(text, category, type) {
  if (text.includes("uber") || category === "Combustível" || category === "Receita Uber") return "Uber";
  if (["Moradia", "Mercado"].includes(category)) return "Casa";
  if (type === "income" || category === "Trabalho") return "Empresa";
  return "Pessoal";
}

function inferMerchant(message) {
  const clean = message.replace(/\s+/g, " ").trim();
  const patterns = [
    /\b(?:no|na|em|do|da)\s+([A-Za-zÀ-ÿ0-9 .'-]{2,28})/i,
    /\b(?:posto|mercado|supermercado|hamburgueria|restaurante)\s+([A-Za-zÀ-ÿ0-9 .'-]{2,22})/i
  ];
  for (const pattern of patterns) {
    const match = clean.match(pattern);
    if (match) return titleCase(match[1].replace(/\b(?:via|com|por|de|r\$|hoje|ontem|amanha|amanhã).*$/i, "").trim());
  }
  if (/shell/i.test(clean)) return "Posto Shell";
  if (/uber/i.test(clean)) return "Uber";
  return "";
}

function extractAmount(message) {
  const match = message.match(/(?:r\$\s*)?(\d{1,3}(?:\.\d{3})+,\d{1,2}|\d{1,3}(?:\.\d{3})+|\d+(?:[.,]\d{1,2})?)/i);
  if (!match) return 0;
  const raw = match[1];
  const normalized = raw.includes(",")
    ? raw.replace(/\./g, "").replace(",", ".")
    : /^\d{1,3}(?:\.\d{3})+$/.test(raw)
      ? raw.replace(/\./g, "")
    : raw;
  return Number(normalized);
}

function formToEntry() {
  const amount = Number($("#entryAmount").value);
  if (!amount) {
    toast("Informe um valor");
    return null;
  }
  return {
    id: $("#entryId").value,
    date: $("#entryDate").value,
    type: $("#entryType").value,
    amount,
    category: $("#entryCategory").value,
    merchant: $("#entryMerchant").value.trim(),
    payment: $("#entryPayment").value,
    description: $("#entryDescription").value.trim(),
    context: $("#entryContext").value,
    source: "Manual",
    receipt: ""
  };
}

function editEntry(id) {
  const item = state.entries.find((entryItem) => entryItem.id === id);
  if (!item) return;
  $("#entryId").value = item.id;
  $("#entryType").value = item.type;
  $("#entryDate").value = item.date;
  $("#entryAmount").value = item.amount;
  $("#entryCategory").value = item.category;
  $("#entryMerchant").value = item.merchant;
  $("#entryPayment").value = item.payment;
  $("#entryDescription").value = item.description;
  $("#entryContext").value = item.context;
  setView("capture");
  toast("Lançamento aberto para edição");
}

function deleteEntry(id) {
  state.entries = state.entries.filter((item) => item.id !== id);
  saveState();
  renderAll();
  toast("Lançamento excluído");
}

function resetEntryForm() {
  const today = new Date().toISOString().slice(0, 10);
  $("#entryForm").reset();
  $("#entryId").value = "";
  $("#entryDate").value = today;
  $("#entryType").value = "expense";
  $("#entryCategory").value = "Outros";
  $("#entryPayment").value = "Pix";
  $("#entryContext").value = "Pessoal";
}

function addEntry(item) {
  state.entries.unshift(item);
  saveState();
  renderAll();
  toast("Gasto registrado");
}

function entry(data) {
  return {
    id: data.id || uid(),
    date: data.date || new Date().toISOString().slice(0, 10),
    type: data.type || "expense",
    category: data.category || "Outros",
    merchant: data.merchant || "",
    description: data.description || "",
    amount: Number(data.amount || 0),
    payment: data.payment || "Não informado",
    source: data.source || "Manual",
    receipt: data.receipt || "",
    context: data.context || "Pessoal"
  };
}

function entriesForPeriod() {
  return state.entries.filter((item) => item.date.startsWith(selectedPeriod));
}

function categoryTotals(entries) {
  const totals = entries.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = { category: item.category, total: 0, count: 0 };
    acc[item.category].total += item.amount;
    acc[item.category].count += 1;
    return acc;
  }, {});
  return Object.values(totals).sort((a, b) => b.total - a.total);
}

function topExpenseCategory(entries) {
  return categoryTotals(entries.filter((item) => item.type === "expense"))[0];
}

function sum(entries) {
  return entries.reduce((acc, item) => acc + Number(item.amount || 0), 0);
}

function colorForCategory(name) {
  return categories.find((category) => category.name === name)?.color || "#687384";
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0);
}

function formatCompactCurrency(value) {
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(1).replace(".", ",")} mil`;
  return formatCurrency(value);
}

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

function isCurrentWeek(dateValue) {
  const now = new Date();
  const date = new Date(`${dateValue}T12:00:00`);
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  start.setHours(0, 0, 0, 0);
  return date >= start && date <= now;
}

function offsetDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function normalize(text = "") {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function titleCase(text) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-5);
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultState();
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function toast(message) {
  const toastEl = $("#toast");
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastEl.dataset.timer);
  toastEl.dataset.timer = setTimeout(() => toastEl.classList.remove("show"), 2300);
}

function exportCsv() {
  const header = ["data", "tipo", "categoria", "estabelecimento", "descricao", "valor", "pagamento", "centro", "origem"];
  const rows = state.entries.map((item) => [
    item.date,
    item.type,
    item.category,
    item.merchant,
    item.description,
    item.amount,
    item.payment,
    item.context,
    item.source
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `finance-core-${selectedPeriod}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
