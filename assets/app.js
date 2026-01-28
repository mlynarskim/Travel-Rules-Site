    // Prevent double init if app.js is also loaded
    if (window.__TR_APP_INIT__) {
      // Already initialized by external script
      return;
    }
    window.__TR_APP_INIT__ = true;

    document.addEventListener('DOMContentLoaded', () => {
      /* ========== MENU TOGGLE (MOBILE) ========== */
      const menuToggle = document.getElementById('menuToggle');
      const navUl = document.getElementById('primaryNav');
      if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
          const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
          menuToggle.setAttribute('aria-expanded', String(!expanded));
          navUl.classList.toggle('show-menu');
          // Close menu after selecting a link (mobile)
          if (!expanded) {
            navUl.querySelectorAll('a').forEach(a => {
              a.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navUl.classList.remove('show-menu');
              }, { once: true });
            });
          }
        });
      }

      /* ========== THEME + DARK MODE + LANGUAGE (PERSISTENT) ========== */
      const body = document.body;

      const themeSelect = document.getElementById('themeSelect');
      const darkModeToggle = document.getElementById('darkModeToggle');
      const themeIcons = document.querySelectorAll('.theme-icons img');
      const langFlags = document.querySelectorAll('.flag-emoji');
      const languageSelect = document.getElementById('languageSelect'); // (opcjonalny, może nie istnieć)

      const translations = {
        pl: {
          logo: "Travel Rules",
          about: "O Aplikacji",
          features: "Funkcje",
          updates: "Aktualności",
          links: "Linki",
          travel_planner: "Travel Planner App",
          download: "Pobierz",
          contact: "Kontakt",
          hero_title: "Travel Rules",
          hero_subtitle: "Twoje codzienne źródło inspiracji i praktycznych wskazówek.",
          learn_more: "Dowiedz się więcej",
          about_title: "Travel Rules",
          about_text: "Aplikacja, dzięki której odkryjesz uroki vanlife w zupełnie nowy sposób. Codzienne zasady, checklisty, zapisy miejsc oraz nowa mapa z punktami w pobliżu i budowanie planu podróży — wszystko w eleganckim, minimalistycznym wydaniu.",
          screenshots_title: "Zobacz, jak to wygląda",
          screenshots_title2: "Zobacz, jak to wygląda",
          updates_title: "Aktualności",
          extended_title: "Rozszerzone Funkcje",
          extended_loc_title: "Zapisywanie lokalizacji",
          extended_loc_text: "Można teraz zapisywać i łatwo znajdować zapisane lokalizacje na mapie. Możliwość otwierania lokalizacji w Mapach Google i Mapach Apple.",
          extended_nearby_title: "Mapa: punkty w pobliżu + plan podróży",
          extended_nearby_text: "Nowa mapa pokazuje punkty w pobliżu (np. spoty, parkingi, atrakcje) i pozwala budować prosty plan trasy. Dodawaj miejsca do planu, układaj kolejność i otwieraj nawigację w Mapach Apple lub Google.",
          extended_rules_title: "Nowe zasady podróży",
          extended_rules_text: "Dodano więcej zasad i poprawiono ich organizację, aby były jeszcze bardziej przydatne.",
          extended_achievements_title: "System osiągnięć",
          extended_achievements_text: "Możesz teraz zbierać osiągnięcia za korzystanie z aplikacji, takie jak „Regularny podróżnik” i „Mistrz konsekwencji”.",
          extended_emergency_title: "Numery alarmowe dla różnych krajów",
          extended_emergency_text: "Aplikacja automatycznie rozpoznaje kraj i wyświetla odpowiednie numery alarmowe oraz przydatne linki.",
          extended_packing_title: "Lista rzeczy do spakowania",
          extended_packing_text: "Teraz możesz utworzyć i spersonalizować listę rzeczy do spakowania przed podróżą.",
          extended_notifications_title: "Nowe powiadomienia",
          extended_notifications_text: "Możliwość ustawienia powiadomień o zasadach obowiązujących w danym dniu oraz przypomnień o ważnych dokumentach.",
          extended_docs_title: "Powiadomienia o wygasających dokumentach",
          extended_docs_text: "Dodano opcję otrzymywania powiadomień na miesiąc przed wygaśnięciem ważnych dokumentów.",
          extended_personalization_title: "Personalizacja aplikacji",
          extended_personalization_text: "Możliwość zmiany motywu kolorystycznego, w tym trybu klasycznego, górskiego, plażowego, pustynnego i leśnego.",
          extended_improvements_title: "Ulepszenia i optymalizacje",
          extended_improvements_text: "Naprawiono błędy interfejsu, ulepszono zarządzanie powiadomieniami oraz wyświetlanie reklam.",
          cta_title: "Zacznij organizować swoje podróże już teraz!",
          cta_text: "Pobierz Travel Rules na swoje urządzenie iOS. Aplikacja dostępna wyłącznie na iOS – poczuj różnicę dzięki intuicyjnemu interfejsowi i zaawansowanym funkcjom.",
          contact_title: "Kontakt",
          contact_name: "Imię:",
          contact_email: "Email:",
          contact_message: "Wiadomość:",
          dark_mode: "Tryb ciemny"
        },
        en: {
          logo: "Travel Rules",
          about: "About",
          features: "Features",
          updates: "Updates",
          links: "Links",
          travel_planner: "Travel Planner App",
          download: "Download",
          contact: "Contact",
          hero_title: "Travel Rules",
          hero_subtitle: "Your daily source of inspiration and practical tips.",
          learn_more: "Learn More",
          about_title: "Travel Rules",
          about_text: "An app that lets you discover the charm of vanlife in a completely new way. Daily rules, checklists, saved spots, plus a new map with nearby points and an easy trip plan builder — all in an elegant, minimalist design.",
          screenshots_title: "See How It Looks",
          screenshots_title2: "See How It Looks",
          updates_title: "Updates",
          extended_title: "Extended Features",
          extended_loc_title: "Location Saving",
          extended_loc_text: "You can now save locations and easily find them on the map. You can open saved locations in Google Maps and Apple Maps.",
          extended_nearby_title: "Map: nearby points + trip plan",
          extended_nearby_text: "A new map shows points nearby (spots, parking, attractions) and lets you build a simple route plan. Add places, reorder them, and open navigation in Apple Maps or Google Maps.",
          extended_rules_title: "New Travel Rules",
          extended_rules_text: "More rules have been added and organized to be even more useful.",
          extended_achievements_title: "Achievement System",
          extended_achievements_text: "Earn achievements for using the app, such as 'Regular Traveler' and 'Consistency Master'.",
          extended_emergency_title: "Emergency Numbers for Different Countries",
          extended_emergency_text: "The app automatically detects your country and displays the appropriate emergency numbers along with useful links.",
          extended_packing_title: "Packing List",
          extended_packing_text: "Now you can create and personalize a packing list before your trip.",
          extended_notifications_title: "New Notifications",
          extended_notifications_text: "Set notifications for daily rules and reminders for important documents.",
          extended_docs_title: "Expiring Documents Notifications",
          extended_docs_text: "A new option to receive notifications one month before important documents expire has been added.",
          extended_personalization_title: "App Personalization",
          extended_personalization_text: "Change the color theme with options including classic, mountain, beach, desert, and forest.",
          extended_improvements_title: "Improvements and Optimizations",
          extended_improvements_text: "Interface bugs have been fixed, notification management enhanced, and ads now appear in more natural, less intrusive locations.",
          cta_title: "Start Organizing Your Travels Now!",
          cta_text: "Download Travel Rules for iOS. Available exclusively on iOS – experience the difference with our intuitive interface and advanced features.",
          contact_title: "Contact",
          contact_name: "Name:",
          contact_email: "Email:",
          contact_message: "Message:",
          dark_mode: "Dark mode"
        },
        es: {
          logo: "Travel Rules",
          about: "Acerca de",
          features: "Funciones",
          updates: "Actualizaciones",
          links: "Enlaces",
          travel_planner: "Travel Planner App",
          download: "Descargar",
          contact: "Contacto",
          hero_title: "Travel Rules",
          hero_subtitle: "Tu fuente diaria de inspiración y consejos prácticos.",
          learn_more: "Saber más",
          about_title: "Travel Rules",
          about_text: "Una aplicación que te permite descubrir el encanto del van-life de una manera totalmente nueva. Reglas diarias, listas, lugares guardados y un nuevo mapa con puntos cercanos y creador de plan de viaje — todo con un diseño elegante y minimalista.",
          screenshots_title: "Mira cómo se ve",
          screenshots_title2: "Mira cómo se ve",
          updates_title: "Actualizaciones",
          extended_title: "Funciones Avanzadas",
          extended_loc_title: "Guardar Ubicaciones",
          extended_loc_text: "Ahora puedes guardar ubicaciones y encontrarlas fácilmente en el mapa. Ábrelas en Google Maps o Apple Maps.",
          extended_nearby_title: "Mapa: puntos cercanos + plan de viaje",
          extended_nearby_text: "Un nuevo mapa muestra puntos cercanos (spots, aparcamientos, atracciones) y te permite crear un plan de ruta sencillo. Añade lugares, cambia el orden y abre la navegación en Apple Maps o Google Maps.",
          extended_rules_title: "Nuevas Reglas de Viaje",
          extended_rules_text: "Se añadieron más reglas y se organizaron para que sean aún más útiles.",
          extended_achievements_title: "Sistema de Logros",
          extended_achievements_text: "Consigue logros por usar la app, como «Viajero Frecuente» o «Maestro de la Constancia».",
          extended_emergency_title: "Números de Emergencia Internacionales",
          extended_emergency_text: "La app detecta tu país y muestra los números de emergencia y enlaces útiles correspondientes.",
          extended_packing_title: "Lista de Empaque",
          extended_packing_text: "Crea y personaliza tu lista de empaque antes de viajar.",
          extended_notifications_title: "Nuevas Notificaciones",
          extended_notifications_text: "Configura recordatorios diarios de reglas y alertas para documentos importantes.",
          extended_docs_title: "Alertas de Documentos por Caducar",
          extended_docs_text: "Recibe avisos un mes antes de que caduquen documentos importantes.",
          extended_personalization_title: "Personalización de la App",
          extended_personalization_text: "Cambia el tema de color: clásico, montaña, playa, desierto o bosque.",
          extended_improvements_title: "Mejoras y Optimización",
          extended_improvements_text: "Errores solucionados, notificaciones mejoradas y anuncios menos intrusivos.",
          cta_title: "¡Empieza a organizar tus viajes ahora!",
          cta_text: "Descarga Travel Rules para iOS. Disponible exclusivamente en iOS: disfruta de una interfaz intuitiva y funciones avanzadas.",
          contact_title: "Contacto",
          contact_name: "Nombre:",
          contact_email: "Correo:",
          contact_message: "Mensaje:",
          dark_mode: "Modo oscuro"
        }
      };

      function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-lang-key]').forEach(el => {
          const key = el.getAttribute('data-lang-key');
          if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
          }
        });
      }

      function applyTheme(themeName) {
        if (!themeName) return;
        body.classList.remove('theme-classic', 'theme-mountain', 'theme-beach', 'theme-desert', 'theme-forest');
        body.classList.add(`theme-${themeName}`);
        if (themeSelect) themeSelect.value = themeName;
        localStorage.setItem('tr_theme', themeName);
      }

      function applyDarkMode(isDark) {
        if (isDark) {
          body.classList.add('dark-mode');
          localStorage.setItem('tr_dark', '1');
        } else {
          body.classList.remove('dark-mode');
          localStorage.removeItem('tr_dark');
        }
        if (darkModeToggle) darkModeToggle.checked = !!isDark;
      }

      /* Load saved prefs */
      const savedTheme = localStorage.getItem('tr_theme');
      const savedDark = localStorage.getItem('tr_dark') === '1';
      const savedLang = localStorage.getItem('tr_lang');

      if (savedTheme) applyTheme(savedTheme);
      if (savedDark) applyDarkMode(true);

      if (savedLang && ['pl', 'en', 'es'].includes(savedLang)) {
        setLanguage(savedLang);
      }

      /* Prefer saved language, then browser */
      const initialLang = savedLang || (navigator.language ? navigator.language.slice(0, 2) : 'pl');
      if (['pl', 'en', 'es'].includes(initialLang)) {
        setLanguage(initialLang);
        if (languageSelect) languageSelect.value = initialLang;
      } else {
        setLanguage('pl');
        if (languageSelect) languageSelect.value = 'pl';
      }

      /* Theme select (desktop) */
      if (themeSelect) {
        themeSelect.addEventListener('change', (event) => {
          applyTheme(event.target.value);
        });
      }

      /* Theme icons (mobile) */
      if (themeIcons && themeIcons.length) {
        themeIcons.forEach(icon => {
          icon.addEventListener('click', () => {
            const themeName = icon.getAttribute('data-theme');
            applyTheme(themeName);
          });
        });
      }

      /* Dark mode toggle */
      if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (event) => {
          applyDarkMode(event.target.checked);
        });
      }

      /* Language flags (mobile + desktop) */
      langFlags.forEach(flag => {
        flag.addEventListener('click', () => {
          const lang = flag.getAttribute('data-lang');
          if (!lang) return;
          setLanguage(lang);
          localStorage.setItem('tr_lang', lang);
          if (languageSelect) languageSelect.value = lang;
        });
      });

      /* Optional language select (if you add it back someday) */
      if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
          const lang = e.target.value;
          setLanguage(lang);
          localStorage.setItem('tr_lang', lang);
        });
      }

      /* ========== FEATURE BOX ANIMATION ========== */
      const featureBoxes = document.querySelectorAll('.feature-box');
      if (featureBoxes.length) {
        const observerOptions = { threshold: 0.3 };
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              obs.unobserve(entry.target);
            }
          });
        }, observerOptions);
        featureBoxes.forEach(box => observer.observe(box));
      }

      /* ✅ Rozwijany kontener (guard, żeby nie wywalało JS gdy elementy są zakomentowane) */
      const collapsibleHeader = document.getElementById('collapsibleHeader');
      const collapsibleContent = document.getElementById('collapsibleContent');
      if (collapsibleHeader && collapsibleContent) {
        function toggleCollapsible() {
          const isOpen = collapsibleContent.classList.toggle('show');
          collapsibleHeader.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
        collapsibleHeader.addEventListener('click', toggleCollapsible);
        collapsibleHeader.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCollapsible();
          }
        });
      }

      /* === App Store release notes (JSONP, bez CORS) === */
      (function loadAppStoreReleaseNotes() {
        var APP_ID = '6451070215';
        var COUNTRY = (document.documentElement.lang || 'pl').slice(0, 2);
        var target = document.getElementById('appstore-updates');
        if (!target) return;

        var handled = false;
        var cbName = 'appStoreCB_' + Date.now();
        var timeoutId;
        var script;

        function showFallback(msg) {
          target.innerHTML = '<p>' + msg + '</p>' +
            '<p style="margin-top:8px"><a href="https://apps.apple.com/' + COUNTRY + '/app/travel-rules/id6451070215" target="_blank" rel="noopener">Zobacz w App Store</a></p>';
        }

        function cleanup() {
          clearTimeout(timeoutId);
          try { delete window[cbName]; } catch (_) { }
          if (script && script.parentNode) script.parentNode.removeChild(script);
        }

        window[cbName] = function (data) {
          handled = true;
          try {
            if (!data || !data.results || !data.results.length) {
              showFallback('Brak danych z App Store.');
              return;
            }
            var app = data.results[0];
            var ver = app.version || '—';
            var relNotes = (app.releaseNotes || '').replace(/\n/g, '<br>');
            var date = app.currentVersionReleaseDate ? new Date(app.currentVersionReleaseDate) : null;
            var datePL = date ? date.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';
            var link = app.trackViewUrl || 'https://apps.apple.com/' + COUNTRY + '/app/travel-rules/id' + APP_ID;

            target.innerHTML = `
              <h3 style="margin-top:0">Co nowego w wersji ${ver}</h3>
              <p class="small" style="margin:4px 0 12px; opacity:.8">Data wydania: ${datePL}</p>
              <div class="card" style="margin:0;">
                ${relNotes || 'Brak opisu zmian.'}
              </div>
              <p style="margin-top:12px;">
                <a href="${link}" target="_blank" rel="noopener">Zobacz w App Store</a>
              </p>
            `;
          } catch (e) {
            showFallback('Nie udało się wczytać danych z App Store.');
          } finally {
            cleanup();
          }
        };

        // timeout na wypadek blokady requestu przez przeglądarkę/adblock
        timeoutId = setTimeout(function () {
          if (!handled) {
            showFallback('Nie można połączyć z App Store (sprawdź sieć lub blokady).');
            cleanup();
          }
        }, 6000);

        script = document.createElement('script');
        script.src = `https://itunes.apple.com/lookup?id=${APP_ID}&country=${COUNTRY}&callback=${cbName}`;
        script.onerror = function () { handled = true; showFallback('Nie udało się połączyć z App Store.'); cleanup(); };
        document.body.appendChild(script);
      })();

      /* ========== CONTACT FORM (AJAX) ========== */
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const status = document.getElementById('formStatus');
          if (status) status.textContent = 'Wysyłanie...';

          const data = new FormData(contactForm);
          // honeypot
          if (data.get('website')) {
            if (status) status.textContent = 'Dziękujemy!';
            contactForm.reset();
            return;
          }

          try {
            const res = await fetch(contactForm.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
            if (res.ok) {
              if (status) status.textContent = 'Dziękujemy! Wiadomość została wysłana.';
              contactForm.reset();
            } else {
              if (status) status.textContent = 'Ups, nie udało się wysłać. Spróbuj ponownie.';
            }
          } catch (_) {
            if (status) status.textContent = 'Błąd sieci. Spróbuj ponownie później.';
          }
        });
      }
    });
