const root = document.getElementById('app')

export function notFound() {
    root.innerHTML = `
        <h1>Not Found 404</h1>
    `
}