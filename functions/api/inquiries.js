export async function onRequestPost(context) {
  try {
    const inquiry = await context.request.json();
    inquiry.id = Date.now();
    inquiry.date = new Date().toISOString();

    if (context.env && context.env.SITE_DATA_KV) {
      const existing = await context.env.SITE_DATA_KV.get('inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(inquiry);
      await context.env.SITE_DATA_KV.put('inquiries', JSON.stringify(list));
    }

    return new Response(JSON.stringify({ success: true, message: 'Inquiry received' }), {
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

export async function onRequestGet(context) {
  try {
    if (context.env && context.env.SITE_DATA_KV) {
      const existing = await context.env.SITE_DATA_KV.get('inquiries');
      if (existing) {
        return new Response(existing, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }
    return new Response(JSON.stringify([]), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify([]), {
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
