export const asyncProvider = async (func) => {

    let body = document.querySelector('body');

    let loadingElement = document.createElement('loading');

    loadingElement.innerHTML = `<div class="lds-hourglass"></div>`;

    body.append(loadingElement);

    try {
        if (typeof func === "function") {

            return await func();
        }
    } catch (error) {
        console.log("Error in provider:", {
            error
        });

    } finally {
        loadingElement.remove();
    }
};