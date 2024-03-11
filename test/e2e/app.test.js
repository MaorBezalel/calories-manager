import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import { createApp } from '../utils/create_app.js';
import mongoose from 'mongoose';
import 'dotenv/config';

import { CalorieConsumption } from '../../src/models/index.js';

const chai = use(chaiHttp);

describe('App Routes E2E Tests', () => {
    /**
     * The app instance.
     *
     * @type {import('express').Express}
     */
    let app;

    /**
     * the server instance.
     *
     * @type {import('http').Server}
     */
    let server;

    before(async () => {
        // connect to the test database
        try {
            await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME_TEST });
            console.log('MongoDB Test Connected...');
        } catch (err) {
            console.log(err);
        }

        // create the test server
        app = createApp();

        // set the port
        const PORT = process.env.PORT_TEST || 3001;

        // start the test server
        server = app.listen(PORT, () => {
            console.log(`Test Server is running on port ${PORT}`);
        });
    });

    after(async () => {
        // disconnect from the test database
        try {
            await mongoose.connection.close();
            console.log('MongoDB Test Disconnected...');
        } catch (err) {
            console.log(err);
        }

        // close the test server
        server.close(() => console.log('Test Server Closed...'));
    });

    describe('GET /', () => {
        it('should render a pug view with status code 200', async () => {
            const res = await chai.request(app).get('/');
            expect(res).to.have.status(200);
            expect(res).to.be.html;
        });
    });

    describe('GET /about', () => {
        it('should return an array of two developers with status code 200', async () => {
            const res = await chai.request(app).get('/about');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array').with.length(2);
        });

        it('should return the correct details of the first developer', async () => {
            const res = await chai.request(app).get('/about');
            expect(res.body[0]).to.have.property('firstname').equals('maor');
            expect(res.body[0]).to.have.property('lastname').equals('bezalel');
            expect(res.body[0]).to.have.property('email');
            expect(res.body[0]).to.have.property('id');
        });

        it('should return the correct details of the second developer', async () => {
            const res = await chai.request(app).get('/about');
            expect(res.body[1]).to.have.property('firstname').equals('itzhak');
            expect(res.body[1]).to.have.property('lastname').equals('yakubov');
            expect(res.body[1]).to.have.property('email');
            expect(res.body[1]).to.have.property('id');
        });
    });

    describe('POST /addcalories', () => {
        const USER_ID = 123123; // the only existing user in the test database
        const VALID_REQUEST_BODY = {
            user_id: USER_ID,
            year: 2021,
            month: 5,
            day: 25,
            description: 'milk',
            category: 'lunch',
            amount: 1,
        };

        before(async () => {
            await CalorieConsumption.deleteMany({});
        });

        after(async () => {
            await CalorieConsumption.deleteMany({});
        });

        it('should add a calorie consumption to the database with status code 201 and return the generated id', async () => {
            const res = await chai.request(app).post('/addcalories').send(VALID_REQUEST_BODY);
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('id');
        });

        it('should return status code 400 when trying to add a calorie consumption with missing fields', async () => {
            const bodyParams = ['user_id', 'year', 'month', 'day', 'description', 'category', 'amount'];
            const res = await chai.request(app).post('/addcalories').send({});

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.be.an('array').with.length(bodyParams.length);
            bodyParams.forEach((param, index) => {
                expect(res.body.errors[index]).to.have.property('param').equals(param);
                expect(res.body.errors[index]).to.have.property('location').equals('body');
                expect(res.body.errors[index]).to.have.property('message');
            });
        });

        it('should return status code 400 when trying to add a calorie consumption with invalid year field', async () => {
            const invalidYearValues = ['blabla', -2021, 0];
            for (const invalidYear of invalidYearValues) {
                const res = await chai
                    .request(app)
                    .post('/addcalories')
                    .send({ ...VALID_REQUEST_BODY, year: invalidYear });
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                expect(res.body.errors).to.be.an('array').with.length(1);
                expect(res.body.errors[0]).to.have.property('param').equals('year');
                expect(res.body.errors[0]).to.have.property('location').equals('body');
                expect(res.body.errors[0]).to.have.property('value').equals(invalidYear);
                expect(res.body.errors[0]).to.have.property('message');
            }
        });

        it('should return status code 400 when trying to add a calorie consumption with invalid month field', async () => {
            const invalidMonthValues = ['blabla', -5, 0, 13];
            for (const invalidMonth of invalidMonthValues) {
                const res = await chai
                    .request(app)
                    .post('/addcalories')
                    .send({ ...VALID_REQUEST_BODY, month: invalidMonth });
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                expect(res.body.errors).to.be.an('array').with.length(1);
                expect(res.body.errors[0]).to.have.property('param').equals('month');
                expect(res.body.errors[0]).to.have.property('location').equals('body');
                expect(res.body.errors[0]).to.have.property('value').equals(invalidMonth);
                expect(res.body.errors[0]).to.have.property('message');
            }
        });

        it('should return status code 400 when trying to add a calorie consumption with invalid day field', async () => {
            const invalidDayValues = ['blabla', -5, 0, 32];
            for (const invalidDay of invalidDayValues) {
                const res = await chai
                    .request(app)
                    .post('/addcalories')
                    .send({ ...VALID_REQUEST_BODY, day: invalidDay });
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                expect(res.body.errors).to.be.an('array').with.length(1);
                expect(res.body.errors[0]).to.have.property('param').equals('day');
                expect(res.body.errors[0]).to.have.property('location').equals('body');
                expect(res.body.errors[0]).to.have.property('value').equals(invalidDay);
                expect(res.body.errors[0]).to.have.property('message');
            }
        });

        it('should return status code 400 when trying to add a calorie consumption with invalid category field', async () => {
            const invalidCategoryValues = ['blabla', 'lunch123'];
            for (const invalidCategory of invalidCategoryValues) {
                const res = await chai
                    .request(app)
                    .post('/addcalories')
                    .send({ ...VALID_REQUEST_BODY, category: invalidCategory });
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                expect(res.body.errors).to.be.an('array').with.length(1);
                expect(res.body.errors[0]).to.have.property('param').equals('category');
                expect(res.body.errors[0]).to.have.property('location').equals('body');
                expect(res.body.errors[0]).to.have.property('value').equals(invalidCategory);
                expect(res.body.errors[0]).to.have.property('message');
            }
        });

        it('should return status code 400 when trying to add a calorie consumption with invalid amount field', async () => {
            const invalidAmountValues = ['blabla', -5, 0];
            for (const invalidAmount of invalidAmountValues) {
                const res = await chai
                    .request(app)
                    .post('/addcalories')
                    .send({ ...VALID_REQUEST_BODY, amount: invalidAmount });
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                expect(res.body.errors).to.be.an('array').with.length(1);
                expect(res.body.errors[0]).to.have.property('param').equals('amount');
                expect(res.body.errors[0]).to.have.property('location').equals('body');
                expect(res.body.errors[0]).to.have.property('value').equals(invalidAmount);
                expect(res.body.errors[0]).to.have.property('message');
            }
        });

        it('should return status code 400 when trying to add a calorie consumption with invalid user_id field', async () => {
            const invalidUserIdValues = ['blabla', -5, 0];
            for (const invalidUserId of invalidUserIdValues) {
                const res = await chai
                    .request(app)
                    .post('/addcalories')
                    .send({ ...VALID_REQUEST_BODY, user_id: invalidUserId });
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                expect(res.body.errors).to.be.an('array').with.length(1);
                expect(res.body.errors[0]).to.have.property('param').equals('user_id');
                expect(res.body.errors[0]).to.have.property('location').equals('body');
                expect(res.body.errors[0]).to.have.property('value').equals(invalidUserId);
                expect(res.body.errors[0]).to.have.property('message');
            }
        });

        it('should return status code 404 when trying to add a calorie consumption with a non-existing user_id', async () => {
            const res = await chai
                .request(app)
                .post('/addcalories')
                .send({ ...VALID_REQUEST_BODY, user_id: 1 });
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message');
        });
    });

    describe('GET /report', () => {
        const USER_ID = 123123; // the only existing user in the test database
        const VALID_REQUEST_QUERY_0 = {
            user_id: USER_ID,
            year: 2020,
            month: 1,
        };
        const VALID_REQUEST_QUERY_1 = {
            user_id: USER_ID,
            year: 2023,
            month: 5,
        };
        const VALID_ADDCALORIES_REQUEST_BODYS_1 = [
            {
                user_id: USER_ID,
                year: 2023,
                month: 5,
                day: 1,
                description: 'milk',
                category: 'breakfast',
                amount: 1,
            },
            {
                user_id: USER_ID,
                year: 2023,
                month: 5,
                day: 3,
                description: 'bread',
                category: 'breakfast',
                amount: 2,
            },
            {
                user_id: USER_ID,
                year: 2023,
                month: 5,
                day: 25,
                description: 'apple',
                category: 'lunch',
                amount: 3,
            },
        ];

        before(async () => {
            await CalorieConsumption.deleteMany({});
            VALID_ADDCALORIES_REQUEST_BODYS_1.forEach(async (calorieConsumption) => {
                await chai.request(app).post('/addcalories').send(calorieConsumption);
            });
        });

        after(async () => {
            await CalorieConsumption.deleteMany({});
        });

        it('should return the report as an object with each category as a property', async () => {
            const res = await chai.request(app).get('/report').query(VALID_REQUEST_QUERY_0);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('breakfast');
            expect(res.body).to.have.property('lunch');
            expect(res.body).to.have.property('dinner');
            expect(res.body).to.have.property('other');
        });

        it('should return status 200 with empty report if there no calorie consumptions in the requested year and month for the user', async () => {
            const res = await chai.request(app).get('/report').query(VALID_REQUEST_QUERY_0);
            expect(res).to.have.status(200);
            for (const category in res.body) {
                expect(res.body[category]).to.be.an('array').with.length(0);
            }
        });

        it('should return status 200 and a report with all the calories consumptions in the requested year and month for the user', async () => {
            const res = await chai.request(app).get('/report').query(VALID_REQUEST_QUERY_1);
            expect(res).to.have.status(200);

            for (const category in res.body) {
                const reducedRequest = VALID_ADDCALORIES_REQUEST_BODYS_1.reduce((acc, curr) => {
                    if (curr.category === category) {
                        acc.push({
                            day: curr.day,
                            description: curr.description,
                            amount: curr.amount,
                        });
                    }
                    return acc;
                }, []);

                // sort by the day property, then by amount, then by description
                const sortedReducedRequest = reducedRequest.sort((a, b) => {
                    if (a.day !== b.day) return a.day - b.day;
                    if (a.amount !== b.amount) return a.amount - b.amount;
                    return a.description.localeCompare(b.description);
                });
                const sortedResponseBody = res.body[category].sort((a, b) => {
                    if (a.day !== b.day) return a.day - b.day;
                    if (a.amount !== b.amount) return a.amount - b.amount;
                    return a.description.localeCompare(b.description);
                });
                expect(sortedReducedRequest).to.deep.equal(sortedResponseBody);
            }
        });

        it('should not return calories from other months or years', async () => {
            const VALID_REQUEST_QUERY_2 = {
                user_id: USER_ID,
                year: 2023,
                month: 6,
            };
            const VALID_ADDCALORIES_REQUEST_BODYS_2 = [
                {
                    user_id: USER_ID,
                    year: 2023,
                    month: 6,
                    day: 2,
                    description: 'chocolate',
                    category: 'breakfast',
                    amount: 1,
                },
                {
                    user_id: USER_ID,
                    year: 2023,
                    month: 6,
                    day: 4,
                    description: 'cheese',
                    category: 'breakfast',
                    amount: 2,
                },
                {
                    user_id: USER_ID,
                    year: 2023,
                    month: 6,
                    day: 13,
                    description: 'banana',
                    category: 'lunch',
                    amount: 5,
                },
            ];
            VALID_ADDCALORIES_REQUEST_BODYS_2.forEach(async (calorieConsumption) => {
                await chai.request(app).post('/addcalories').send(calorieConsumption);
            });

            const res = await chai.request(app).get('/report').query(VALID_REQUEST_QUERY_2);
            expect(res).to.have.status(200);

            VALID_ADDCALORIES_REQUEST_BODYS_2.forEach(({ category, day, description, amount }) => {
                expect(res.body[category]).to.not.include({
                    day,
                    description,
                    amount,
                });
            });
        });

        it('should return status 400 when trying to get a report with missing query parameters', async () => {
            const queryParams = ['user_id', 'year', 'month'];
            const res = await chai.request(app).get('/report').query({});
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.be.an('array').with.length(3);
            queryParams.forEach((param, index) => {
                expect(res.body.errors[index]).to.have.property('param').equals(param);
                expect(res.body.errors[index]).to.have.property('location').equals('query');
                expect(res.body.errors[index]).to.have.property('message');
            });
        });

        it('should return status 400 when trying to get a report with invalid year field', async () => {
            const invalidYearValues = ['blabla', -2021, 0];
            for (const invalidYear of invalidYearValues) {
                const res = await chai
                    .request(app)
                    .get('/report')
                    .query({ ...VALID_REQUEST_QUERY_0, year: invalidYear });
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                expect(res.body.errors).to.be.an('array').with.length(1);
                expect(res.body.errors[0]).to.have.property('param').equals('year');
                expect(res.body.errors[0]).to.have.property('location').equals('query');
                expect(res.body.errors[0]).to.have.property('value').equals(invalidYear.toString());
                expect(res.body.errors[0]).to.have.property('message');
            }
        });

        it('should return status 400 when trying to get a report with invalid month field', async () => {
            const invalidMonthValues = ['blabla', -5, 0, 13];
            for (const invalidMonth of invalidMonthValues) {
                const res = await chai
                    .request(app)
                    .get('/report')
                    .query({ ...VALID_REQUEST_QUERY_0, month: invalidMonth });
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                expect(res.body.errors).to.be.an('array').with.length(1);
                expect(res.body.errors[0]).to.have.property('param').equals('month');
                expect(res.body.errors[0]).to.have.property('location').equals('query');
                expect(res.body.errors[0]).to.have.property('value').equals(invalidMonth.toString());
                expect(res.body.errors[0]).to.have.property('message');
            }
        });

        it('should return status 400 when trying to get a report with invalid user_id field', async () => {
            const invalidUserIdValues = ['blabla', -5, 0];
            for (const invalidUserId of invalidUserIdValues) {
                const res = await chai
                    .request(app)
                    .get('/report')
                    .query({ ...VALID_REQUEST_QUERY_0, user_id: invalidUserId });
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                expect(res.body.errors).to.be.an('array').with.length(1);
                expect(res.body.errors[0]).to.have.property('param').equals('user_id');
                expect(res.body.errors[0]).to.have.property('location').equals('query');
                expect(res.body.errors[0]).to.have.property('value').equals(invalidUserId.toString());
                expect(res.body.errors[0]).to.have.property('message');
            }
        });

        it('should return status 404 when trying to get a report with a non-existing user_id', async () => {
            const res = await chai
                .request(app)
                .get('/report')
                .query({ ...VALID_REQUEST_QUERY_0, user_id: 1 });
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message');
        });
    });

    describe('GET /docs', () => {
        it('should exists', async () => {
            const res = await chai.request(app).get('/docs');
            expect(res).to.have.status(200);
            expect(res).to.be.html;
        });
    });
});
