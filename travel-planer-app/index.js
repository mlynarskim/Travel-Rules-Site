// --- TRANSLATIONS ---
const i18n = {
    pl: {
        title: "Planer Podróży",
        nav_budget: "Budżet", nav_expenses: "Wydatki", nav_fuel: "Opłaty, autostrady, bramki", nav_rates: "Kursy", nav_journal: "Dziennik", nav_list: "Lista", nav_pdf: "PDF",
        trip_params: "Parametry Podróży", trip_name: "Nazwa wyjazdu", from: "Od", to: "Do", base_currency: "Waluta główna", total_budget: "Budżet całkowity",
        days: "Dni", daily: "Dziennie", planned_cats: "Planowane Kategorie", add_cat: "Dodaj", reset: "Zresetuj wszystko",
        add_expense: "Dodaj Wydatek", when: "Kiedy", title_label: "Nazwa", category: "Kategoria", amount: "Kwota", currency: "Waluta", fx_rate: "Kurs",
        history: "Historia", fuel_calc: "Kalkulator Paliwa", distance: "Dystans (km)", consumption: "Spalanie (L/100km)",
        price_per_l: "Cena za litr", fuel_fx: "Kurs waluty paliwa", est_fuel_cost_label: "SZACOWANY KOSZT TRASY",
        packing_progress: "Postęp pakowania", add_to_list: "Dodaj do listy",
        pdf_title: "Generowanie Raportu", 
        pdf_inc_budget: "PARAMETRY & BUDŻET", 
        pdf_inc_expenses: "WYDATKI RZECZYWISTE", 
        pdf_inc_fuel: "TRANSPORT (PALIWO & OPŁATY)", 
        pdf_inc_journal: "DZIENNIK", 
        pdf_inc_list: "PEŁNA LISTA RZECZY",
        btn_export_pdf: "EKSPORTUJ DO PDF", confirm_reset: "Czy na pewno zresetować WSZYSTKIE dane?",
        confirm_clear_journal: "Czy na pewno wyczyścić cały dziennik?",
        journal_title_label: "Tytuł / Lokalizacja (dziedziczona)", week: "Tydzień",
        months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
        weekdays: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
        short_weekdays: ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"],
        groups: ["Dokumenty", "Pieniądze", "Ubrania", "Kosmetyki", "Baño", "Apteczka", "Elektronika", "Kuchnia", "Samochód", "Sprzęt turystyczny", "Inne"],
        refuel_title: "Tankowanie",
        add_refuel: "Dodaj Tankowanie",
        refuel_sum: "SUMA TANKOWANIA:",
        tolls_sum: "SUMA OPŁAT:",
        journal_header: "DZIENNIK",
        converter_title: "Szybki Przelicznik",
        rates_title: "Kursy wymiany",
        cat_stay: "Noclegi",
        cat_food: "Jedzenie",
        cat_transport: "Transport"
    },
    en: {
        title: "Travel Planner",
        nav_budget: "Budget", nav_expenses: "Expenses", nav_fuel: "Tolls & Fuel", nav_rates: "Rates", nav_journal: "Journal", nav_list: "Checklist", nav_pdf: "PDF",
        trip_params: "Trip Parameters", trip_name: "Trip Name", from: "From", to: "To", base_currency: "Base Currency", total_budget: "Total Budget",
        days: "Days", daily: "Daily", planned_cats: "Planned Categories", add_cat: "Add", reset: "Reset All",
        add_expense: "Add Expense", when: "When", title_label: "Name", category: "Category", amount: "Amount", currency: "Currency", fx_rate: "Rate",
        history: "History", fuel_calc: "Fuel Calculator", distance: "Distance (km)", consumption: "Consumption (L/100km)",
        price_per_l: "Price per L", fuel_fx: "Fuel rate", est_fuel_cost_label: "ESTIMATED ROUTE COST",
        packing_progress: "Packing Progress", add_to_list: "Add to list",
        pdf_title: "Generate Report", 
        pdf_inc_budget: "PARAMS & BUDGET", 
        pdf_inc_expenses: "ACTUAL EXPENSES", 
        pdf_inc_fuel: "TRANSPORT (FUEL & TOLLS)", 
        pdf_inc_journal: "JOURNAL", 
        pdf_inc_list: "FULL CHECKLIST",
        btn_export_pdf: "EXPORT TO PDF", confirm_reset: "Are you sure you want to reset ALL data?",
        confirm_clear_journal: "Are you sure you want to clear the entire journal?",
        journal_title_label: "Title / Location (inherited)", week: "Week",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        short_weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        groups: ["Documents", "Money", "Clothes", "Cosmetics", "Bathroom", "First Aid Kit", "Electronics", "Kitchen", "Car", "Camping Gear", "Other"],
        refuel_title: "Refueling",
        add_refuel: "Add Refueling",
        refuel_sum: "TOTAL REFUELING:",
        tolls_sum: "TOTAL TOLLS:",
        journal_header: "JOURNAL",
        converter_title: "Quick Converter",
        rates_title: "Exchange Rates",
        cat_stay: "Accommodation",
        cat_food: "Food",
        cat_transport: "Transport"
    },
    es: {
        title: "Planificador de Viajes",
        nav_budget: "Presupuesto", nav_expenses: "Gastos", nav_fuel: "Peajes y Fuel", nav_rates: "Tasas", nav_journal: "Diario", nav_list: "Lista", nav_pdf: "PDF",
        trip_params: "Parámetros del viaje", trip_name: "Nombre del viaje", from: "Desde", to: "Hasta", base_currency: "Moneda principal", total_budget: "Presupuesto total",
        days: "Días", daily: "Diario", planned_cats: "Categorías planificadas", add_cat: "Añadir", reset: "Reiniciar todo",
        add_expense: "Añadir gasto", when: "Cuándo", title_label: "Nombre", category: "Categoría", amount: "Monto", currency: "Moneda", fx_rate: "Tasa",
        history: "Historial", fuel_calc: "Calculadora de combustible", distance: "Distancia (km)", consumption: "Consumo (L/100km)",
        price_per_l: "Precio por litro", fuel_fx: "Tasa de moneda", est_fuel_cost_label: "COSTO ESTIMADO DE RUTA",
        packing_progress: "Progreso de empaque", add_to_list: "Añadir a la lista",
        pdf_title: "Generar Reporte", 
        pdf_inc_budget: "PARÁMETROS Y PRESUPUESTO", 
        pdf_inc_expenses: "GASTOS REALES", 
        pdf_inc_fuel: "TRANSPORTE (FUEL Y PEAJES)", 
        pdf_inc_journal: "DIARIO", 
        pdf_inc_list: "LISTA COMPLETA",
        btn_export_pdf: "EXPORTAR A PDF", confirm_reset: "¿Estás seguro de reiniciar TODOS los datos?",
        confirm_clear_journal: "¿Estás seguro de borrar todo el diario?",
        journal_title_label: "Título / Ubicación (heredado)", week: "Semana",
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        weekdays: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        short_weekdays: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
        groups: ["Documentos", "Dinero", "Ropa", "Cosméticos", "Baño", "Botiquín", "Electrónica", "Cocina", "Coche", "Equipo de camping", "Otros"],
        refuel_title: "Repostaje",
        add_refuel: "Añadir Repostaje",
        refuel_sum: "SUMA DE REPOSTAJE:",
        tolls_sum: "SUMA DE PEAJES:",
        journal_header: "DIARIO",
        converter_title: "Conversor Rápido",
        rates_title: "Tasas de Cambio",
        cat_stay: "Alojamiento",
        cat_food: "Comida",
        cat_transport: "Transporte"
    }
};

// --- STATE ---
const STORAGE_KEY = 'travel_budget_app_v16';
const DEFAULT_STATE = {
    settings: { lang: 'pl', theme: 'light' },
    trip: { name: '', startDate: '', endDate: '', baseCurrency: 'PLN', totalBudget: 0 },
    categories: [
        { name: 'Noclegi', plannedAmount: 0 }, 
        { name: 'Jedzenie', plannedAmount: 0 }, 
        { name: 'Transport', plannedAmount: 0 }
    ],
    expenses: [],
    fuel: { distanceKm: 0, consumptionLPer100: 0, fuelPricePerL: 0, currency: 'PLN', fxRateToBase: 1, tollsList: [], refuelList: [] },
    currency: { manualRates: { 'PLN': 1, 'EUR': 4.30, 'USD': 3.90, 'GBP': 5.00, 'CHF': 4.50 } },
    journal: { entries: {}, dayTitles: {} },
    checklist: [],
    lastChecklistGroup: '',
    ui: { currentMonth: new Date().getMonth(), currentWeek: 1, currentDay: 0, currentYear: new Date().getFullYear() }
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || JSON.parse(JSON.stringify(DEFAULT_STATE));

const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const getEl = (id) => document.getElementById(id);

// --- HELPERS ---
const parseVal = (val) => {
    if (typeof val === 'string') val = val.replace(',', '.');
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
};

const calculateDays = () => {
    if (!state.trip.startDate || !state.trip.endDate) return 0;
    const start = new Date(state.trip.startDate);
    const end = new Date(state.trip.endDate);
    return Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
};

const setSafeText = (id, text) => {
    const el = getEl(id);
    if (el) el.textContent = text;
};

const getExchangeRate = (curr) => {
    if (curr === state.trip.baseCurrency) return 1.0;
    return state.currency.manualRates[curr] || 1.0;
};

const getEffectiveDayTitle = (m, w, d) => {
    const targetKey = `${m}-${w}-${d}`;
    if (state.journal.dayTitles[targetKey]) return state.journal.dayTitles[targetKey];
    const keys = Object.keys(state.journal.dayTitles).sort();
    const targetVal = m * 1000 + w * 10 + d;
    let lastFound = '';
    for (const k of keys) {
       const parts = k.split('-').map(Number);
       if (parts.length !== 3) continue;
       const [mk, wk, dk] = parts;
       if (mk * 1000 + wk * 10 + dk <= targetVal) {
           if (state.journal.dayTitles[k]) lastFound = state.journal.dayTitles[k];
       } else break;
    }
    return lastFound || state.trip.name || "...";
};

const resetInputs = () => {
    // Czyścimy pola zachowując daty i resetując kursy
    const idsToClear = ['exp-title', 'exp-amount', 'refuel-name', 'refuel-amount', 'toll-name', 'toll-amount', 'new-cat-name', 'new-cat-amount', 'new-check-text'];
    idsToClear.forEach(id => { const el = getEl(id); if(el) el.value = ''; });
    
    // Synchronizacja kursów
    ['exp', 'fuel', 'toll', 'refuel'].forEach(prefix => {
        triggerFxSync(`${prefix}-currency`, `${prefix}-fx`, `${prefix}-fx-group`);
    });
};

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
    } catch (e) { console.warn("Błąd API kursów walut:", e); }
};

// --- PDF EXPORT ---
const generateFullPDF = () => {
    const t = i18n[state.settings.lang] || i18n.pl;
    const printView = getEl('print-view');
    if (!printView) return;

    let html = `<div class="print-header"><h1 style="margin:0; color:#29606D;">${state.trip.name || t.title}</h1><p style="margin:5px 0; font-weight:bold; color:#64748b;">${state.trip.startDate || ''} — ${state.trip.endDate || ''}</p></div>`;

    if (getEl('pdf-inc-budget-check')?.checked) {
        html += `<div class="print-section"><h2 style="color:#29606D; border-bottom:1px solid #ddd; padding-bottom:5px;">${t.pdf_inc_budget}</h2><p><strong>${t.total_budget}:</strong> ${state.trip.totalBudget} ${state.trip.baseCurrency}</p><p><strong>${t.days}:</strong> ${calculateDays()}</p><h3>${t.planned_cats}</h3><table style="width:100%; border-collapse:collapse; margin-bottom:20px;"><thead><tr style="background:#f0f0f0;"><th>${t.category}</th><th>${t.amount}</th></tr></thead><tbody>${state.categories.map(c => `<tr style="border-bottom:1px solid #eee;"><td style="padding:5px;">${c.name}</td><td style="padding:5px;">${c.plannedAmount} ${state.trip.baseCurrency}</td></tr>`).join('')}</tbody></table></div>`;
    }

    if (getEl('pdf-inc-expenses-check')?.checked && state.expenses.length > 0) {
        html += `<div class="print-section"><h2 style="color:#29606D; border-bottom:1px solid #ddd; padding-bottom:5px;">${t.pdf_inc_expenses}</h2><table style="width:100%; border-collapse:collapse; margin-bottom:20px;"><thead><tr style="background:#f0f0f0;"><th>${t.when}</th><th>${t.title_label}</th><th>${t.category}</th><th>${t.amount}</th></tr></thead><tbody>${state.expenses.map(e => `<tr style="border-bottom:1px solid #eee;"><td style="padding:5px;">${e.date}</td><td style="padding:5px;">${e.title}</td><td style="padding:5px;">${e.category}</td><td style="padding:5px;">${e.amountInBase.toFixed(2)} ${state.trip.baseCurrency} ${e.currency !== state.trip.baseCurrency ? `(${e.originalAmount} ${e.currency})` : ''}</td></tr>`).join('')}</tbody></table></div>`;
    }

    if (getEl('pdf-inc-fuel-check')?.checked) {
        html += `<div class="print-section"><h2 style="color:#29606D; border-bottom:1px solid #ddd; padding-bottom:5px;">${t.pdf_inc_fuel}</h2>`;
        if (state.fuel.refuelList.length > 0) {
            html += `<h3>${t.refuel_title}</h3><ul>${state.fuel.refuelList.map(r => `<li>${r.date}: ${r.name} - ${(r.amount * r.fxRate).toFixed(2)} ${state.trip.baseCurrency} ${r.currency !== state.trip.baseCurrency ? `(${r.amount} ${r.currency})` : ''}</li>`).join('')}</ul>`;
        }
        if (state.fuel.tollsList.length > 0) {
            html += `<h3>${t.nav_fuel}</h3><ul>${state.fuel.tollsList.map(r => `<li>${r.date}: ${r.name} - ${(r.amount * r.fxRate).toFixed(2)} ${state.trip.baseCurrency} ${r.currency !== state.trip.baseCurrency ? `(${r.amount} ${r.currency})` : ''}</li>`).join('')}</ul>`;
        }
        html += `</div>`;
    }

    if (getEl('pdf-inc-list-check')?.checked && state.checklist.length > 0) {
        html += `<div class="print-section"><h2 style="color:#29606D; border-bottom:1px solid #ddd; padding-bottom:5px;">${t.pdf_inc_list}</h2>`;
        const groups = [...new Set(state.checklist.map(i => i.group))];
        groups.forEach(g => { html += `<h4>${g}</h4><ul>${state.checklist.filter(i => i.group === g).map(i => `<li>[${i.checked ? 'X' : ' '}] ${i.text}</li>`).join('')}</ul>`; });
        html += `</div>`;
    }

    if (getEl('pdf-inc-journal-check')?.checked) {
        html += `<div class="print-section"><h2 style="color:#29606D; border-bottom:1px solid #ddd; padding-bottom:5px;">${t.pdf_inc_journal}</h2>`;
        Object.keys(state.journal.dayTitles).sort().forEach(k => {
            const [m, w, d] = k.split('-').map(Number);
            const dayEntries = Object.keys(state.journal.entries).filter(ek => ek.startsWith(`${m}-${w}-${d}-`) && state.journal.entries[ek].trim() !== "").sort();
            if (dayEntries.length > 0 || state.journal.dayTitles[k]) {
                html += `<div style="margin-bottom:15px;"><strong>${t.months[m]}, ${t.week} ${w}, ${t.weekdays[d]}</strong><br><em>${state.journal.dayTitles[k] || ''}</em>`;
                dayEntries.forEach(ek => { html += `<div style="font-size:10pt; color:#444;">- ${ek.split('-')[3].padStart(2, '0')}:00: ${state.journal.entries[ek]}</div>`; });
                html += `</div>`;
            }
        });
        html += `</div>`;
    }

    printView.innerHTML = html;
    window.print();
};

// --- CONVERTER ---
const updateQuickConversion = () => {
    const amt = parseVal(getEl('conv-amount')?.value);
    const from = getEl('conv-from')?.value;
    const res = getEl('conv-results');
    if(!res) return;
    if(!amt) { res.innerHTML = ''; return; }
    const valInBase = amt * getExchangeRate(from);
    const others = ['PLN', 'EUR', 'USD', 'GBP'].filter(c => c !== from);
    let html = `<div style="padding:1rem; background:var(--primary); color:white; border-radius:12px; margin-top:10px;"><div style="font-size:0.7rem; opacity:0.8; text-transform:uppercase;">Wartość w ${state.trip.baseCurrency}:</div><div style="font-size:1.4rem; font-weight:800; color:var(--accent);">${valInBase.toFixed(2)} ${state.trip.baseCurrency}</div><hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:10px 0;"><div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">`;
    others.forEach(c => { const rate = getExchangeRate(c); const val = valInBase / rate; html += `<div><small style="opacity:0.6; font-size:0.6rem; text-transform:uppercase;">${c}</small><br><span style="font-weight:700">${val.toFixed(2)}</span></div>`; });
    html += `</div></div>`;
    res.innerHTML = html;
};

// --- RENDER ---
const render = () => {
    const t = i18n[state.settings.lang] || i18n.pl;
    document.body.setAttribute('data-theme', state.settings.theme);
    setSafeText('ui-title', t.title);

    const map = {
        'ui-trip-params': t.trip_params, 'ui-trip-name-label': t.trip_name, 'ui-from-label': t.from, 'ui-to-label': t.to,
        'ui-base-currency-label': t.base_currency, 'ui-total-budget-label': t.total_budget, 'ui-days-label': t.days, 'ui-daily-label': t.daily,
        'ui-planned-cats': t.planned_cats, 'ui-add-expense': t.add_expense, 'ui-exp-date-label': t.when, 'ui-exp-title-label': t.title_label,
        'ui-exp-cat-label': t.category, 'ui-exp-amount-label': t.amount, 'ui-exp-currency-label': t.currency, 'ui-exp-fx-label': t.fx_rate,
        'ui-history-label': t.history, 'ui-fuel-calc': t.fuel_calc, 'ui-fuel-dist-label': t.distance, 'ui-fuel-cons-label': t.consumption,
        'ui-fuel-price-label': t.price_per_l, 'ui-fuel-currency-label': t.currency, 'ui-fuel-fx-label': t.fuel_fx, 'ui-est-fuel-cost-text': t.est_fuel_cost_label,
        'ui-refuel-card-title': t.refuel_title, 'ui-refuel-date-label': t.when, 'ui-refuel-name-label': t.title_label, 'ui-refuel-amount-label': t.amount,
        'ui-refuel-currency-label': t.currency, 'ui-refuel-fx-label': t.fx_rate, 'btn-add-refuel': t.add_refuel, 'ui-refuel-sum-label': t.refuel_sum,
        'ui-tolls-title': t.nav_fuel, 'ui-toll-date-label': t.when, 'ui-toll-name-label': t.title_label, 'ui-toll-amount-label': t.amount,
        'ui-toll-currency-label': t.currency, 'ui-toll-fx-label': t.fx_rate, 'ui-tolls-sum-label': t.tolls_sum,
        'ui-converter-title': t.converter_title, 'ui-rates-title': t.rates_title, 'ui-journal-header-label': t.journal_header,
        'ui-journal-title-label': t.journal_title_label, 'ui-packing-progress': t.packing_progress, 'ui-add-to-list': t.add_to_list,
        'ui-pdf-title': t.pdf_title, 'ui-pdf-inc-budget': t.pdf_inc_budget, 'ui-pdf-inc-expenses': t.pdf_inc_expenses, 'ui-pdf-inc-fuel': t.pdf_inc_fuel,
        'ui-pdf-inc-list': t.pdf_inc_list, 'ui-pdf-inc-journal': t.pdf_inc_journal, 'btn-gen-pdf': t.btn_export_pdf, 'btn-reset': t.reset,
        'btn-refresh-rates': t.nav_rates + " (Online)", 'btn-clear-journal': t.confirm_clear_journal.replace('?', '')
    };

    Object.entries(map).forEach(([id, text]) => { if(getEl(id)) getEl(id).textContent = text; });
    ['budget', 'expenses', 'fuel', 'rates', 'journal', 'list', 'pdf'].forEach(id => { const btn = getEl(`nav-${id}`); if(btn) btn.textContent = t[`nav_${id}`]; });

    const curKeys = Object.keys(state.currency.manualRates);
    const options = curKeys.map(k => `<option value="${k}">${k}</option>`).join('');
    ['exp-currency', 'fuel-currency', 'toll-currency', 'refuel-currency', 'conv-from'].forEach(id => {
        const sel = getEl(id); if(sel) { const v = sel.value; sel.innerHTML = options; if(v && curKeys.includes(v)) sel.value = v; else sel.value = state.trip.baseCurrency; }
    });

    if (getEl('trip-name')) getEl('trip-name').value = state.trip.name;
    if (getEl('trip-start')) getEl('trip-start').value = state.trip.startDate;
    if (getEl('trip-end')) getEl('trip-end').value = state.trip.endDate;
    if (getEl('trip-total')) getEl('trip-total').value = state.trip.totalBudget || '';
    if (getEl('trip-currency')) getEl('trip-currency').value = state.trip.baseCurrency;

    const days = calculateDays();
    setSafeText('stats-days', days);
    setSafeText('stats-daily', ((state.trip.totalBudget / (days || 1)) || 0).toFixed(2));
    document.querySelectorAll('.base-curr-label').forEach(el => el.textContent = state.trip.baseCurrency);

    renderCategories();
    renderExpenses();
    renderFuelAndTransport();
    renderRates();
    renderJournal();
    renderChecklist();
    updateQuickConversion();
};

const renderCategories = () => {
    const spentByCat = state.expenses.reduce((acc, ex) => { acc[ex.category] = (acc[ex.category] || 0) + ex.amountInBase; return acc; }, {});
    const list = getEl('category-list');
    if(!list) return;
    list.innerHTML = state.categories.map((c, i) => {
        const spent = spentByCat[c.name] || 0;
        const progress = c.plannedAmount > 0 ? (spent / c.plannedAmount) * 100 : 0;
        return `<div class="category-block" style="margin-bottom:15px;">
            <div class="list-item" style="border:none; padding:0;">
                <div style="flex:1;"><div style="font-weight:700">${c.name}</div><input type="text" class="cat-amt-input" data-index="${i}" value="${c.plannedAmount}" style="width:80px; padding:4px;"> <small>${state.trip.baseCurrency}</small></div>
                <button class="btn btn-outline btn-sm remove-cat" data-index="${i}">X</button>
            </div>
            <div class="cat-progress-container">
                <div class="cat-progress-bg"><div class="cat-progress-fill ${spent > c.plannedAmount && c.plannedAmount > 0 ? 'over' : ''}" style="width:${Math.min(100, progress)}%"></div></div>
                <div class="cat-progress-label"><span>Wydano: ${spent.toFixed(2)} ${state.trip.baseCurrency}</span><span>${progress.toFixed(0)}%</span></div>
            </div>
        </div>`;
    }).join('');
};

const renderExpenses = () => {
    const expCatSelect = getEl('exp-cat');
    if (expCatSelect) expCatSelect.innerHTML = state.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    const list = getEl('expenses-list');
    if (list) list.innerHTML = state.expenses.map(e => `<div class="list-item"><div class="list-item-main"><div class="list-item-title">${e.title}</div><div class="list-item-sub">${e.date} • ${e.category} ${e.currency !== state.trip.baseCurrency ? `• ${e.originalAmount} ${e.currency}` : ''}</div></div><div class="list-item-values"><div class="list-item-base">${e.amountInBase.toFixed(2)} ${state.trip.baseCurrency}</div></div><button class="btn btn-outline btn-sm remove-exp" data-id="${e.id}">×</button></div>`).join('');
};

const renderFuelAndTransport = () => {
    const dist = parseVal(getEl('fuel-dist')?.value || state.fuel.distanceKm);
    const cons = parseVal(getEl('fuel-cons')?.value || state.fuel.consumptionLPer100);
    const price = parseVal(getEl('fuel-price')?.value || state.fuel.fuelPricePerL);
    const fx = parseVal(getEl('fuel-fx')?.value || state.fuel.fxRateToBase);
    const cost = ((dist * cons) / 100) * price * fx;
    setSafeText('res-fuel-cost-only', cost.toFixed(2));
    const tollsTotal = state.fuel.tollsList.reduce((acc, t) => acc + (t.amount * t.fxRate), 0);
    const refuelTotal = state.fuel.refuelList.reduce((acc, t) => acc + (t.amount * t.fxRate), 0);
    setSafeText('total-refuel-val', refuelTotal.toFixed(2));
    setSafeText('total-tolls-val', tollsTotal.toFixed(2));
    const tList = getEl('tolls-list'); if(tList) tList.innerHTML = state.fuel.tollsList.map(t => `<div class="list-item"><div class="list-item-main"><div class="list-item-title">${t.name}</div><div class="list-item-sub" style="font-size:0.7rem; color:var(--text-muted);">${t.date || ''} ${t.currency !== state.trip.baseCurrency ? `• ${t.amount} ${t.currency}` : ''}</div></div><div class="list-item-values"><div class="list-item-base">${(t.amount * t.fxRate).toFixed(2)} ${state.trip.baseCurrency}</div></div><button class="btn btn-outline btn-sm remove-toll" data-id="${t.id}">×</button></div>`).join('');
    const rList = getEl('refuel-list'); if(rList) rList.innerHTML = state.fuel.refuelList.map(t => `<div class="list-item"><div class="list-item-main"><div class="list-item-title">${t.name}</div><div class="list-item-sub" style="font-size:0.7rem; color:var(--text-muted);">${t.date || ''} ${t.currency !== state.trip.baseCurrency ? `• ${t.amount} ${t.currency}` : ''}</div></div><div class="list-item-values"><div class="list-item-base">${(t.amount * t.fxRate).toFixed(2)} ${state.trip.baseCurrency}</div></div><button class="btn btn-outline btn-sm remove-refuel" data-id="${t.id}">×</button></div>`).join('');
};

const renderRates = () => {
    const list = getEl('rates-list'); if(!list) return;
    list.innerHTML = Object.keys(state.currency.manualRates).filter(k => k !== state.trip.baseCurrency).map(code => `<div class="form-group grid" style="grid-template-columns:1fr 2fr; align-items:center;"><label>1 ${code} =</label><input type="text" class="rate-input" data-code="${code}" value="${state.currency.manualRates[code].toFixed(2)}"></div>`).join('');
};

const renderJournal = () => {
    const t = i18n[state.settings.lang] || i18n.pl;
    const key = `${state.ui.currentMonth}-${state.ui.currentWeek}-${state.ui.currentDay}`;
    const title = getEffectiveDayTitle(state.ui.currentMonth, state.ui.currentWeek, state.ui.currentDay);
    setSafeText('journal-display-title', title);
    setSafeText('journal-current-month', t.months[state.ui.currentMonth]);
    if(getEl('journal-day-title')) getEl('journal-day-title').value = state.journal.dayTitles[key] || '';
    const weekSel = getEl('journal-week-selector'); if(weekSel) weekSel.innerHTML = [1,2,3,4,5,6].map(w => `<button class="sub-btn ${state.ui.currentWeek === w ? 'active' : ''}" onclick="window.setJournalWeek(${w})">${t.week} ${w}</button>`).join('');
    const daySel = getEl('journal-day-selector'); if(daySel) daySel.innerHTML = t.weekdays.map((d, i) => `<button class="sub-btn ${state.ui.currentDay === i ? 'active' : ''}" onclick="window.setJournalDay(${i})">${d}</button>`).join('');
    let html = ''; for (let h = 0; h < 24; h++) { const hKey = `${key}-${h}`; html += `<div class="journal-entry"><span class="journal-hour">${h}:00</span><textarea class="journal-textarea" data-key="${hKey}" oninput="window.saveJournalEntry(this)">${state.journal.entries[hKey] || ''}</textarea></div>`; }
    const cont = getEl('journal-entries-container'); if(cont) cont.innerHTML = html;
    renderCalendar();
};

const renderCalendar = () => {
    const t = i18n[state.settings.lang] || i18n.pl;
    const now = new Date();
    const curD = now.getDate(), curM = now.getMonth(), curY = now.getFullYear();
    const first = (new Date(state.ui.currentYear, state.ui.currentMonth, 1).getDay() + 6) % 7;
    const days = new Date(state.ui.currentYear, state.ui.currentMonth + 1, 0).getDate();
    let html = t.short_weekdays.map(d => `<div class="cal-day-head">${d}</div>`).join('');
    for (let i = 0; i < first; i++) html += `<div class="cal-day other-month"></div>`;
    for (let d = 1; d <= days; d++) {
        const date = new Date(state.ui.currentYear, state.ui.currentMonth, d);
        const wIdx = Math.floor((d + first - 1) / 7) + 1;
        const dIdx = (date.getDay() + 6) % 7;
        const isSel = state.ui.currentWeek === wIdx && state.ui.currentDay === dIdx;
        const isToday = d === curD && state.ui.currentMonth === curM && state.ui.currentYear === curY;
        let hasCont = !!state.journal.dayTitles[`${state.ui.currentMonth}-${wIdx}-${dIdx}`];
        if(!hasCont) for(let h=0; h<24; h++) if(state.journal.entries[`${state.ui.currentMonth}-${wIdx}-${dIdx}-${h}`]) { hasCont = true; break; }
        html += `<div class="cal-day ${isSel ? 'selected' : ''} ${isToday ? 'today-highlight' : ''} ${hasCont ? 'has-content' : ''}" onclick="window.setJournalDate(${d})">${d}</div>`;
    }
    const cal = getEl('journal-calendar'); if(cal) cal.innerHTML = html;
};

const renderChecklist = () => {
    const t = i18n[state.settings.lang] || i18n.pl;
    const sel = getEl('new-check-group'); if(sel) sel.innerHTML = t.groups.map(g => `<option value="${g}">${g}</option>`).join('');
    const cont = getEl('checklist-content'); if(!cont) return;
    const grps = [...new Set(state.checklist.map(i => i.group))];
    cont.innerHTML = grps.map(g => `<div class="card" style="padding:1rem;"><strong>${g}</strong>${state.checklist.filter(i => i.group === g).map(i => `<div class="list-item"><label style="flex:1"><input type="checkbox" class="check-toggle" data-id="${i.id}" ${i.checked ? 'checked' : ''}> ${i.text}</label><button class="btn btn-outline btn-sm remove-check" data-id="${i.id}">×</button></div>`).join('')}</div>`).join('');
    const total = state.checklist.length, checked = state.checklist.filter(i => i.checked).length;
    const fill = getEl('check-progress'); if(fill) fill.style.width = (total ? (checked/total)*100 : 0) + '%';
    setSafeText('check-stats', `${checked}/${total}`);
};

// --- EVENTS ---
window.setJournalWeek = (w) => { state.ui.currentWeek = w; save(); renderJournal(); };
window.setJournalDay = (d) => { state.ui.currentDay = d; save(); renderJournal(); };
window.setJournalDate = (d) => {
    const date = new Date(state.ui.currentYear, state.ui.currentMonth, d);
    state.ui.currentWeek = Math.floor((d + (new Date(state.ui.currentYear, state.ui.currentMonth, 1).getDay()+6)%7 - 1) / 7) + 1;
    state.ui.currentDay = (date.getDay() + 6) % 7; save(); renderJournal();
};
window.saveJournalEntry = (el) => { state.journal.entries[el.dataset.key] = el.value; save(); renderCalendar(); };

document.addEventListener('click', (e) => {
    const t = e.target;
    if (t.closest('.nav-btn')) {
        const tab = t.closest('.nav-btn').dataset.tab;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        getEl('tab-' + tab).classList.add('active'); t.closest('.nav-btn').classList.add('active');
    }
    if (t.id === 'btn-add-cat') {
        const n = getEl('new-cat-name').value, a = parseVal(getEl('new-cat-amount').value);
        if(n) { state.categories.push({ name: n, plannedAmount: a }); save(); render(); resetInputs(); }
    }
    if (t.classList.contains('remove-cat')) { state.categories.splice(t.dataset.index, 1); save(); render(); }
    if (t.id === 'btn-add-exp') {
        const title = getEl('exp-title').value, amt = parseVal(getEl('exp-amount').value), curr = getEl('exp-currency').value;
        if(title && amt) { state.expenses.push({ id: Date.now(), title, originalAmount: amt, currency: curr, amountInBase: amt * (parseVal(getEl('exp-fx').value) || getExchangeRate(curr)), date: getEl('exp-date').value, category: getEl('exp-cat').value }); save(); render(); resetInputs(); }
    }
    if (t.classList.contains('remove-exp')) { state.expenses = state.expenses.filter(x => x.id != t.dataset.id); save(); render(); }
    if (t.id === 'btn-add-refuel') {
        const name = getEl('refuel-name').value, amt = parseVal(getEl('refuel-amount').value), curr = getEl('refuel-currency').value;
        if(name && amt) { state.fuel.refuelList.push({ id: Date.now(), name, amount: amt, currency: curr, fxRate: (parseVal(getEl('refuel-fx').value) || getExchangeRate(curr)), date: getEl('refuel-date').value }); save(); render(); resetInputs(); }
    }
    if (t.id === 'btn-add-toll') {
        const name = getEl('toll-name').value, amt = parseVal(getEl('toll-amount').value), curr = getEl('toll-currency').value;
        if(name && amt) { state.fuel.tollsList.push({ id: Date.now(), name, amount: amt, currency: curr, fxRate: (parseVal(getEl('toll-fx').value) || getExchangeRate(curr)), date: getEl('toll-date').value }); save(); render(); resetInputs(); }
    }
    if (t.classList.contains('remove-refuel')) { state.fuel.refuelList = state.fuel.refuelList.filter(x => x.id != t.dataset.id); save(); render(); }
    if (t.classList.contains('remove-toll')) { state.fuel.tollsList = state.fuel.tollsList.filter(x => x.id != t.dataset.id); save(); render(); }
    if (t.id === 'btn-reset') { if(confirm(i18n[state.settings.lang].confirm_reset)) { localStorage.removeItem(STORAGE_KEY); location.reload(); } }
    if (t.closest('#theme-btn')) { state.settings.theme = state.settings.theme === 'light' ? 'dark' : 'light'; save(); render(); }
    if (t.id === 'btn-add-check') {
        const text = getEl('new-check-text').value;
        if(text) { state.checklist.push({ id: Date.now(), text, checked: false, group: getEl('new-check-group').value }); save(); renderChecklist(); resetInputs(); }
    }
    if (t.classList.contains('check-toggle')) { const item = state.checklist.find(i => i.id == t.dataset.id); if(item) item.checked = t.checked; save(); renderChecklist(); }
    if (t.classList.contains('remove-check')) { state.checklist = state.checklist.filter(i => i.id != t.dataset.id); save(); renderChecklist(); }
    if (t.id === 'btn-refresh-rates') updateRatesFromApi();
    if (t.id === 'btn-clear-journal') { if(confirm(i18n[state.settings.lang].confirm_clear_journal)) { state.journal.entries = {}; state.journal.dayTitles = {}; save(); renderJournal(); } }
    if (t.id === 'journal-month-prev') { state.ui.currentMonth = (state.ui.currentMonth + 11) % 12; save(); renderJournal(); }
    if (t.id === 'journal-month-next') { state.ui.currentMonth = (state.ui.currentMonth + 1) % 12; save(); renderJournal(); }
    if (t.id === 'btn-gen-pdf') generateFullPDF();
});

document.addEventListener('input', (e) => {
    const id = e.target.id;
    if (['trip-name', 'trip-start', 'trip-end', 'trip-total', 'trip-currency'].includes(id)) {
        state.trip.name = getEl('trip-name').value; state.trip.startDate = getEl('trip-start').value;
        state.trip.endDate = getEl('trip-end').value; state.trip.totalBudget = parseVal(getEl('trip-total').value);
        if (id === 'trip-currency') { state.trip.baseCurrency = getEl('trip-currency').value; updateRatesFromApi(); }
        save();
        // Chirurgia: Aktualizacja tylko potrzebnych pól statystyk zamiast pełnego render()
        setSafeText('stats-days', calculateDays());
        setSafeText('stats-daily', ((state.trip.totalBudget / (calculateDays() || 1)) || 0).toFixed(2));
    }
    if (id === 'conv-amount') updateQuickConversion();
    if (id === 'journal-day-title') {
        const key = `${state.ui.currentMonth}-${state.ui.currentWeek}-${state.ui.currentDay}`;
        state.journal.dayTitles[key] = e.target.value; save();
        setSafeText('journal-display-title', getEffectiveDayTitle(state.ui.currentMonth, state.ui.currentWeek, state.ui.currentDay));
        renderCalendar();
    }
    if (e.target.classList.contains('cat-amt-input')) {
        const index = e.target.dataset.index;
        const newVal = parseVal(e.target.value);
        state.categories[index].plannedAmount = newVal;
        save();
        // Chirurgia: Aktualizujemy tylko paski postępu bez przerywania pisania
        const block = e.target.closest('.category-block');
        const spentByCat = state.expenses.reduce((acc, ex) => { acc[ex.category] = (acc[ex.category] || 0) + ex.amountInBase; return acc; }, {});
        const spent = spentByCat[state.categories[index].name] || 0;
        const prog = newVal > 0 ? (spent / newVal) * 100 : 0;
        const fill = block.querySelector('.cat-progress-fill');
        if(fill) { fill.style.width = Math.min(100, prog) + '%'; fill.classList.toggle('over', spent > newVal && newVal > 0); }
        const labels = block.querySelectorAll('.cat-progress-label span');
        if(labels.length > 1) labels[1].textContent = prog.toFixed(0) + '%';
        setSafeText('stats-daily', ((state.trip.totalBudget / (calculateDays() || 1)) || 0).toFixed(2));
    }
    if (e.target.classList.contains('rate-input')) { state.currency.manualRates[e.target.dataset.code] = parseVal(e.target.value); save(); }
    if (id.startsWith('fuel-') || id.startsWith('toll-') || id.startsWith('refuel-')) renderFuelAndTransport();
});

const triggerFxSync = (currId, fxId, groupId) => {
    const curr = getEl(currId)?.value, fxEl = getEl(fxId), groupEl = getEl(groupId);
    if(fxEl) fxEl.value = getExchangeRate(curr).toFixed(4);
    if(groupEl) groupEl.style.display = (curr === state.trip.baseCurrency) ? 'none' : 'block';
};

document.addEventListener('change', (e) => {
    const id = e.target.id;
    if (id === 'lang-select') { state.settings.lang = e.target.value; save(); render(); }
    if (id === 'conv-from') updateQuickConversion();
    ['exp', 'fuel', 'toll', 'refuel'].forEach(p => { if(id === `${p}-currency`) triggerFxSync(`${p}-currency`, `${p}-fx`, `${p}-fx-group`); });
});

window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    ['exp-date', 'refuel-date', 'toll-date'].forEach(id => { if(getEl(id)) getEl(id).value = today; });
    const now = new Date();
    state.ui.currentMonth = now.getMonth(); state.ui.currentYear = now.getFullYear();
    const dayOffset = (new Date(now.getFullYear(), now.getMonth(), 1).getDay() + 6) % 7;
    state.ui.currentWeek = Math.floor((now.getDate() + dayOffset - 1) / 7) + 1;
    state.ui.currentDay = (now.getDay() + 6) % 7;
    updateRatesFromApi(); render();
});