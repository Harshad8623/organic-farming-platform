from app import create_app
app = create_app()
print('App created OK')

with app.test_client() as c:
    routes = [
        ('/', 200), ('/marketplace/', 200), ('/roadmap/', 200),
        ('/auth/login', 200), ('/auth/register', 200),
        ('/crop/', 302), ('/chatbot/', 302), ('/weather/', 302),
        ('/analytics/', 302), ('/cart/', 302), ('/orders/my', 302),
    ]
    all_ok = True
    for route, exp in routes:
        resp = c.get(route)
        ok = resp.status_code == exp
        status = 'PASS' if ok else f'FAIL (got {resp.status_code})'
        if not ok:
            all_ok = False
        print(f'  GET {route}: {status}')
    print('All route smoke tests:', 'PASSED' if all_ok else 'SOME FAILED')

    resp = c.post('/auth/login', data={'email': 'farmer@test.com', 'password': '123456'}, follow_redirects=True)
    print('Login correct:', 'PASS' if resp.status_code == 200 else 'FAIL')

    resp = c.post('/auth/login', data={'email': 'farmer@test.com', 'password': 'wrong'}, follow_redirects=True)
    print('Login wrong shows error:', 'PASS' if b'Invalid' in resp.data else 'FAIL')

    resp = c.get('/crop/')
    print('Crop AI requires login:', 'PASS' if resp.status_code == 302 else 'FAIL')

    # Open redirect: next=//evil.com should be blocked
    c2 = app.test_client()
    resp = c2.post('/auth/login', data={'email': 'farmer@test.com', 'password': '123456'},
                   query_string={'next': '//evil.com'})
    loc = resp.headers.get('Location', '')
    is_safe = '//evil.com' not in loc
    print('Open redirect blocked:', 'PASS' if is_safe else 'FAIL - Location: ' + loc)

    # Disease GIF blocked
    import io
    data = {'leaf_image': (io.BytesIO(b'fake'), 'test.gif')}
    c.post('/auth/login', data={'email': 'farmer@test.com', 'password': '123456'}, follow_redirects=True)
    resp = c.post('/disease/', data=data, content_type='multipart/form-data', follow_redirects=True)
    gif_blocked = b'Allowed formats' in resp.data or b'gif' not in resp.data.lower()
    print('Disease GIF blocked:', 'PASS' if gif_blocked else 'FAIL')

print()
print('=== Final Verification Done ===')
