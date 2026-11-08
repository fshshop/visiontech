import defaultData from '../../data/siteData.json';

export async function onRequestGet(context) {
  // If Cloudflare KV is bound as SITE_DATA_KV, read from KV, else return defaultData
  try {
    if (context.env && context.env.SITE_DATA_KV) {
      const stored = await context.env.SITE_DATA_KV.get('siteData');
      if (stored) {
        return new Response(stored, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }
  } catch (e) {}

  return new Response(JSON.stringify(defaultData), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export async function onRequestPost(context) {
  // Authorization check
  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const newContent = await context.request.json();
    if (context.env && context.env.SITE_DATA_KV) {
      await context.env.SITE_DATA_KV.put('siteData', JSON.stringify(newContent));
    }
    return new Response(JSON.stringify({
      success: true,
      message: 'Cloudflare Content Synchronized!'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
