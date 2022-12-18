export function enumerateComponentArray(components) {
    const output = [];
    for (let i = 0; i < components.length; i++) {
        output.push({ id: i, data: components[i] });
    }
    return output;
}
