// server.js
import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://64c9a75ef014710008f11e8b--cantinero.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: "*", // Permite solicitudes desde esta URL
    methods: "GET, POST, PUT, DELETE", // Especifica los métodos que deseas permitir
    allowedHeaders: "Content-Type, Authorization", // Especifica los encabezados permitidos
    optionsSuccessStatus: 200, // Indica que la solicitud OPTIONS debe tener un estado 200
  })
);

mercadopago.configure({
  access_token: "TEST-5675349213703236-060517-c87ada6ae4f03415cd7636a2b3c3d4b4-275029655",
});

app.post("/create_preference", (req, res) => {

    const cart = req.body.products; // Suponiendo que los productos seleccionados se encuentran en req.body.cart
    console.log(cart);
    // Crear un array 'items' a partir de los productos del carrito
    let items = cart.map((product) => {
      return {
        title: product.name, // Nombre del producto
        unit_price: Number(product.price), // Precio unitario del producto
        quantity: product.cantidad, // Cantidad del producto
      };
    });
  let preference = {
    items:items,
    
    back_urls: {
      success: "http://localhost:5173/success", // URL de retorno exitoso en el cliente
      failure: "http://localhost:5173/failure", // URL de retorno en caso de fallo en el cliente
      pending: "http://localhost:5173/pending", // URL de retorno en caso de pendiente en el cliente
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
        status:"success"
      });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({
        message: "Error al crear la preferencia",
      });
    });
});

app.listen(8080, () => console.log("Servidor escuchando en el puerto 8080"));
