import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        constant_load: {
            executor: 'constant-vus',
            vus: 5,
            duration: '20s',
            gracefulStop: '5s', // Allow 5 seconds for iterations to complete before stopping
        },
        ramping_load: {
            executor: 'ramping-vus',
            startVUs: 1,
            stages: [
                { duration: '10s', target: 10 },
                { duration: '10s', target: 0 },
            ],
            gracefulRampDown: '5s', // Allow 5 seconds for iterations to complete during ramp down
        },
        arrival_rate: {
            executor: 'constant-arrival-rate',
            rate: 10,
            timeUnit: '1s',
            duration: '20s',
            preAllocatedVUs: 5,
            maxVUs: 20,
        },
    },
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1); // Simulate some processing time
}
