import paypal from '@paypal/checkout-server-sdk';

function environment(){
  if(process.env.PAYPAL_ENVIRONMENT === 'live'){
    return new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
  }
  return new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
}
function client(){ return new paypal.core.PayPalHttpClient(environment()); }

export default async function handler(req, res){
  if(req.method === 'POST'){
    const { amount, description } = req.body || {};
    if(!amount) return res.status(400).json({ error: 'amount required' });
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: 'JPY', value: String(amount) }, description: description || 'SOUL CODE' }]
    });
    try{
      const order = await client().execute(request);
      return res.status(200).json({ id: order.result.id });
    }catch(e){
      console.error(e);
      return res.status(500).json({ error: 'paypal create failed', detail: String(e) });
    }
  }else if(req.method === 'PUT'){
    const { orderId } = req.body || {};
    if(!orderId) return res.status(400).json({ error: 'orderId required' });
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    try{
      const cap = await client().execute(request);
      return res.status(200).json({ capture: cap.result });
    }catch(e){
      console.error(e);
      return res.status(500).json({ error: 'paypal capture failed', detail: String(e) });
    }
  }else{
    res.setHeader('Allow','POST, PUT');
    res.status(405).end('Method Not Allowed');
  }
}
