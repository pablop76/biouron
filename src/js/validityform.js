import UIkit from 'uikit';
function toggleErrorField(field, show) {
    const errorText = field.nextElementSibling;
    if (errorText !== null) {
        if (errorText.classList.contains("form-error-text")) {
            errorText.style.display = show ? "block" : "none";
            errorText.setAttribute('aria-hidden', show);
        }
    }
};

function markFieldAsError(field, show) {
    if (show) {
        field.classList.add("field-error-input");
    } else {
        field.classList.remove("field-error-input");
        toggleErrorField(field, false);
    }
};

function removeFieldError(field) {
    const errorText = field.nextElementSibling;
    if (errorText !== null) {
        if (errorText.classList.contains("form-error-text")) {
            errorText.remove();
        }
    }
};

function createFieldError(field, text) {
    removeFieldError(field);

    const div = document.createElement("div");
    div.classList.add("form-error-text");
    div.innerText = text;
    if (field.nextElementSibling === null) {
        field.parentElement.appendChild(div);
    } else {
        if (!field.nextElementSibling.classList.contains("form-error-text")) {
            field.parentElement.insertBefore(div, field.nextElementSibling);
        }
    }
};

const form = document.querySelector("form");
const inputName = form.querySelector("input[name=name]");
const inputPhone = form.querySelector("input[name=phone]");
const inputPrivatePolice = form.querySelector("input[name=private-police]");
const submit = form.querySelector("button");
const resultSend = document.querySelector(".result-send")

const inputs = [inputName, inputPhone, inputPrivatePolice];

form.setAttribute("novalidate", true);

for (const el of inputs) {
    el.addEventListener("input", e => markFieldAsError(e.target, !e.target.checkValidity()));
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formErrors = false;

    for (const el of inputs) {
        removeFieldError(el);
        el.classList.remove("field-error");

        if (!el.checkValidity()) {
            createFieldError(el, el.dataset.textError);
            el.classList.add("field-error");
            formErrors = true;
        }
    }

    if (!formErrors) {
        submit.disabled = true;
        submit.classList.add("loading");

        const formData = new FormData(form);
        console.log(formData);

        const url = form.getAttribute("action");
        const method = form.getAttribute("method");

        fetch(url, {
            method: method,
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                if (res.errors) {
                    const selectors = res.errors.map(el => `[name="${el}"]`);
                    const fieldsWithErrors = form.querySelectorAll(selectors.join(","));
                    for (const el of fieldsWithErrors) {
                        markFieldAsError(el, true);
                        toggleErrorField(el, true);
                    }
                } else {
                    if (res.status === "ok") {
                        resultSend.innerHTML = `          
                        <div class="uk-alert-success" data-uk-alert>
                            <a class="uk-alert-close" data-uk-close></a>
                            <p>Dziękujemy za wysłanie wiadomości. Nasz Specjalista skontaktuje się z Tobą w celu realizacji zamówienia.</p>
                        </div>`
                    }
                    if (res.status === "error") {
                        resultSend.innerHTML = `          
                        <div class="uk-alert-danger" data-uk-alert>
                            <a class="uk-alert-close" data-uk-close></a>
                            <p>Wiadomość nie została wysłana. Sprubój ponownie później</p>
                        </div>
                       `
                    }
                }
            }).finally(() => {
                submit.disabled = false;
                submit.classList.remove("loading");
                form.reset();
                if (document.querySelector(".uk-alert")) {
                    setTimeout(() => {
                        UIkit.alert(".uk-alert").close();
                    }, 10000)
                }
            });
    }
});

const popupForm = () => {
    const form = document.querySelector(".formPopup");
    const inputName = form.querySelector("input[name=name]");
    const inputPhone = form.querySelector("input[name=phone]");
    const inputPrivatePolice = form.querySelector("input[name=private-police]");
    const submit = form.querySelector("button");
    const resultSend = document.querySelector(".result-send-popup")

    const inputs = [inputName, inputPhone, inputPrivatePolice];

    form.setAttribute("novalidate", true);

    for (const el of inputs) {
        el.addEventListener("input", e => markFieldAsError(e.target, !e.target.checkValidity()));
    }


    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let formErrors = false;

        for (const el of inputs) {
            removeFieldError(el);
            el.classList.remove("field-error");

            if (!el.checkValidity()) {
                createFieldError(el, el.dataset.textError);
                el.classList.add("field-error");
                formErrors = true;
            }
        }

        if (!formErrors) {
            submit.disabled = true;
            submit.classList.add("loading");

            const formData = new FormData(form);
            console.log(formData);

            const url = form.getAttribute("action");
            const method = form.getAttribute("method");

            fetch(url, {
                method: method,
                body: formData
            })
                .then(res => res.json())
                .then(res => {
                    if (res.errors) {
                        const selectors = res.errors.map(el => `[name="${el}"]`);
                        const fieldsWithErrors = form.querySelectorAll(selectors.join(","));
                        for (const el of fieldsWithErrors) {
                            markFieldAsError(el, true);
                            toggleErrorField(el, true);
                        }
                    } else {
                        if (res.status === "ok") {
                            resultSend.innerHTML = `          
                        <div class="uk-alert-success" data-uk-alert>
                            <a class="uk-alert-close" data-uk-close></a>
                            <p>Dziękujemy za wysłanie wiadomości. Nasz Specjalista skontaktuje się z Tobą w celu realizacji zamówienia.</p>
                        </div>`
                        }
                        if (res.status === "error") {
                            resultSend.innerHTML = `          
                        <div class="uk-alert-danger" data-uk-alert>
                            <a class="uk-alert-close" data-uk-close></a>
                            <p>Wiadomość nie została wysłana. Sprubój ponownie później</p>
                        </div>
                       `
                        }
                    }
                }).finally(() => {
                    submit.disabled = false;
                    submit.classList.remove("loading");
                    form.reset();
                    if (document.querySelector(".uk-alert")) {
                        setTimeout(() => {
                            UIkit.alert(".uk-alert").close();
                        }, 10000)
                    }
                });
        }
    });
}
setTimeout(() => {
    UIkit.modal("#modal-center").show();
    popupForm();
}, 7000)


