import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { cartItems, shipping } = req.body;

    const items = cartItems.map((item) => ({
      title: `${item.name} - ${item.size}`,
      quantity: item.quantity,
      unit_price: Number(item.price),
      currency_id: "ARS",
    }));

    if (shipping > 0) {
      items.push({
        title: "Costo de envío",
        quantity: 1,
        unit_price: Number(shipping),
        currency_id: "ARS",
      });
    }

    const preference = await mercadopago.preferences.create({
      items,
      back_urls: {
        success: "http://localhost:5173/gracias",
        failure: "http://localhost:5173/checkout",
        pending: "http://localhost:5173/checkout",
      },
      auto_return: "approved",
    });

    return res.status(200).json({
      preferenceId: preference.body.id,
      initPoint: preference.body.init_point,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creando preferencia" });
  }
}
