
// --- TRANSLATIONS ---
const i18n: any = {
    pl: {
        title: "Planer Budżetu Podróży",
        nav_budget: "Budżet", nav_expenses: "Wydatki", nav_fuel: "Paliwo", nav_rates: "Kursy", nav_list: "Lista", nav_pdf: "PDF",
        trip_params: "Parametry Podróży", trip_name: "Nazwa wyjazdu", from: "Od", to: "Do", base_currency: "Waluta główna", total_budget: "Budżet całkowity",
        days: "Dni", daily: "Dziennie", planned_cats: "Planowane Kategorie", add_cat: "Dodaj", reset: "Resetuj dane",
        add_expense: "Dodaj Wydatek", when: "Kiedy", title_label: "Co kupiono", category: "Kategoria", amount: "Kwota", currency: "Waluta", fx_rate: "Kurs wymiany",
        total_spent: "Suma wydatków", left: "Pozostało", history: "Historia", fuel_calc: "Kalkulator Paliwa", distance: "Dystans (km)", consumption: "Spalanie (L/100km)",
        price_per_l: "Cena za litr", fuel_fx: "Kurs waluty paliwa", tolls_title: "Opłaty & Autostrady", liters: "Litry", transport_total: "Koszt transportu",
        converter_title: "Szybki Przelicznik", rates_title: "Kursy wymiany", rates_info: "Definiuj kursy wymiany względem waluty głównej.",
        packing_progress: "Postęp pakowania", add_to_list: "Dodaj do listy", pdf_title: "Generowanie Raportu", pdf_desc: "Twój plan i wydatki gotowe do druku.",
        confirm_reset: "Czy na pewno zresetować WSZYSTKIE dane?",
        groups: ["Dokumenty", "Ubrania", "Elektronika", "Apteczka", "Auto/Van", "Inne"]
    },
    en: {
        title: "Travel Budget Planner",
        nav_budget: "Budget", nav_expenses: "Expenses", nav_fuel: "Fuel", nav_rates: "Rates", nav_list: "Checklist", nav_pdf: "PDF",
        trip_params: "Trip Parameters", trip_name: "Trip Name", from: "From", to: "To", base_currency: "Base Currency", total_budget: "Total Budget",
        days: "Days", daily: "Daily", planned_cats: "Planned Categories", add_cat: "Add", reset: "Reset Data",
        add_expense: "Add Expense", when: "When", title_label: "Title", category: "Category", amount: "Amount", currency: "Currency", fx_rate: "Exchange Rate",
        total_spent: "Total Spent", left: "Left", history: "History", fuel_calc: "Fuel Calculator", distance: "Distance (km)", consumption: "Consumption (L/100km)",
        price_per_l: "Price per L", fuel_fx: "Fuel Currency Rate", tolls_title: "Tolls & Highways", liters: "Liters", transport_total: "Transport Cost",
        converter_title: "Quick Converter", rates_title: "Exchange Rates", rates_info: "Define rates relative to your base currency.",
        packing_progress: "Packing Progress", add_to_list: "Add to List", pdf_title: "Generate Report", pdf_desc: "Your plan and expenses ready to print.",
        confirm_reset: "Are you sure you want to reset ALL data?",
        groups: ["Documents", "Clothes", "Electronics", "Medical", "Auto/Van", "Other"]
    },
    es: {
        title: "Planificador de Viaje",
        nav_budget: "Presupuesto", nav_expenses: "Gastos", nav_fuel: "Combustible", nav_rates: "Divisas", nav_list: "Lista", nav_pdf: "PDF",
        trip_params: "Parámetros del Viaje", trip_name: "Nombre del viaje", from: "Desde", to: "Hasta", base_currency: "Moneda principal", total_budget: "Presupuesto total",
        days: "Días", daily: "Diario", planned_cats: "Categorías planificadas", add_cat: "Añadir", reset: "Reiniciar datos",
        add_expense: "Añadir Gasto", when: "Cuándo", title_label: "Título", category: "Categoría", amount: "Monto", currency: "Moneda", fx_rate: "Tasa de cambio",
        total_spent: "Total gastado", left: "Restante", history: "Historial", fuel_calc: "Calculadora de combustible", distance: "Distancia (km)", consumption: "Consumo (L/100km)",
        price_per_l: "Precio por L", fuel_fx: "Tasa de combustible", tolls_title: "Peajes", liters: "Litros", transport_total: "Costo de transporte",
        converter_title: "Conversor rápido", rates_title: "Tasas de cambio", rates_info: "Define las tasas relativas a tu moneda principal.",
        packing_progress: "Progreso de empaque", add_to_list: "Añadir a la lista", pdf_title: "Generar Informe", pdf_desc: "Tu plan y gastos listos para imprimir.",
        confirm_reset: "¿Estás seguro de que quieres reiniciar TODOS los datos?",
        groups: ["Documentos", "Ropa", "Electrónica", "Botiquín", "Auto/Van", "Otros"]
    }
};

// --- DATA MODEL ---
const DEFAULT_STATE = {
    settings: { lang: 'pl', theme: 'light' },
    trip: { name: '', startDate: '', endDate: '', baseCurrency: 'PLN', totalBudget: 0 },
    categories: [
        { name: 'Noclegi', plannedAmount: 0 },
        { name: 'Jedzenie', plannedAmount: 0 },
        { name: 'Transport', plannedAmount: 0 }
    ],
    expenses: [],
    fuel: { distanceKm: 0, consumptionLPer100: 0, fuelPricePerL: 0, currency: 'PLN', fxRateToBase: 1, tolls: 0, tollsCurrency: 'PLN', tollsFxRateToBase: 1 },
    currency: { manualRates: { 'PLN': 1, 'EUR': 4.30, 'USD': 3.95, 'GBP': 5.05, 'CHF': 4.50 } },
    checklist: []
};

let state = JSON.parse(localStorage.getItem('travel_budget_app_v2') || 'null') || JSON.parse(JSON.stringify(DEFAULT_STATE));

// --- HELPERS ---
const save = () => localStorage.setItem('travel_budget_app_v2', JSON.stringify(state));
const getEl = (id: string) => document.getElementById(id) as any;

const updateRatesFromApi = async () => {
    try {
        const base = state.trip.baseCurrency;
        const resp = await fetch(`https://api.frankfurter.app/latest?from=${base}`);
        const data = await resp.json();
        if (data && data.rates) {
            Object.keys(state.currency.manualRates).forEach(code => {
                if (code === base) state.currency.manualRates[code] = 1;
                else if (data.rates[code]) state.currency.manualRates[code] = 1 / data.rates[code];
                // Note: Frankfurter provides rates FROM base TO others. We want 1 Other = X Base.
                // So if 1 PLN = 0.23 EUR, then 1 EUR = 1/0.23 PLN = 4.3 PLN.
            });
            save();
            render();
            console.log("Rates updated automatically.");
        }
    } catch (e) {
        console.error("Currency API error:", e);
    }
};

const calculateDays = () => {
    if (!state.trip.startDate || !state.trip.endDate) return 0;
    const start = new Date(state.trip.startDate);
    const end = new Date(state.trip.endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
};

// --- RENDER ---
const render = () => {
    const t = i18n[state.settings.lang];
    document.body.dataset.theme = state.settings.theme;

    // UI Translation
    getEl('ui-title').textContent = t.title;
    getEl('nav-budget').textContent = t.nav_budget;
    getEl('nav-expenses').textContent = t.nav_expenses;
    getEl('nav-fuel').textContent = t.nav_fuel;
    getEl('nav-rates').textContent = t.nav_rates;
    getEl('nav-list').textContent = t.nav_list;
    getEl('nav-pdf').textContent = t.nav_pdf;

    getEl('ui-trip-params').textContent = t.trip_params;
    getEl('ui-trip-name-label').textContent = t.trip_name;
    getEl('ui-from-label').textContent = t.from;
    getEl('ui-to-label').textContent = t.to;
    getEl('ui-base-currency-label').textContent = t.base_currency;
    getEl('ui-total-budget-label').textContent = t.total_budget;
    getEl('ui-days-label').textContent = t.days;
    getEl('ui-daily-label').textContent = t.daily;
    getEl('ui-planned-cats').textContent = t.planned_cats;
    getEl('btn-add-cat').textContent = t.add_cat;
    getEl('btn-reset').textContent = t.reset;

    getEl('ui-add-expense').textContent = t.add_expense;
    getEl('ui-exp-date-label').textContent = t.when;
    getEl('ui-exp-title-label').textContent = t.title_label;
    getEl('ui-exp-cat-label').textContent = t.category;
    getEl('ui-exp-amount-label').textContent = t.amount;
    getEl('ui-exp-currency-label').textContent = t.currency;
    getEl('ui-exp-fx-label').textContent = t.fx_rate;
    getEl('ui-total-spent-label').textContent = t.total_spent;
    getEl('ui-left-label').textContent = t.left;
    getEl('ui-history-label').textContent = t.history;

    getEl('ui-fuel-calc').textContent = t.fuel_calc;
    getEl('ui-fuel-dist-label').textContent = t.distance;
    getEl('ui-fuel-cons-label').textContent = t.consumption;
    getEl('ui-fuel-price-label').textContent = t.price_per_l;
    getEl('ui-fuel-currency-label').textContent = t.currency;
    getEl('ui-fuel-fx-label').textContent = t.fuel_fx;
    getEl('ui-tolls-title').textContent = t.tolls_title;
    getEl('ui-tolls-amount-label').textContent = t.amount;
    getEl('ui-tolls-currency-label').textContent = t.currency;
    getEl('ui-liters-label').textContent = t.liters;
    getEl('ui-transport-total-label').textContent = t.transport_total;

    getEl('ui-converter-title').textContent = t.converter_title;
    getEl('ui-rates-title').textContent = t.rates_title;
    getEl('ui-rates-info').textContent = t.rates_info;

    getEl('ui-packing-progress').textContent = t.packing_progress;
    getEl('ui-add-to-list').textContent = t.add_to_list;
    getEl('ui-pdf-title').textContent = t.pdf_title;
    getEl('ui-pdf-desc').textContent = t.pdf_desc;

    // State data sync
    getEl('lang-select').value = state.settings.lang;
    getEl('trip-name').value = state.trip.name;
    getEl('trip-start').value = state.trip.startDate;
    getEl('trip-end').value = state.trip.endDate;
    getEl('trip-total').value = state.trip.totalBudget || '';
    getEl('trip-currency').value = state.trip.baseCurrency;

    const days = calculateDays();
    getEl('stats-days').textContent = days;
    getEl('stats-daily').textContent = ((state.trip.totalBudget / (days || 1)) || 0).toFixed(2);

    // List Rendering (Categories)
    getEl('category-list').innerHTML = state.categories.map((c: any, i: number) => `
        <div class="list-item">
            <div>
                <div class="list-item-title">${c.name}</div>
                <div class="list-item-sub">${c.plannedAmount.toFixed(2)} ${state.trip.baseCurrency}</div>
            </div>
            <button class="btn btn-outline btn-sm remove-cat" data-index="${i}">X</button>
        </div>
    `).join('');

    // Expenses
    const curKeys = Object.keys(state.currency.manualRates);
    const curOptions = curKeys.map(k => `<option value="${k}">${k}</option>`).join('');
    getEl('exp-currency').innerHTML = curOptions;
    getEl('fuel-currency').innerHTML = curOptions;
    getEl('tolls-currency').innerHTML = curOptions;
    getEl('conv-from').innerHTML = curOptions;
    getEl('exp-cat').innerHTML = state.categories.map((c: any) => `<option value="${c.name}">${c.name}</option>`).join('');

    renderExpensesList();

    // Fuel Summary
    const fuelLiters = (state.fuel.distanceKm * state.fuel.consumptionLPer100) / 100;
    const fuelCostBase = fuelLiters * state.fuel.fuelPricePerL * state.fuel.fxRateToBase;
    const tollsCostBase = state.fuel.tolls * state.fuel.tollsFxRateToBase;
    getEl('res-fuel-liters').textContent = fuelLiters.toFixed(1);
    getEl('res-total-transport').textContent = (fuelCostBase + tollsCostBase).toFixed(2);

    // Rates
    getEl('rates-list').innerHTML = curKeys.filter(k => k !== state.trip.baseCurrency).map(code => `
        <div class="form-group grid" style="grid-template-columns: 1fr 2fr; align-items:center;">
            <label>1 ${code} =</label>
            <input type="number" step="0.0001" class="rate-input" data-code="${code}" value="${state.currency.manualRates[code].toFixed(4)}">
        </div>
    `).join('');

    // Checklist
    getEl('new-check-group').innerHTML = t.groups.map((g: string) => `<option value="${g}">${g}</option>`).join('');
    const groups = [...new Set(state.checklist.map((i: any) => i.group))];
    getEl('checklist-content').innerHTML = groups.map(group => `
        <div style="margin-bottom:1rem">
            <div style="font-weight:700; color:var(--accent); font-size:0.8rem; margin-bottom:0.5rem">${group}</div>
            ${state.checklist.filter((i: any) => i.group === group).map((item: any) => `
                <div class="list-item" style="padding:0.5rem 0">
                    <input type="checkbox" class="check-toggle" data-id="${item.id}" ${item.checked ? 'checked' : ''}>
                    <span style="flex:1; margin-left:10px; ${item.checked ? 'text-decoration:line-through; opacity:0.5' : ''}">${item.text}</span>
                    <button class="btn btn-outline btn-sm remove-check" data-id="${item.id}">×</button>
                </div>
            `).join('')}
        </div>
    `).join('');

    const totalCheck = state.checklist.length;
    const checkedCheck = state.checklist.filter((i: any) => i.checked).length;
    getEl('check-progress').style.width = (totalCheck ? (checkedCheck / totalCheck) * 100 : 0) + '%';
    getEl('check-stats').textContent = `${checkedCheck}/${totalCheck}`;
};

const renderExpensesList = () => {
    const totalSpent = state.expenses.reduce((acc: number, e: any) => acc + e.amountInBase, 0);
    getEl('stats-spent').textContent = totalSpent.toFixed(2);
    getEl('stats-left').textContent = (state.trip.totalBudget - totalSpent).toFixed(2);
    getEl('stats-left').style.color = (state.trip.totalBudget - totalSpent) < 0 ? 'var(--danger)' : 'var(--accent)';

    getEl('expenses-list').innerHTML = state.expenses.map((e: any) => `
        <div class="list-item">
            <div>
                <div class="list-item-title">${e.title}</div>
                <div class="list-item-sub">${e.date} • ${e.category}</div>
            </div>
            <div style="text-align:right; margin-right:1rem">
                <div style="font-weight:800">${e.amountInBase.toFixed(2)}</div>
                <div style="font-size:0.7rem; color:var(--text-muted)">${e.amount} ${e.currency}</div>
            </div>
            <button class="btn btn-outline btn-sm remove-exp" data-id="${e.id}">×</button>
        </div>
    `).join('') || '<p style="text-align:center; opacity:0.5">...</p>';
};

// --- HANDLERS ---
document.addEventListener('click', (e: any) => {
    const target = e.target;
    if (target.closest('.nav-btn')) {
        const tab = target.closest('.nav-btn').dataset.tab;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        getEl('tab-' + tab).classList.add('active');
        target.closest('.nav-btn').classList.add('active');
    }
    if (target.id === 'theme-btn') {
        state.settings.theme = state.settings.theme === 'light' ? 'dark' : 'light';
        save(); render();
    }
    if (target.id === 'btn-add-cat') {
        const name = getEl('new-cat-name').value;
        const amt = parseFloat(getEl('new-cat-amount').value) || 0;
        if (name) {
            state.categories.push({ name, plannedAmount: amt });
            save(); render();
            getEl('new-cat-name').value = ''; getEl('new-cat-amount').value = '';
        }
    }
    if (target.classList.contains('remove-cat')) {
        state.categories.splice(target.dataset.index, 1);
        save(); render();
    }
    if (target.id === 'btn-add-exp') {
        const date = getEl('exp-date').value;
        const title = getEl('exp-title').value;
        const category = getEl('exp-cat').value;
        const amount = parseFloat(getEl('exp-amount').value);
        const currency = getEl('exp-currency').value;
        const fx = parseFloat(getEl('exp-fx').value) || 1;
        if (date && title && !isNaN(amount)) {
            state.expenses.push({ id: Date.now(), date, title, category, amount, currency, amountInBase: amount * fx });
            save(); render();
            getEl('exp-title').value = ''; getEl('exp-amount').value = '';
        }
    }
    if (target.classList.contains('remove-exp')) {
        state.expenses = state.expenses.filter((x: any) => x.id != target.dataset.id);
        save(); render();
    }
    if (target.id === 'btn-add-check') {
        const text = getEl('new-check-text').value;
        const group = getEl('new-check-group').value;
        if (text) {
            state.checklist.push({ id: Date.now(), text, checked: false, group });
            save(); render();
            getEl('new-check-text').value = '';
        }
    }
    if (target.classList.contains('check-toggle')) {
        const item = state.checklist.find((i: any) => i.id == target.dataset.id);
        if (item) item.checked = target.checked;
        save(); render();
    }
    if (target.classList.contains('remove-check')) {
        state.checklist = state.checklist.filter((i: any) => i.id != target.dataset.id);
        save(); render();
    }
    if (target.id === 'btn-reset') {
        if (confirm(i18n[state.settings.lang].confirm_reset)) {
            state = JSON.parse(JSON.stringify(DEFAULT_STATE));
            save(); render();
        }
    }
    if (target.id === 'btn-refresh-rates') {
        updateRatesFromApi();
    }
    if (target.id === 'btn-gen-pdf') {
        const t = i18n[state.settings.lang];
        getEl('print-view').innerHTML = `
            <h1>${t.title} - ${state.trip.name}</h1>
            <p>${state.trip.startDate} - ${state.trip.endDate}</p>
            <h3>${t.total_spent}: ${getEl('stats-spent').textContent} ${state.trip.baseCurrency}</h3>
            <hr>
            <table>
                <thead><tr><th>${t.when}</th><th>${t.title_label}</th><th>${t.category}</th><th>${t.amount}</th></tr></thead>
                <tbody>${state.expenses.map((e: any) => `<tr><td>${e.date}</td><td>${e.title}</td><td>${e.category}</td><td>${e.amountInBase.toFixed(2)}</td></tr>`).join('')}</tbody>
            </table>
        `;
        window.print();
    }
});

document.addEventListener('input', (e: any) => {
    const target = e.target;
    if (target.id === 'lang-select') {
        state.settings.lang = target.value;
        save(); render();
    }
    if (['trip-name', 'trip-start', 'trip-end', 'trip-total', 'trip-currency'].includes(target.id)) {
        state.trip.name = getEl('trip-name').value;
        state.trip.startDate = getEl('trip-start').value;
        state.trip.endDate = getEl('trip-end').value;
        state.trip.totalBudget = parseFloat(getEl('trip-total').value) || 0;
        state.trip.baseCurrency = getEl('trip-currency').value;
        save(); render();
    }
    if (target.classList.contains('rate-input')) {
        state.currency.manualRates[target.dataset.code] = parseFloat(target.value) || 0;
        save();
    }
    if (target.id.startsWith('fuel-') || target.id.startsWith('tolls-')) {
        state.fuel.distanceKm = parseFloat(getEl('fuel-dist').value) || 0;
        state.fuel.consumptionLPer100 = parseFloat(getEl('fuel-cons').value) || 0;
        state.fuel.fuelPricePerL = parseFloat(getEl('fuel-price').value) || 0;
        state.fuel.currency = getEl('fuel-currency').value;
        state.fuel.fxRateToBase = parseFloat(getEl('fuel-fx').value) || 1;
        state.fuel.tolls = parseFloat(getEl('tolls-amount').value) || 0;
        state.fuel.tollsCurrency = getEl('tolls-currency').value;
        state.fuel.tollsFxRateToBase = parseFloat(getEl('tolls-fx').value) || 1;
        save(); render();
    }
    if (target.id === 'conv-amount' || target.id === 'conv-from') {
        const amt = parseFloat(getEl('conv-amount').value) || 0;
        const from = getEl('conv-from').value;
        const val = amt * (state.currency.manualRates[from] || 1);
        getEl('conv-results').innerHTML = `<div class="stat-val" style="margin-top:10px">${val.toFixed(2)} ${state.trip.baseCurrency}</div>`;
    }
});

document.addEventListener('change', (e: any) => {
    if (e.target.id === 'exp-currency') {
        getEl('exp-fx').value = (state.currency.manualRates[e.target.value] || 1).toFixed(4);
    }
});

// Initialization
window.addEventListener('DOMContentLoaded', () => {
    getEl('exp-date').valueAsDate = new Date();
    updateRatesFromApi(); // Fetch rates on startup
    render();
});
