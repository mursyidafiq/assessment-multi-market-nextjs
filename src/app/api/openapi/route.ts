import { NextResponse } from 'next/server';

const openapi = {
  openapi: '3.0.0',
  info: {
    title: 'Multi Market API',
    version: '1.0.0',
    description: 'API for managing markets, features, and media uploads for the Multi Market assessment',
  },
  servers: [{ url: '/' }],
  paths: {
    '/api/seed': {
      post: {
        summary: 'Seed demo data',
        description: 'Idempotent seed used for local development. Clears and populates sample Market and feature documents.',
        responses: {
          '200': { description: 'Seed applied', content: { 'application/json': { example: { ok: true } } } },
        },
      },
    },
    '/api/markets': {
      get: {
        summary: 'List markets',
        responses: {
          '200': {
            description: 'Array of markets',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { markets: { type: 'array', items: { $ref: '#/components/schemas/MarketListItem' } } } },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create or upsert a market',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MarketPayload' },
              example: { code: 'VN', name: 'Vietnam', bannerFrom: 'MY', howItWorksFrom: 'MY' },
            },
          },
        },
        responses: { '200': { description: 'Created or updated market', content: { 'application/json': { example: { market: { code: 'VN', name: 'Vietnam' } } } } } },
      },
      patch: {
        summary: 'Partial update market',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { code: { type: 'string' } } } } } },
        responses: { '200': { description: 'Updated market' }, '400': { description: 'Bad request' }, '404': { description: 'Not found' } },
      },
    },
    '/api/markets/{code}': {
      get: {
        summary: 'Get market with resolved features',
        parameters: [{ name: 'code', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': {
            description: 'Market and features',
            content: { 'application/json': { schema: { type: 'object' } } },
          },
          '404': { description: 'Market not found' },
        },
      },
    },
    '/api/media/upload': {
      post: {
        summary: 'Upload media file',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } },
            },
          },
        },
        responses: { '200': { description: 'Upload result', content: { 'application/json': { example: { url: '/media/uploads/filename.mp4' } } } } },
      },
    },
  },
  components: {
    schemas: {
      MarketListItem: {
        type: 'object',
        properties: { code: { type: 'string' }, name: { type: 'string' } },
      },
      MarketPayload: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          name: { type: 'string' },
          headerFrom: { type: 'string' },
          footerFrom: { type: 'string' },
          bannerFrom: { type: 'string' },
          howItWorksFrom: { type: 'string' },
        },
        required: ['code', 'name'],
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(openapi);
}
