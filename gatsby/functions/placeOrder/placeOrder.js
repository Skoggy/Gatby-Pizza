const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
  <h2> Your Recent Order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 
  20 mins.</p>
  <ul>
  ${order
    .map(
      (item) => `<li>
  <img src = "${item.thumbnail}" alt="${item.name}">
  ${item.size} ${item.name} - ${item.price}
  </li>`
    )
    .join('')}
  </ul>
  <p>Your total is <strong>$${total}</strong> due at pickup<p>
 <style>
ul {
    list-style: none;
}
 </style>
 
  </div>`;
}
// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'edwardo.considine@ethereal.email',
    pass: '6DbXTHRFuUUjqnHp7a',
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
// Test send an email

exports.handler = async (event, context) => {
  // Validate data coming in is correct
  //   await wait(5000);
  const body = JSON.parse(event.body);
  // check if they have fillout honeyPOt
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop beep bop zzzst good bye! ERR 34234',
      }),
    };
  }
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // make sure order has items
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  // Send Email

  // Send success or error message
  const info = await transporter.sendMail({
    from: "Slick's Slices <slicks@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
