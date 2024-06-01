import http from 'k6/http';
import { check, group } from 'k6';

export default function () {
  // Since this request redirects the `res.cookies` property won't contain the cookies
  const res = http.get('https://httpbin.test.k6.io/cookies/set?name1=value1&name2=value2');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Make sure cookies have been added to VU cookie jar
  const vuJar = http.cookieJar();
  const cookiesForURL = vuJar.cookiesForURL(res.url);
  check(null, {
    "vu jar has cookie 'name1'": () => cookiesForURL.name1.length > 0,
    "vu jar has cookie 'name2'": () => cookiesForURL.name2.length > 0,
  });
}
