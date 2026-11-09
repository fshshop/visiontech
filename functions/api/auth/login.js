export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { username, password } = body;

    let validUser = 'admin';
    let validPass = 'admin@visiontech';

    if (context.env && context.env.SITE_DATA_KV) {
      try {
        const stored = await context.env.SITE_DATA_KV.get('adminAuth');
        if (stored) {
          const auth = JSON.parse(stored);
          if (auth.username) validUser = auth.username;
          if (auth.password) validPass = auth.password;
        }
      } catch (kvErr) {
        console.error('KV auth lookup error:', kvErr);
      }
    }

    if (username === validUser && password === validPass) {
      const tokenPayload = {
        user: username,
        exp: Date.now() + (7 * 24 * 60 * 60 * 1000)
      };
      const token = btoa(JSON.stringify(tokenPayload));

      return new Response(JSON.stringify({
        success: true,
        token: token,
        username: username
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid username or password'
    }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Malformed request: ' + err.message
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
