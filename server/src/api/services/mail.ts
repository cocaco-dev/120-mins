import * as nodeMailer from 'nodemailer'



const dataMail = {
    auth: {
        host: 'loop-corporation.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'test@loop-corporation.com', 
            pass: 'Lq2.gXKkbqr&', 
        }
    },
    remitente: `test@loop-corporation.com`

    
};
const fillBodyMail = (body:string) => {
    let bodyMail = `<!DOCTYPE html>
    <html lang="en">
    <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>NotificaciÃ³n</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                @media(max-width: 768px) {
                    .container{
                        width: 80%!important;
                    }
                }
                body{
                    font-family: Arial, Helvetica, sans-serif;
                    background-color: #1B8B87;
                }
                p{
                    color: #fff;
                }
                
                .container {
                    box-shadow: 0px 2px 18px 0px #284924;
                    margin: auto;
                    margin-top: 50px;
                    width: 75%;
                }
                .content {
                    padding: 20px;
                    background-color: #002A2A;
                }
                .footer {
                    text-align: center;
                    background-color:#f6f6f6; 
                    padding: 20px;
                }
               
            </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <p>${body}</p>
            </div>
        </div>
    </body>
    </html>`;
    return bodyMail;
}


export const sendMail = async (to:[string], subject:string, text:string) => {
    let transporter = nodeMailer.createTransport(dataMail.auth);
    let body = fillBodyMail(text);
    let info = await transporter.sendMail({
        from: dataMail.remitente, // sender address
        to: to.join(', '), // list of receivers
        subject: subject, // Subject line
        html: body // html body
      });
  }