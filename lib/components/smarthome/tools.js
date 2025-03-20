// Проверяем есть ли такой сервис в сервисах
export function serviceAvailable(services, service) {
    if(!services || !service) return null;
    const svcKeys = Object.keys(services);
    return svcKeys.includes(service);
}

// Получаем наименование сервиса для отображения для entity (это может отличаться от фактических сервисов)
// export function getTplService(entityID, services) {
//     if (!entityID || !services) return null;

//     if (
//         entityID &&
//         entityID.startsWith("select.")
//     ) {
//         return "select";
//     }

//     if (serviceAvailable(services, "turn_on") && serviceAvailable(services, "turn_off")) return "toggle";
//     if (serviceAvailable(services, "lock") && serviceAvailable(services, "unlock")) return "toggle";
//     if (serviceAvailable(services, "enable") && serviceAvailable(services, "disable")) return "toggle";
//     if (serviceAvailable(services, "open_cover") && serviceAvailable(services, "close_cover")) return "toggle";
//     if (serviceAvailable(services, "activate") && serviceAvailable(services, "deactivate")) return "toggle";

//     return entityID ? entityID.split('.')[0] : null;
// }

// // Получаем наименование фактического сервиса для entity
// export function getActionService(entityID, services) {

// }