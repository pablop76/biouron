import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import "./validityform";
import "./cookieconsent";
// loads the Icon plugin
UIkit.use(Icons);
setTimeout(() => {
    UIkit.modal("#modal-center").show();
}, 7000);

const showModal = document.querySelectorAll(".showModal");
showModal.forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        UIkit.modal("#modal-center").show();
    })
})
window.CookieConsent.init({
    // More link URL on bar
    modalMainTextMoreLink: null,
    // How lond to wait until bar comes up
    barTimeout: 1000,
    // Look and feel
    theme: {
        barColor: '#72A1AF',
        barTextColor: '#FFF',
        barMainButtonColor: '#FFF',
        barMainButtonTextColor: '#72A1AF',
        modalMainButtonColor: '#72A1AF',
        modalMainButtonTextColor: '#FFF',
    },
    language: {
        // Current language
        current: 'pl',
        locale: {
            pl: {
                barMainText: 'Ta strona korzysta z plików cookie, aby zapewnić najlepszą jakość korzystania z naszej witryny.',
                barLinkSetting: 'Ustawienia plików cookie',
                barBtnAcceptAll: 'Akceptuj wszystkie ciasteczka',
                modalMainTitle: 'Ustawienia plików cookie',
                modalMainText: 'Cookies to niewielkie dane wysyłane ze strony internetowej i przechowywane na komputerze użytkownika przez przeglądarkę internetową użytkownika podczas przeglądania. Twoja przeglądarka przechowuje każdą wiadomość w małym pliku zwanym cookie. Gdy żądasz innej strony z serwera, Twoja przeglądarka wysyła plik cookie z powrotem na serwer. Pliki cookie zostały zaprojektowane jako niezawodny mechanizm zapamiętywania informacji przez strony internetowe lub rejestrowania aktywności przeglądania użytkownika.',
                modalBtnSave: 'Zapisz bieżące ustawienia',
                modalBtnAcceptAll: 'Zaakceptuj wszystkie pliki cookie i zamknij',
                modalAffectedSolutions: 'Rozwiązania, których dotyczy problem:',
                learnMore: 'Dowiedz się więcej',
                on: 'Włączony',
                off: 'Wyłączone',
            }
        }
    },
    // List all the categories you want to display
    categories: {
        // Unique name
        // This probably will be the default category
        necessary: {
            // Ciasteczka tutaj są niezbędne i kategorii nie można wyłączyć.
            // Pożądana wartość konfiguracji zostanie zignorowana.
            needed: true,
            // The cookies in this category will be let trough.
            // This probably should be false if not necessary category
            wanted: true,
            // If the checkbox is on or off at first run.
            checked: true,
            // Language settings for categories
            language: {
                locale: {
                    pl: {
                        name: 'Ściśle niezbędne pliki Cookies',
                        description: ' (NIE wymagają Twojej uprzedniej zgody): są niezbędne dla działania strony. Te pliki cookie oraz informacje, które zawierają, nie powinny być używane dla celów innych niż opisane powyżej. Instalacja ściśle niezbędnych plików cookie nie wymaga Twojej uprzedniej zgody: są one automatycznie instalowane na Twoim urządzeniu, kiedy wchodzisz na stronę. Możesz podjąć decyzję o późniejszym usunięciu tych plików cookie w ustawieniach Twojej przeglądarki sieciowej.',
                    }
                },
            }
        }
    },

    // List actual services here
    services: {
        // Unique name
    }
});
