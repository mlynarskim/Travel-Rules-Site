
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
        packing_progress: "Postęp pakowania", add_to_list: "Dodaj do listy", pdf_title: "Generowanie Raportu", pdf_desc: "Zaznacz, co ma się znaleźć w PDF:",
        confirm_reset: "Czy na pewno zresetować WSZYSTKIE dane?",
        groups: ["Dokumenty", "Ubrania", "Elektronika", "Apteczka", "Auto/Van", "Inne"],
        privacy_title: "Twoja Prywatność",
        privacy_msg: "Dane są zapisywane wyłącznie w Twojej przeglądarce (LocalStorage).",
        toll_name: "Nazwa opłaty", toll_fx: "Kurs waluty opłaty", tolls_history: "Historia Opłat",
        pdf_inc_budget: "Parametry & Budżet", pdf_inc_expenses: "Wydatki rzeczywiste", pdf_inc_fuel: "Transport (Paliwo & Opłaty)", pdf_inc_checklist: "Pełna lista rzeczy",
        // Fuel Specific Labels
        est_fuel_cost_label: "SZACOWANY KOSZT PALIWA",
        fuel_needed_label: "Potrzeba paliwa",
        btn_add_to_history: "DODAJ DO HISTORII",
        btn_export_pdf: "EKSPORTUJ DO PDF",
        // PDF Specific
        pdf_report_title: "Raport Podróży", pdf_period: "Okres", pdf_duration: "Czas trwania", pdf_planned_cat_table: "Planowany budżet kategorii",
        pdf_planned_amt: "Planowana kwota", pdf_total_spent_label: "Łącznie wydano rzeczywisto", pdf_original_amt: "Kwota org.", pdf_base_val: "Wartość",
        pdf_route_params: "Parametry trasy", pdf_avg_consumption: "Średnie spalanie", pdf_needed_fuel: "Potrzebne paliwo", pdf_est_fuel_cost: "Szacowany koszt paliwa",
        pdf_tolls_history: "Historia opłat drogowych", pdf_toll_sum: "Suma opłat", pdf_packed_status: "Spakowano", pdf_yes: "Tak", pdf_no: "Nie",
        pdf_empty_tolls: "Brak dodanych opłat", pdf_empty_expenses: "Brak wydatków"
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
        packing_progress: "Packing Progress", add_to_list: "Add to List", pdf_title: "Generate Report", pdf_desc: "Select sections for export:",
        confirm_reset: "Are you sure you want to reset ALL data?",
        groups: ["Documents", "Clothes", "Electronics", "Medical", "Auto/Van", "Other"],
        privacy_title: "Your Privacy",
        privacy_msg: "All data is stored locally in your browser.",
        toll_name: "Toll name", toll_fx: "Toll currency rate", tolls_history: "Tolls History",
        pdf_inc_budget: "Summary & Budget", pdf_inc_expenses: "Actual Expenses", pdf_inc_fuel: "Transport Costs", pdf_inc_checklist: "Packing Checklist",
        // Fuel Specific Labels
        est_fuel_cost_label: "ESTIMATED FUEL COST",
        fuel_needed_label: "Fuel needed",
        btn_add_to_history: "ADD TO HISTORY",
        btn_export_pdf: "EXPORT TO PDF",
        // PDF Specific
        pdf_report_title: "Trip Report", pdf_period: "Period", pdf_duration: "Duration", pdf_planned_cat_table: "Planned Category Budget",
        pdf_planned_amt: "Planned Amount", pdf_total_spent_label: "Total actual spent", pdf_original_amt: "Orig. Amt", pdf_base_val: "Value",
        pdf_route_params: "Route Parameters", pdf_avg_consumption: "Avg Consumption", pdf_needed_fuel: "Needed Fuel", pdf_est_fuel_cost: "Est. Fuel Cost",
        pdf_tolls_history: "Tolls History", pdf_toll_sum: "Toll Total", pdf_packed_status: "Packed", pdf_yes: "Yes", pdf_no: "No",
        pdf_empty_tolls: "No tolls added", pdf_empty_expenses: "No expenses found"
    },
    es: {
        title: "Planificador de Viajes",
        nav_budget: "Presupuesto", nav_expenses: "Gastos", nav_fuel: "Combustible", nav_rates: "Divisas", nav_list: "Lista", nav_pdf: "PDF",
        trip_params: "Parámetros del Viaje", trip_name: "Nombre del viaje", from: "Desde", to: "Hasta", base_currency: "Moneda principal", total_budget: "Presupuesto total",
        days: "Días", daily: "Diario", planned_cats: "Categorías planificadas", add_cat: "Añadir", reset: "Reiniciar datos",
        add_expense: "Añadir Gasto", when: "Cuándo", title_label: "Título", category: "Categoría", amount: "Monto", currency: "Moneda", fx_rate: "Tasa de cambio",
        total_spent: "Total gastado", left: "Restante", history: "Historial", fuel_calc: "Calculadora de combustible", distance: "Distancia (km)", consumption: "Consumo (L/100km)",
        price_per_l: "Precio por L", fuel_fx: "Tasa de cambio", tolls_title: "Peajes / Carreteras", liters: "Litros", transport_total: "Costo total de transporte",
        converter_title: "Conversor rápido", rates_title: "Tasas de cambio", rates_info: "Define tasas relativas a tu moneda principal.",
        packing_progress: "Progreso de empaque", add_to_list: "Añadir a la lista", pdf_title: "Generar Informe", pdf_desc: "Selecciona secciones para exportar:",
        confirm_reset: "¿Reiniciar todos los datos?",
        groups: ["Documentos", "Ropa", "Electrónica", "Botiquín", "Auto/Van", "Otros"],
        privacy_title: "Privacidad",
        privacy_msg: "Los datos se guardan localmente en su navegador.",
        toll_name: "Nombre del peaje", toll_fx: "Tasa de moneda", tolls_history: "Historial de peajes",
        pdf_inc_budget: "Presupuesto y Parámetros", pdf_inc_expenses: "Gastos reales", pdf_inc_fuel: "Transporte y Peajes", pdf_inc_checklist: "Lista de empaque",
        // Fuel Specific Labels
        est_fuel_cost_label: "COSTO ESTIMADO DE COMBUSTIBLE",
        fuel_needed_label: "Combustible necesario",
        btn_add_to_history: "AÑADIR AL HISTORIAL",
        btn_export_pdf: "EXPORTAR A PDF",
        // PDF Specific
        pdf_report_title: "Informe de Viaje", pdf_period: "Periodo", pdf_duration: "Duración", pdf_planned_cat_table: "Presupuesto por categoría",
        pdf_planned_amt: "Monto planeado", pdf_total_spent_label: "Total gastado real", pdf_original_amt: "Monto org.", pdf_base_val: "Valor",
        pdf_route_params: "Parámetros de ruta", pdf_avg_consumption: "Consumo promedio", pdf_needed_fuel: "Combustible necesario", pdf_est_fuel_cost: "Costo est. de combustible",
        pdf_tolls_history: "Historial de peajes", pdf_toll_sum: "Total de peajes", pdf_packed_status: "Empacado", pdf_yes: "Sí", pdf_no: "No",
        pdf_empty_tolls: "No hay peajes", pdf_empty_expenses: "No hay gastos"
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
    fuel: { distanceKm: 0, consumptionLPer100: 0, fuelPricePerL: 0, currency: 'PLN', fxRateToBase: 1, tollsList: [] },
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

    // Update static labels in UI
    document.querySelectorAll('.base-curr-label').forEach(el => el.textContent = state.trip.baseCurrency);
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
    getEl('ui-toll-name-label').textContent = t.toll_name;
    getEl('ui-tolls-amount-label').textContent = t.amount;
    getEl('ui-tolls-currency-label').textContent = t.currency;
    getEl('ui-toll-fx-label').textContent = t.toll_fx;
    getEl('ui-transport-total-label').textContent = t.transport_total;
    getEl('ui-tolls-history-label').textContent = t.tolls_history;

    // Fuel Labels
    getEl('ui-est-fuel-cost-text').textContent = t.est_fuel_cost_label;
    getEl('ui-fuel-needed-text').textContent = t.fuel_needed_label;
    getEl('btn-add-toll').textContent = t.btn_add_to_history;

    getEl('ui-converter-title').textContent = t.converter_title;
    getEl('ui-rates-title').textContent = t.rates_title;
    getEl('ui-rates-info').textContent = t.rates_info;

    getEl('ui-packing-progress').textContent = t.packing_progress;
    getEl('ui-add-to-list').textContent = t.add_to_list;
    getEl('ui-pdf-title').textContent = t.pdf_title;
    getEl('ui-pdf-desc').textContent = t.pdf_desc;
    getEl('ui-pdf-inc-budget').textContent = t.pdf_inc_budget;
    getEl('ui-pdf-inc-expenses').textContent = t.pdf_inc_expenses;
    getEl('ui-pdf-inc-fuel').textContent = t.pdf_inc_fuel;
    getEl('ui-pdf-inc-checklist').textContent = t.pdf_inc_checklist;
    getEl('btn-gen-pdf').textContent = t.btn_export_pdf;

    getEl('ui-privacy-title').textContent = t.privacy_title;
    getEl('ui-privacy-msg').textContent = t.privacy_msg;

    // Data Sync
    getEl('trip-name').value = state.trip.name;
    getEl('trip-start').value = state.trip.startDate;
    getEl('trip-end').value = state.trip.endDate;
    getEl('trip-total').value = state.trip.totalBudget || '';
    getEl('trip-currency').value = state.trip.baseCurrency;

    const days = calculateDays();
    getEl('stats-days').textContent = days;
    getEl('stats-daily').textContent = ((state.trip.totalBudget / (days || 1)) || 0).toFixed(2);

    // Editable Categories
    getEl('category-list').innerHTML = state.categories.map((c, i) => `
        <div class="list-item">
            <div style="flex: 1;">
                <div class="list-item-title">${c.name}</div>
                <div class="list-item-sub">
                    <input type="number" step="0.01" class="cat-amt-input" data-index="${i}" value="${c.plannedAmount}" 
                           style="width: 100px; padding: 4px; border-radius: 4px; font-size: 0.8rem; margin-top: 4px;">
                    ${state.trip.baseCurrency}
                </div>
            </div>
            <button class="btn btn-outline btn-sm remove-cat" data-index="${i}">X</button>
        </div>
    `).join('');

    // Dynamic Options
    const curKeys = Object.keys(state.currency.manualRates);
    const curOptions = curKeys.map(k => `<option value="${k}">${k}</option>`).join('');
    getEl('exp-currency').innerHTML = curOptions;
    getEl('fuel-currency').innerHTML = curOptions;
    getEl('tolls-currency').innerHTML = curOptions;
    getEl('conv-from').innerHTML = curOptions;
    getEl('exp-cat').innerHTML = state.categories.map((c) => `<option value="${c.name}">${c.name}</option>`).join('');

    renderExpensesList();
    renderFuelAndTolls();

    // Rates
    getEl('rates-list').innerHTML = curKeys.filter(k => k !== state.trip.baseCurrency).map(code => `
        <div class="form-group grid" style="grid-template-columns: 1fr 2fr; align-items:center;">
            <label>1 ${code} =</label>
            <input type="number" step="0.0001" class="rate-input" data-code="${code}" value="${state.currency.manualRates[code].toFixed(4)}">
        </div>
    `).join('');

    // Checklist
    getEl('new-check-group').innerHTML = t.groups.map((g) => `<option value="${g}">${g}</option>`).join('');
    if (state.lastChecklistGroup) getEl('new-check-group').value = state.lastChecklistGroup;
    
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
    `).join('') || `<p style="text-align:center; opacity:0.3; padding: 20px;">...</p>`;

    const totalCheck = state.checklist.length;
    const checkedCheck = state.checklist.filter((i) => i.checked).length;
    getEl('check-progress').style.width = (totalCheck ? (checkedCheck / totalCheck) * 100 : 0) + '%';
    getEl('check-stats').textContent = `${checkedCheck}/${totalCheck}`;
};

const renderFuelAndTolls = () => {
    const fuelLiters = (state.fuel.distanceKm * state.fuel.consumptionLPer100) / 100;
    const fuelCostBase = fuelLiters * state.fuel.fuelPricePerL * state.fuel.fxRateToBase;
    getEl('res-fuel-liters').textContent = fuelLiters.toFixed(1);
    getEl('res-fuel-cost-only').textContent = fuelCostBase.toFixed(2);
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
    `).join('') || '';
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
    `).join('') || '';
};

const generatePDF = () => {
    const t = i18n[state.settings.lang] || i18n.pl;
    const incBudget = getEl('pdf-inc-budget').checked;
    const incExpenses = getEl('pdf-inc-expenses').checked;
    const incFuel = getEl('pdf-inc-fuel').checked;
    const incChecklist = getEl('pdf-inc-checklist').checked;

    let html = `<h1>${t.pdf_report_title}: ${state.trip.name || '-'}</h1>`;
    
    if (incBudget) {
        const days = calculateDays();
        html += `
        <h2>1. ${t.pdf_inc_budget}</h2>
        <table>
            <tr><td>${t.trip_name}</td><td>${state.trip.name || '-'}</td></tr>
            <tr><td>${t.pdf_period}</td><td>${state.trip.startDate || '-'} ${t.to} ${state.trip.endDate || '-'}</td></tr>
            <tr><td>${t.pdf_duration}</td><td>${days} ${t.days.toLowerCase()}</td></tr>
            <tr><td>${t.base_currency}</td><td>${state.trip.baseCurrency}</td></tr>
            <tr><td><strong>${t.total_budget}</strong></td><td><strong>${state.trip.totalBudget.toFixed(2)} ${state.trip.baseCurrency}</strong></td></tr>
        </table>
        <h3>${t.pdf_planned_cat_table}</h3>
        <table>
            <thead><tr><th>${t.category}</th><th>${t.pdf_planned_amt}</th></tr></thead>
            <tbody>${state.categories.map(c => `<tr><td>${c.name}</td><td>${c.plannedAmount.toFixed(2)} ${state.trip.baseCurrency}</td></tr>`).join('')}</tbody>
        </table>`;
    }

    if (incExpenses) {
        const totalEx = state.expenses.reduce((acc, e) => acc + e.amountInBase, 0);
        html += `
        <h2>2. ${t.pdf_inc_expenses}</h2>
        <p>${t.pdf_total_spent_label}: <strong>${totalEx.toFixed(2)} ${state.trip.baseCurrency}</strong></p>
        <table>
            <thead><tr><th>${t.when}</th><th>${t.title_label}</th><th>${t.category}</th><th>${t.pdf_original_amt}</th><th>${t.pdf_base_val} (${state.trip.baseCurrency})</th></tr></thead>
            <tbody>${state.expenses.map(e => `<tr><td>${e.date}</td><td>${e.title}</td><td>${e.category}</td><td>${e.amount} ${e.currency}</td><td>${e.amountInBase.toFixed(2)}</td></tr>`).join('') || `<tr><td colspan="5" style="text-align:center">${t.pdf_empty_expenses}</td></tr>`}</tbody>
        </table>`;
    }

    if (incFuel) {
        const fuelL = (state.fuel.distanceKm * state.fuel.consumptionLPer100) / 100;
        const fuelC = fuelL * state.fuel.fuelPricePerL * state.fuel.fxRateToBase;
        const tollsC = (state.fuel.tollsList || []).reduce((acc, tl) => acc + (tl.amount * tl.fxRate), 0);
        
        html += `
        <h2>3. ${t.pdf_inc_fuel}</h2>
        <h3>${t.pdf_route_params}</h3>
        <table>
            <tr><td>${t.distance}</td><td>${state.fuel.distanceKm} km</td></tr>
            <tr><td>${t.pdf_avg_consumption}</td><td>${state.fuel.consumptionLPer100} L/100km</td></tr>
            <tr><td>${t.price_per_l}</td><td>${state.fuel.fuelPricePerL} ${state.fuel.currency} (${t.fx_rate}: ${state.fuel.fxRateToBase})</td></tr>
            <tr><td>${t.pdf_needed_fuel}</td><td>${fuelL.toFixed(1)} L</td></tr>
            <tr><td><strong>${t.pdf_est_fuel_cost}</strong></td><td><strong>${fuelC.toFixed(2)} ${state.trip.baseCurrency}</strong></td></tr>
        </table>
        
        <h3>${t.pdf_tolls_history}</h3>
        <table>
            <thead><tr><th>${t.toll_name}</th><th>${t.pdf_original_amt}</th><th>${t.pdf_base_val} (${state.trip.baseCurrency})</th></tr></thead>
            <tbody>${(state.fuel.tollsList || []).map(tl => `<tr><td>${tl.name}</td><td>${tl.amount.toFixed(2)} ${tl.currency}</td><td>${(tl.amount * tl.fxRate).toFixed(2)}</td></tr>`).join('') || `<tr><td colspan="3" style="text-align:center">${t.pdf_empty_tolls}</td></tr>`}</tbody>
            <tfoot><tr><td colspan="2"><strong>${t.pdf_toll_sum}</strong></td><td><strong>${tollsC.toFixed(2)} ${state.trip.baseCurrency}</strong></td></tr></tfoot>
        </table>
        <p><strong>${t.transport_total}: ${(fuelC + tollsC).toFixed(2)} ${state.trip.baseCurrency}</strong></p>`;
    }

    if (incChecklist) {
        html += `<h2>4. ${t.pdf_inc_checklist}</h2>`;
        const groups = [...new Set(state.checklist.map(i => i.group))];
        groups.forEach(g => {
            html += `<h3>${g}</h3>
            <table>
                <thead><tr><th style="width:15%">${t.pdf_packed_status}</th><th>${t.title_label}</th></tr></thead>
                <tbody>${state.checklist.filter(i => i.group === g).map(item => `<tr><td style="text-align:center">${item.checked ? t.pdf_yes : t.pdf_no}</td><td>${item.text}</td></tr>`).join('')}</tbody>
            </table>`;
        });
    }

    getEl('print-view').innerHTML = html;
    window.print();
};

// --- HANDLERS ---
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.nav-btn')) {
        const tab = target.closest('.nav-btn').dataset.tab;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        getEl('tab-' + tab).classList.add('active');
        target.closest('.nav-btn').classList.add('active');
    }
    if (target.closest('#theme-btn')) {
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
        state.expenses = state.expenses.filter((x) => x.id != target.dataset.id);
        save(); render();
    }
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
    if (target.id === 'btn-add-check') {
        const text = getEl('new-check-text').value;
        const group = getEl('new-check-group').value;
        if (text) {
            state.checklist.push({ id: Date.now(), text, checked: false, group });
            state.lastChecklistGroup = group;
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
    if (target.id === 'btn-reset') {
        const t = i18n[state.settings.lang] || i18n.pl;
        if (confirm(t.confirm_reset)) {
            state = JSON.parse(JSON.stringify(DEFAULT_STATE));
            save(); render();
        }
    }
    if (target.id === 'btn-refresh-rates') updateRatesFromApi();
    if (target.id === 'btn-gen-pdf') generatePDF();
});

document.addEventListener('input', (e) => {
    const target = e.target;
    if (target.id === 'lang-select') { state.settings.lang = target.value; save(); render(); }
    
    // Editable Category Amount
    if (target.classList.contains('cat-amt-input')) {
        const idx = target.dataset.index;
        state.categories[idx].plannedAmount = parseFloat(target.value) || 0;
        save();
        // Update stats but avoid full re-render to keep focus
        const days = calculateDays();
        getEl('stats-daily').textContent = ((state.trip.totalBudget / (days || 1)) || 0).toFixed(2);
    }

    if (['trip-name', 'trip-start', 'trip-end', 'trip-total', 'trip-currency'].includes(target.id)) {
        state.trip.name = getEl('trip-name').value;
        state.trip.startDate = getEl('trip-start').value;
        state.trip.endDate = getEl('trip-end').value;
        state.trip.totalBudget = parseFloat(getEl('trip-total').value) || 0;
        state.trip.baseCurrency = getEl('trip-currency').value;
        save(); render();
    }
    if (target.classList.contains('rate-input')) { state.currency.manualRates[target.dataset.code] = parseFloat(target.value) || 0; save(); }
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
    if (e.target.id === 'exp-currency') getEl('exp-fx').value = (state.currency.manualRates[e.target.value] || 1).toFixed(4);
    if (e.target.id === 'tolls-currency') getEl('tolls-fx').value = (state.currency.manualRates[e.target.value] || 1).toFixed(4);
});

window.addEventListener('DOMContentLoaded', () => {
    getEl('exp-date').valueAsDate = new Date();
    updateRatesFromApi();
    render();
});
