
// --- TRANSLATIONS ---
const i18n = {
    pl: {
        title: "Planer Budżetu Podróży",
        nav_budget: "Budżet", nav_expenses: "Wydatki", nav_fuel: "Paliwo", nav_rates: "Kursy", nav_list: "Lista", nav_pdf: "PDF",
        trip_params: "Parametry Podróży", trip_name: "Nazwa wyjazdu", from: "Od", to: "Do", base_currency: "Waluta główna", total_budget: "Budżet całkowity",
        days: "Dni", daily: "Dziennie", planned_cats: "Planowane Kategorie", add_cat: "Dodaj", reset: "Resetuj dane",
        add_expense: "Dodaj Wydatek", when: "Kiedy", title_label: "Co kupiono", category: "Kategoria", amount: "Kwota", currency: "Waluta", fx_rate: "Kurs wymiany",
        total_spent: "Suma wydatków", left: "Pozostało", history: "Historia", fuel_calc: "Kalkulator Paliwa", distance: "Dystans (km)", consumption: "Spalanie (L/100km)",
        price_per_l: "Cena za litr", fuel_fx: "Kurs waluty paliwa", tolls_title: "Dodaj Opłatę / Bramkę", liters: "Litry", transport_total: "Łączny koszt transportu",
        converter_title: "Szybki Przelicznik", rates_title: "Kursy wymiany", rates_info: "Definiuj kursy wymiany względem waluty głównej.",
        packing_progress: "Postęp pakowania", add_to_list: "Dodaj do listy", pdf_title: "Generowanie Raportu", pdf_desc: "Wybierz sekcje do eksportu:",
        confirm_reset: "Czy na pewno zresetować WSZYSTKIE dane?",
        groups: ["Dokumenty", "Ubrania", "Elektronika", "Apteczka", "Auto/Van", "Inne"],
        privacy_title: "Twoja Prywatność",
        privacy_msg: "Dane są zapisywane wyłącznie w Twojej przeglądarce (LocalStorage).",
        toll_name: "Nazwa opłaty", toll_fx: "Kurs waluty opłaty", tolls_history: "Historia Opłat",
        pdf_inc_budget: "Podsumowanie & Budżet", pdf_inc_expenses: "Wydatki rzeczywiste", pdf_inc_fuel: "Koszty transportu", pdf_inc_checklist: "Lista kontrolna"
    },
    en: {
        title: "Travel Budget Planner",
        nav_budget: "Budget", nav_expenses: "Expenses", nav_fuel: "Fuel", nav_rates: "Rates", nav_list: "Checklist", nav_pdf: "PDF",
        trip_params: "Trip Parameters", trip_name: "Trip Name", from: "From", to: "To", base_currency: "Base Currency", total_budget: "Total Budget",
        days: "Days", daily: "Daily", planned_cats: "Planned Categories", add_cat: "Add", reset: "Reset Data",
        add_expense: "Add Expense", when: "When", title_label: "Title", category: "Category", amount: "Amount", currency: "Currency", fx_rate: "Exchange Rate",
        total_spent: "Total Spent", left: "Left", history: "History", fuel_calc: "Fuel Calculator", distance: "Distance (km)", consumption: "Consumption (L/100km)",
        price_per_l: "Price per L", fuel_fx: "Fuel Rate", tolls_title: "Add Toll / Highway", liters: "Liters", transport_total: "Total Transport Cost",
        converter_title: "Quick Converter", rates_title: "Exchange Rates", rates_info: "Define rates relative to your base currency.",
        packing_progress: "Packing Progress", add_to_list: "Add to List", pdf_title: "Generate Report", pdf_desc: "Choose sections to export:",
        confirm_reset: "Are you sure you want to reset ALL data?",
        groups: ["Documents", "Clothes", "Electronics", "Medical", "Auto/Van", "Other"],
        privacy_title: "Your Privacy",
        privacy_msg: "All data is stored locally in your browser.",
        toll_name: "Toll name", toll_fx: "Toll currency rate", tolls_history: "Tolls History",
        pdf_inc_budget: "Summary & Budget", pdf_inc_expenses: "Actual Expenses", pdf_inc_fuel: "Transport Costs", pdf_inc_checklist: "Packing Checklist"
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
    fuel: { 
        distanceKm: 0, 
        consumptionLPer100: 0, 
        fuelPricePerL: 0, 
        currency: 'PLN', 
        fxRateToBase: 1, 
        tollsList: [] 
    },
    currency: { manualRates: { 'PLN': 1, 'EUR': 4.30, 'USD': 3.95, 'GBP': 5.05, 'CHF': 4.50 } },
    checklist: [],
    lastChecklistGroup: ''
};

let state = JSON.parse(localStorage.getItem('travel_budget_app_v2') || 'null') || JSON.parse(JSON.stringify(DEFAULT_STATE));

// --- HELPERS ---
const save = () => localStorage.setItem('travel_budget_app_v2', JSON.stringify(state));
const getEl = (id) => document.getElementById(id);

const updateRatesFromApi = async () => {
    try {
        const base = state.trip.baseCurrency;
        const resp = await fetch(`https://api.frankfurter.app/latest?from=${base}`);
        const data = await resp.json();
        if (data && data.rates) {
            Object.keys(state.currency.manualRates).forEach(code => {
                if (code === base) state.currency.manualRates[code] = 1;
                else if (data.rates[code]) state.currency.manualRates[code] = 1 / data.rates[code];
            });
            save(); render();
        }
    } catch (e) { console.error("Currency API error:", e); }
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
    const t = i18n[state.settings.lang] || i18n.pl;
    document.body.setAttribute('data-theme', state.settings.theme);

    // Dynamic Base Currency Labels
    document.querySelectorAll('.base-curr-label').forEach(el => el.textContent = state.trip.baseCurrency);

    // Text Updates
    getEl('ui-title').textContent = t.title;
    getEl('nav-budget').textContent = t.nav_budget;
    getEl('nav-expenses').textContent = t.nav_expenses;
    getEl('nav-fuel').textContent = t.nav_fuel;
    getEl('nav-rates').textContent = t.nav_rates;
    getEl('nav-list').textContent = t.nav_list;
    getEl('nav-pdf').textContent = t.nav_pdf;

    // Fuel Module UI
    getEl('ui-toll-name-label').textContent = t.toll_name;
    getEl('ui-toll-fx-label').textContent = t.toll_fx;
    getEl('ui-tolls-history-label').textContent = t.tolls_history;

    // PDF UI
    getEl('ui-pdf-desc').textContent = t.pdf_desc;
    getEl('ui-pdf-inc-budget').textContent = t.pdf_inc_budget;
    getEl('ui-pdf-inc-expenses').textContent = t.pdf_inc_expenses;
    getEl('ui-pdf-inc-fuel').textContent = t.pdf_inc_fuel;
    getEl('ui-pdf-inc-checklist').textContent = t.pdf_inc_checklist;

    // State sync
    getEl('lang-select').value = state.settings.lang;
    getEl('trip-name').value = state.trip.name;
    getEl('trip-start').value = state.trip.startDate;
    getEl('trip-end').value = state.trip.endDate;
    getEl('trip-total').value = state.trip.totalBudget || '';
    getEl('trip-currency').value = state.trip.baseCurrency;

    const days = calculateDays();
    getEl('stats-days').textContent = days;
    getEl('stats-daily').textContent = ((state.trip.totalBudget / (days || 1)) || 0).toFixed(2);

    // Categories
    getEl('category-list').innerHTML = state.categories.map((c, i) => `
        <div class="list-item">
            <div>
                <div class="list-item-title">${c.name}</div>
                <div class="list-item-sub">${c.plannedAmount.toFixed(2)} ${state.trip.baseCurrency}</div>
            </div>
            <button class="btn btn-outline btn-sm remove-cat" data-index="${i}">X</button>
        </div>
    `).join('');

    // Form Dropdowns
    const curKeys = Object.keys(state.currency.manualRates);
    const curOptions = curKeys.map(k => `<option value="${k}">${k}</option>`).join('');
    getEl('exp-currency').innerHTML = curOptions;
    getEl('fuel-currency').innerHTML = curOptions;
    getEl('tolls-currency').innerHTML = curOptions;
    getEl('conv-from').innerHTML = curOptions;
    getEl('exp-cat').innerHTML = state.categories.map((c) => `<option value="${c.name}">${c.name}</option>`).join('');

    renderExpensesList();
    renderFuelAndTolls();

    // Rates list
    getEl('rates-list').innerHTML = curKeys.filter(k => k !== state.trip.baseCurrency).map(code => `
        <div class="form-group grid" style="grid-template-columns: 1fr 2fr; align-items:center;">
            <label>1 ${code} =</label>
            <input type="number" step="0.0001" class="rate-input" data-code="${code}" value="${state.currency.manualRates[code].toFixed(4)}">
        </div>
    `).join('');

    // Checklist
    getEl('new-check-group').innerHTML = t.groups.map((g) => `<option value="${g}">${g}</option>`).join('');
    if (state.lastChecklistGroup) {
        getEl('new-check-group').value = state.lastChecklistGroup;
    }
    
    const groups = [...new Set(state.checklist.map((i) => i.group))];
    getEl('checklist-content').innerHTML = groups.map(group => `
        <div style="margin-bottom:1rem">
            <div style="font-weight:700; color:var(--accent); font-size:0.8rem; margin-bottom:0.5rem; border-bottom: 1px solid var(--border)">${group}</div>
            ${state.checklist.filter((i) => i.group === group).map((item) => `
                <div class="list-item" style="padding:0.5rem 0">
                    <div class="check-row">
                        <input type="checkbox" class="check-toggle" data-id="${item.id}" ${item.checked ? 'checked' : ''}>
                        <span style="${item.checked ? 'text-decoration:line-through; opacity:0.5' : ''}">${item.text}</span>
                    </div>
                    <button class="btn btn-outline btn-sm remove-check" data-id="${item.id}">×</button>
                </div>
            `).join('')}
        </div>
    `).join('') || '<p style="text-align:center; opacity:0.3; padding: 20px;">Lista jest pusta</p>';

    const totalCheck = state.checklist.length;
    const checkedCheck = state.checklist.filter((i) => i.checked).length;
    getEl('check-progress').style.width = (totalCheck ? (checkedCheck / totalCheck) * 100 : 0) + '%';
    getEl('check-stats').textContent = `${checkedCheck}/${totalCheck}`;
};

const renderFuelAndTolls = () => {
    // Basic Fuel Calc
    const fuelLiters = (state.fuel.distanceKm * state.fuel.consumptionLPer100) / 100;
    const fuelCostBase = fuelLiters * state.fuel.fuelPricePerL * state.fuel.fxRateToBase;
    
    getEl('fuel-dist').value = state.fuel.distanceKm || '';
    getEl('fuel-cons').value = state.fuel.consumptionLPer100 || '';
    getEl('fuel-price').value = state.fuel.fuelPricePerL || '';
    getEl('fuel-currency').value = state.fuel.currency || state.trip.baseCurrency;
    getEl('fuel-fx').value = state.fuel.fxRateToBase || 1;

    getEl('res-fuel-liters').textContent = fuelLiters.toFixed(1);
    getEl('res-fuel-cost-only').textContent = fuelCostBase.toFixed(2);

    // Tolls History
    const tollsCostBase = (state.fuel.tollsList || []).reduce((acc, t) => acc + (t.amount * t.fxRate), 0);
    getEl('tolls-list').innerHTML = (state.fuel.tollsList || []).map(t => `
        <div class="list-item">
            <div>
                <div class="list-item-title">${t.name}</div>
                <div class="list-item-sub">${t.amount.toFixed(2)} ${t.currency}</div>
            </div>
            <div style="text-align:right; margin-right:1rem">
                <div style="font-weight:700">~ ${(t.amount * t.fxRate).toFixed(2)} ${state.trip.baseCurrency}</div>
            </div>
            <button class="btn btn-outline btn-sm remove-toll" data-id="${t.id}">×</button>
        </div>
    `).join('') || '<p style="text-align:center; opacity:0.5">Brak opłat</p>';

    getEl('res-total-transport').textContent = (fuelCostBase + tollsCostBase).toFixed(2);
};

const renderExpensesList = () => {
    const totalSpent = state.expenses.reduce((acc, e) => acc + e.amountInBase, 0);
    getEl('stats-spent').textContent = totalSpent.toFixed(2);
    getEl('stats-left').textContent = (state.trip.totalBudget - totalSpent).toFixed(2);
    getEl('stats-left').style.color = (state.trip.totalBudget - totalSpent) < 0 ? 'var(--danger)' : 'var(--accent)';

    getEl('expenses-list').innerHTML = state.expenses.map((e) => `
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
    `).join('') || '<p style="text-align:center; opacity:0.5">Brak wydatków</p>';
};

// --- HANDLERS ---
document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Tab switching
    if (target.closest('.nav-btn')) {
        const tab = target.closest('.nav-btn').dataset.tab;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        getEl('tab-' + tab).classList.add('active');
        target.closest('.nav-btn').classList.add('active');
    }

    // Theme toggle
    if (target.closest('#theme-btn')) {
        state.settings.theme = state.settings.theme === 'light' ? 'dark' : 'light';
        save(); render();
    }

    // Add category
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

    // Add Expense
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
        state.expenses = state.expenses.filter((x) => x.id != target.dataset.id);
        save(); render();
    }

    // Tolls Logic
    if (target.id === 'btn-add-toll') {
        const name = getEl('toll-name').value;
        const amt = parseFloat(getEl('tolls-amount').value);
        const curr = getEl('tolls-currency').value;
        const fx = parseFloat(getEl('tolls-fx').value) || 1;
        if (name && !isNaN(amt)) {
            if (!state.fuel.tollsList) state.fuel.tollsList = [];
            state.fuel.tollsList.push({ id: Date.now(), name, amount: amt, currency: curr, fxRate: fx });
            save(); render();
            getEl('toll-name').value = ''; getEl('tolls-amount').value = '';
        }
    }
    if (target.classList.contains('remove-toll')) {
        state.fuel.tollsList = state.fuel.tollsList.filter(t => t.id != target.dataset.id);
        save(); render();
    }

    // Checklist logic
    if (target.id === 'btn-add-check') {
        const text = getEl('new-check-text').value;
        const group = getEl('new-check-group').value;
        if (text) {
            state.checklist.push({ id: Date.now(), text, checked: false, group });
            state.lastChecklistGroup = group; // Persist group selection
            save(); render();
            getEl('new-check-text').value = '';
        }
    }
    if (target.classList.contains('check-toggle')) {
        const item = state.checklist.find((i) => i.id == target.dataset.id);
        if (item) item.checked = target.checked;
        save(); render();
    }
    if (target.classList.contains('remove-check')) {
        state.checklist = state.checklist.filter((i) => i.id != target.dataset.id);
        save(); render();
    }

    // Reset
    if (target.id === 'btn-reset') {
        const t = i18n[state.settings.lang] || i18n.pl;
        if (confirm(t.confirm_reset)) {
            state = JSON.parse(JSON.stringify(DEFAULT_STATE));
            save(); render();
        }
    }
    
    // Refresh Rates
    if (target.id === 'btn-refresh-rates') {
        updateRatesFromApi();
    }

    // PDF Export
    if (target.id === 'btn-gen-pdf') {
        generatePDF();
    }
});

// Auto-calc and input tracking
document.addEventListener('input', (e) => {
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
    if (target.id.startsWith('fuel-')) {
        state.fuel.distanceKm = parseFloat(getEl('fuel-dist').value) || 0;
        state.fuel.consumptionLPer100 = parseFloat(getEl('fuel-cons').value) || 0;
        state.fuel.fuelPricePerL = parseFloat(getEl('fuel-price').value) || 0;
        state.fuel.currency = getEl('fuel-currency').value;
        state.fuel.fxRateToBase = parseFloat(getEl('fuel-fx').value) || 1;
        save(); render();
    }
    if (target.id === 'conv-amount' || target.id === 'conv-from') {
        const amt = parseFloat(getEl('conv-amount').value) || 0;
        const from = getEl('conv-from').value;
        const val = amt * (state.currency.manualRates[from] || 1);
        getEl('conv-results').innerHTML = `<div class="stat-val" style="margin-top:10px">${val.toFixed(2)} ${state.trip.baseCurrency}</div>`;
    }
});

document.addEventListener('change', (e) => {
    if (e.target.id === 'exp-currency') {
        getEl('exp-fx').value = (state.currency.manualRates[e.target.value] || 1).toFixed(4);
    }
    if (e.target.id === 'tolls-currency') {
        getEl('tolls-fx').value = (state.currency.manualRates[e.target.value] || 1).toFixed(4);
    }
});

const generatePDF = () => {
    const t = i18n[state.settings.lang] || i18n.pl;
    const incBudget = getEl('pdf-inc-budget').checked;
    const incExpenses = getEl('pdf-inc-expenses').checked;
    const incFuel = getEl('pdf-inc-fuel').checked;
    const incChecklist = getEl('pdf-inc-checklist').checked;

    let html = `<h1>${t.title}</h1><p>Podróż: <strong>${state.trip.name}</strong> (${state.trip.startDate} - ${state.trip.endDate})</p>`;

    if (incBudget) {
        const days = calculateDays();
        html += `<h2>Podsumowanie Budżetu</h2>
        <table>
            <tr><td>Budżet całkowity</td><td>${state.trip.totalBudget.toFixed(2)} ${state.trip.baseCurrency}</td></tr>
            <tr><td>Dni podróży</td><td>${days}</td></tr>
            <tr><td>Budżet dzienny</td><td>${(state.trip.totalBudget / (days || 1)).toFixed(2)} ${state.trip.baseCurrency}</td></tr>
        </table>
        <h3>Planowane kategorie</h3>
        <table>
            <tr><th>Kategoria</th><th>Planowana kwota</th></tr>
            ${state.categories.map(c => `<tr><td>${c.name}</td><td>${c.plannedAmount.toFixed(2)} ${state.trip.baseCurrency}</td></tr>`).join('')}
        </table>`;
    }

    if (incExpenses) {
        const spent = state.expenses.reduce((acc, e) => acc + e.amountInBase, 0);
        html += `<h2>Wydatki Rzeczywiste</h2>
        <p>Suma wydatków: <strong>${spent.toFixed(2)} ${state.trip.baseCurrency}</strong></p>
        <table>
            <tr><th>Data</th><th>Tytuł</th><th>Kategoria</th><th>Kwota</th></tr>
            ${state.expenses.map(e => `<tr><td>${e.date}</td><td>${e.title}</td><td>${e.category}</td><td>${e.amountInBase.toFixed(2)} ${state.trip.baseCurrency}</td></tr>`).join('')}
        </table>`;
    }

    if (incFuel) {
        const fuelLiters = (state.fuel.distanceKm * state.fuel.consumptionLPer100) / 100;
        const fuelCost = fuelLiters * state.fuel.fuelPricePerL * state.fuel.fxRateToBase;
        const tollsCost = (state.fuel.tollsList || []).reduce((acc, t) => acc + (t.amount * t.fxRate), 0);

        html += `<h2>Koszty Transportu</h2>
        <table>
            <tr><td>Dystans</td><td>${state.fuel.distanceKm} km</td></tr>
            <tr><td>Zużycie paliwa</td><td>${fuelLiters.toFixed(1)} L</td></tr>
            <tr><td>Koszt paliwa</td><td>${fuelCost.toFixed(2)} ${state.trip.baseCurrency}</td></tr>
            <tr><td>Suma opłat drogowych</td><td>${tollsCost.toFixed(2)} ${state.trip.baseCurrency}</td></tr>
            <tr><td><strong>Suma transport</strong></td><td><strong>${(fuelCost + tollsCost).toFixed(2)} ${state.trip.baseCurrency}</strong></td></tr>
        </table>
        <h3>Historia opłat</h3>
        <table>
            <tr><th>Nazwa</th><th>Kwota org.</th><th>Wartość (${state.trip.baseCurrency})</th></tr>
            ${(state.fuel.tollsList || []).map(t => `<tr><td>${t.name}</td><td>${t.amount.toFixed(2)} ${t.currency}</td><td>${(t.amount * t.fxRate).toFixed(2)}</td></tr>`).join('')}
        </table>`;
    }

    if (incChecklist) {
        html += `<h2>Lista Kontrolna</h2>`;
        const groups = [...new Set(state.checklist.map(i => i.group))];
        groups.forEach(g => {
            html += `<h3>${g}</h3><ul>`;
            state.checklist.filter(i => i.group === g).forEach(item => {
                html += `<li>[${item.checked ? 'X' : ' '}] ${item.text}</li>`;
            });
            html += `</ul>`;
        });
    }

    getEl('print-view').innerHTML = html;
    window.print();
};

// Initialization
window.addEventListener('DOMContentLoaded', () => {
    getEl('exp-date').valueAsDate = new Date();
    updateRatesFromApi();
    render();
});
