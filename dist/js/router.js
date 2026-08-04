export const routes = {};
export function register(path, component) {
    if (Object.hasOwn(routes, path))
        return;
    routes[path] = component;
}
export function navigate(path) {
    if (routes[path]) {
        routes[path]();
        return;
    }
    const id = extractSearchPara(path);
    if (id) {
        routes['/details'](id);
        return;
    }
    console.log('404:error');
}
export function extractSearchPara(path) {
    const segments = path.split('/');
    if (segments.length < 3)
        return false;
    const rawId = segments[segments.length - 1];
    const id = rawId.replace(':', '');
    return id;
}
