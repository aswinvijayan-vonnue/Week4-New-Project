export async function fetchUser(id) {
    const response = await fetch(`https://example.com${id}`);
    if (!response.ok)
        throw new Error('HTTP Error');
    return response.json();
}
