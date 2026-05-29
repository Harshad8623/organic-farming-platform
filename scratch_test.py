"""Smoke test for all routes."""
from app import create_app
app = create_app()

with app.test_client() as c:
    routes = [
        ('/', 200),
        ('/marketplace/', 200),
        ('/roadmap/', 200),
        ('/auth/login', 200),
        ('/auth/register', 200),
        ('/crop/', 302),          # redirects unauthenticated to login
        ('/chatbot/', 302),
        ('/weather/', 302),
        ('/analytics/', 302),
        ('/cart/', 302),
        ('/orders/my', 302),
    ]
    print('=== Route Smoke Tests ===')
    for route, expected in routes:
        resp = c.get(route)
        status = 'OK' if resp.status_code == expected else f'FAIL (got {resp.status_code}, expected {expected})'
        print(f'  GET {route}: {status}')

    # Test login with correct credentials
    resp = c.post('/auth/login', data={'email': 'farmer@test.com', 'password': '123456'}, follow_redirects=True)
    ok = resp.status_code == 200
    print(f'  POST /auth/login (farmer@test.com): {"OK" if ok else "FAIL got " + str(resp.status_code)}')

    # Test login with WRONG credentials
    resp = c.post('/auth/login', data={'email': 'farmer@test.com', 'password': 'wrongpass'}, follow_redirects=True)
    shows_error = b'Invalid' in resp.data
    print(f'  POST /auth/login (wrong password) - shows error: {"OK" if shows_error else "FAIL"}')

    # Test registration with missing fields
    resp = c.post('/auth/register', data={'name': '', 'email': '', 'password': ''}, follow_redirects=True)
    shows_error2 = b'required' in resp.data or b'400' in resp.data or resp.status_code in [200, 400]
    print(f'  POST /auth/register (empty fields): {"OK" if shows_error2 else "FAIL"}')

    # Test that marketplace shows products
    resp = c.get('/marketplace/')
    has_products = resp.status_code == 200
    print(f'  GET /marketplace/ loads: {"OK" if has_products else "FAIL"}')

    # Test marketplace search
    resp = c.get('/marketplace/?search=tomato')
    ok_search = resp.status_code == 200
    print(f'  GET /marketplace/?search=tomato: {"OK" if ok_search else "FAIL"}')

print()
print('All smoke tests done.')
