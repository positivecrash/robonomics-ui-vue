export function getImage(image) {
    return new URL(`/lib/images/${image}`, import.meta.url)
}