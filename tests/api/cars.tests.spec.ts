import test, { expect } from "@playwright/test";
import { config } from "../../data.config";
import { generateValidCar } from "../../utils/generators";
import { faker } from "@faker-js/faker";

const BASE_URL = config.baseURL;
const CARS_ENDPOINT = `${BASE_URL}/api/cars`;
const SIGNIN_ENDPOINT = `${BASE_URL}/api/auth/signin`;

test.describe("Garage API Tests", () => {
    let sessionCookie: string;
    let addedCarsIds: number[] = [];

    test.beforeAll(async ({ request }) => {
        const responseAuth = await request.post(SIGNIN_ENDPOINT, {
            data: {
                email: config.userEmail,
                password: config.userPassword,
            },
        });

        expect(responseAuth.status()).toBe(200);
        sessionCookie = responseAuth.headers()['set-cookie'].split(';')[0];
        expect(sessionCookie).toBeDefined();
    });

    test("Add a new car", async ({ request }) => {
        const car = generateValidCar();
        const responseAddCar = await request.post(CARS_ENDPOINT, {
            data: car,
            headers: {
                'Cookie': sessionCookie
            }
        });

        expect(responseAddCar.status()).toBe(201);
        const responseAddCarJson = await responseAddCar.json();
        expect(responseAddCarJson.status).toBe('ok');
        expect(responseAddCarJson.data.carBrandId).toBe(car.carBrandId);
        expect(responseAddCarJson.data.carModelId).toBe(car.carModelId);
        addedCarsIds.push(responseAddCarJson.data.id);
    });

    test("Update mileage for added car", async ({ request }) => {
        const updatedMileage = { mileage: faker.number.int({ min: 5000, max: 250000 }) };
        const responseChangeCar = await request.put(`${CARS_ENDPOINT}/${addedCarsIds[0]}`, {
            data: updatedMileage,
            headers: {
                'Cookie': sessionCookie
            }
        });

        const responseChangeCarJson = await responseChangeCar.json();
        expect(responseChangeCarJson.status).toBe('ok');
        expect(responseChangeCarJson.data?.id).toBe(addedCarsIds[0]);
        expect(responseChangeCarJson.data?.mileage).toBe(updatedMileage.mileage);
    });

    test("Remove car from the garage", async ({ request }) => {
        const response = await request.delete(`${CARS_ENDPOINT}/${addedCarsIds[0]}`, {
            headers: {
                'Cookie': sessionCookie
            }
        });

        expect(response.status()).toBe(200);
        addedCarsIds.shift();
    });

    test("Add car with no data", async ({ request }) => {
        const response = await request.post(CARS_ENDPOINT, {
            data: {},
            headers: {
                'Cookie': sessionCookie
            }
        });

        expect(response.status()).toBe(400);
        const responseJson = await response.json();
        expect(responseJson.status).toBe('error');
        expect(responseJson.message).toContain('Car brand id is required');
    });

    test("Update not existing car", async ({ request }) => {
        const updatedMileage = { mileage: faker.number.int({ min: 5000, max: 250000 }) };
        const response = await request.put(`${CARS_ENDPOINT}/9999999`, {
            data: updatedMileage,
            headers: {
                'Cookie': sessionCookie
            }
        });

        expect(response.status()).toBe(404);
        const responseJson = await response.json();
        expect(responseJson.status).toBe('error');
        expect(responseJson.message).toContain('Car not found');
    });

    test.afterAll(async ({ request }) => {
        for (const carId of addedCarsIds) {
            const response = await request.delete(`${CARS_ENDPOINT}/${carId}`, {
                headers: {
                    'Cookie': sessionCookie
                }
            });
        }
    });
});
