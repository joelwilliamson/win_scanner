export async function fetch(url: URL, method: 'GET' | 'POST' | 'PUT' | 'DELETE'): Promise<Response> {
    return await globalThis.fetch(url, { method })
}

export async function fetchWithObject(
    url: URL,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    bodyObj: object): Promise<Response> {
    const body = JSON.stringify(bodyObj);
    console.log(`Sending form data ${body}`);
    return await globalThis.fetch(url, {
        method,
        headers: [
            ['Content-Type', 'application/json']
        ],
        body
    });
}