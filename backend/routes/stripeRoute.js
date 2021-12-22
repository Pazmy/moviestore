const stripeRoute = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

stripeRoute.post("/payment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.movies.map((item) => {
        const price = Number(String(item.price) + "00");

        return {
          price_data: {
            currency: "IDR",
            product_data: {
              name: item.title,
            },
            unit_amount: price,
          },
          quantity: 1,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

module.exports = stripeRoute;
