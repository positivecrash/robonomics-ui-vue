export function getEntityType(entity, entitiyTypes) {
    
    if(typeof entity !== 'string') {
        return
    }

    let result = []

    /* Get first part like 'sensor', 'light' etc */
    result.push(entity.split('.')[0])

    /* Get all other parts after dot <sensor.door_123> */
    let secondPart = entitiyTypes.filter(e => entity.includes(e))
    if(secondPart) {
        // result = result.concat(secondPart)
        result = result.concat(secondPart.filter((item) => result.indexOf(item) < 0)) //concat only unique elements
    }

    return result
}