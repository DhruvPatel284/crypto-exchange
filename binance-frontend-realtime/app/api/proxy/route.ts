// app/api/proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

const targetUrl = 'https://api.backpack.exchange';

export async function GET(req: NextRequest) {
  return proxyRequest(req);
}

export async function POST(req: NextRequest) {
  return proxyRequest(req);
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req);
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req);
}

async function proxyRequest(req: NextRequest) {
  // Update to get the path after '/api/proxy'
  const path = req.nextUrl.pathname.replace('/api/proxy', '');
  const target = `${targetUrl}${path}${req.nextUrl.search}`;

  // Set CORS headers
  const headers = new Headers(req.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  headers.set('Access-Control-Allow-Credentials', 'true');
  headers.set('Access-Control-Expose-Headers', 'Content-Length, Content-Range');

  try {
    // Forward the request to the target server
    const response = await fetch(target, {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : null,
      redirect: 'manual',
    });

    // Stream the response back to the client
    const responseBody = await response.text();
    return new NextResponse(responseBody, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error connecting to the target server' }, { status: 500 });
  }
}
