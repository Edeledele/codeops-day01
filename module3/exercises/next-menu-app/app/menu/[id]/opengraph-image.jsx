import { ImageResponse } from 'next/og';
import { getDishById } from '../dishes';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return new Response('Not Found', { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 84,
          background: 'black',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div style={{ marginBottom: 20 }}>{dish.name}</div>
        <div style={{ fontSize: 48, color: '#ccc' }}>{dish.price} ETB</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
