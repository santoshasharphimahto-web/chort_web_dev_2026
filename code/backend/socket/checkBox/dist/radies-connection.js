import { Redis } from 'ioredis';
function createRadies() {
    return new Redis({
        host: 'localhost',
        port: 6379,
    });
}
export const redies = createRadies();
export const publisher = createRadies();
export const subscrber = createRadies();
//# sourceMappingURL=radies-connection.js.map