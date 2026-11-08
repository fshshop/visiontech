export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { username, password } = body;

    // Hardened executive admin credentials
    if (username === 'admin' && password === 'admin@visiontech') {
      // Create a lightweight verifiable token for Cloudflare Pages
      const tokenPayload = {
        user: 'admin',
        exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
      };
      const token = btoa(JSON.stringify(tokenPayload));

      return new Response(JSON.stringify({
        success: true,
        token: token,
        username: 'admin'
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
