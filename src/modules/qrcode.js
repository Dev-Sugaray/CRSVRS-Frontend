import qrcode from 'qrcode-generator';

export const generateQRCode = (payload)=>{
    var qr = qrcode(0, 'M');

    qr.addData(payload);

    qr.make();

    var imageData = qr.createDataURL(10,10);

    return imageData;
}