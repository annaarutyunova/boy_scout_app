import fs from 'fs'
import path from 'path'
import nodemailer from "nodemailer"

export const post = async (ctx) => {
	const data = await ctx.request.json()

    fs.mkdirSync(path.join('static', 'data', data.id), {recursive: true})

    fs.writeFileSync(path.join('static', 'data', data.id, 'data.json'), JSON.stringify(data))

    emailReceipt(data)

	return {
        headers: {'content-type': 'application/json'},
        body: data
    }
};

const emailReceipt = (data) => {
    const bodyText = [
        `Reimbursement request`,
        ``,
        `${data.name}`,
        `${data.reason}`,
        `$${data.amount}`,
        `${data.payTo}`,
        `${data.paymentDetails}`,
    ].join("\n")

    const bodyHtml = 
        `<p>Reimbursement request</p>
        <p>${data.name}</p>
        <p>${data.reason}</p>
        <p>$${data.amount}</p>
        <p>${data.payTo}</p>
        <p>${data.paymentDetails}</p>
        ${data.images.map((image,i) => `<img src="${image}" alt="Image">`).join(" ")}
    `

    const transporter = nodemailer.createTransport({
        host: "mx.aeromail.io",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "system@troop69.co", // generated ethereal user
          pass: "EPd46ek2M2", // generated ethereal password
        },
      });

       // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"Troop 69 Website" <system@troop69.co>', // sender address
    to: "anna.arutyunova8848@gmail.com, dan@eparklabs.com", // list of receivers
    subject: "Reimbursement request", // Subject line
    text: bodyText, // plain text body
    html: bodyHtml, // html body
  });
}
