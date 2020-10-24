export const dataMail = {
    auth: {
        host: 'loop-corporation.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'info@loop-corporation.com', 
            pass: '*}N8dAnWh2$B', 
        }
    },
    remitente: `info@loop-corporation.com`
    
    
};
export const fillBodyMail = (body:string, name:string) => {
    let bodyMail = `<!DOCTYPE html>
    <html lang="en">
    <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Notificación Loop Corporation</title>
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
                .footer p {
                    color:#1B8B87;
                }
                img {
                    width: 100px;
                }
               
            </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <p>Estimado(a) ${name} </p>
                <p>${body}</p>
                <p>Saludos</p>
            </div>
            <div class="footer">
                    <a href="https://loop-corporation.com//"><img src="https://loop-corporation.com/static/media/logoweb.47ef458c.png"></a>
                    <p>Loop Corporation</p>
                    <p>Cochabamba – Bolivia</p>
                    <p><a class="link-number" href="https://wa.me/message/H6SPZQSSFJA4M1" target="_blank" rel="noopener noreferrer"> (+591) 75493119</a></p>
                
            </div>
        </div>
    </body>
    </html>`;
    return bodyMail;
}
