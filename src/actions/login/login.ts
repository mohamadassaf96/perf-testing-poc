import { group, check } from 'k6';
import exec from 'k6/execution';

export function login(username: string, password: string) {
    let response = group('Login with username and password', () => {
        let response = idp.post(`/api/login`, {
            userName: username,
            password
        }, 'login');
        check(response, {
            'login response is success': (r) => r.status === 200,
        });
        return response;
    });
    if (response.body) {
        return JSON.parse(response?.body.toString());
    }
}

export function signOut(token: string) {
    group('Logout user', () => {
        let response = idp.post(`/api/signOut`, null, 'signOut', token);
        check(response, {
            'signOut response is success': (r) => r.status === 200,
        });
        return response;
    });
}
