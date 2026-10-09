import { getOrder } from "../../../../lib/orders";

export async function GET(request, { params }) {
  const { id } = await params;
  
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      
      const sendStatus = () => {
        const order = getOrder(id);
        if (order) {
          const data = JSON.stringify({ status: order.status, time: new Date().toISOString() });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          
          if (order.status === 'delivered') {
            controller.close();
            clearInterval(interval);
          }
        }
      };

      sendStatus();
      const interval = setInterval(sendStatus, 5000);

      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
