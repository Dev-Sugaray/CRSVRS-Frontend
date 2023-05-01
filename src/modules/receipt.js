import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';

import { generateQRCode } from "./qrcode";
import html2pdf from 'html2pdf.js';

const appStore = useAppStore();
const { backend } = storeToRefs(appStore);

const receiptHTML = document.createElement('html');
receiptHTML.style.fontSize = '12px';
receiptHTML.innerHTML = `<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Certificate</title>
</head>
<body>
<table style="background-color: white; width: 210mm; height: 297mm; font-family: 'Arial'">
    <tr>
        <td colspan="3" style="text-align:center; font-weight: bold; font-size: 2rem;">CROSS RIVER STATE MINISTRY OF TRANSPORT</td>
    </tr>
    <tr>
        <td colspan="3" style="text-align:center;  font-weight: bold; font-size: 1.1rem;">CROSS RIVER STATE VEHICLE SECURITY REGISTRATION SYSTEM</td>
    </tr>
    <tr>
        <td colspan="3"><h3 style="text-align: center">Receipt for payment</h3></td>
    </tr>
    <tr>
        <td style="font-size: 1rem" colspan="3">
            <span style="font-weight: bold">Payer Name:</span> <span id="full_name">AZUKA Amos Azubene</span> 
        </td>
    </tr>
    <tr>
        <td style="font-size: 1rem" colspan="3"> 
            <span style="font-weight: bold">Phone Number:</span>  <span id="phone">070333444555</span>
        </td>
    </tr>
    <tr>
    <tr>
        <td style="font-size: 1rem" colspan="3">
            <span style="font-weight: bold">Alternative Phone Number:</span> <span id="phone2">080999333444</span>
        </td>
    </tr>
    <tr>
        <td style="font-size: 1rem" colspan="3">
            <span style="font-weight: bold">Vehicle Security Registration Number:</span> <span id="vehicle_security_registration_number">ABI/MOT/1</span> 
        </td>
    </tr>
    <tr>
        <td style="font-size: 1rem" colspan="3">
            <span style="font-weight: bold">Vehicle Type:</span> <span id="vehicle_type">Truck</span> 
        </td>
    </tr>
    <tr>
        <td style="font-size: 1rem" colspan="3">
            <span style="font-weight: bold">Revenue Head:</span> <span id="revenue_head">Vehicle Security Registration</span> 
        </td>
    </tr>
    <tr>
        <td style="font-size: 1rem" colspan="3">
            <span style="font-weight: bold">Payment Date:</span> <span id="issue_date">1st November 2023</span>  
        </td>
    </tr>
    <tr>
        <td style="font-size: 1rem" colspan="3">
            <span style="font-weight: bold">Amount:</span> &#x20A6;<span id="amount">0,000</span> 
        </td>
    </tr>
    <tr>
        <td colspan="2"  style="text-align: right;">
            <img class="qr-code" alt="" style="margin-right: 2rem">
            <hr>
            <span style="margin-left: 2rem; display: inline-block">COMMISSIONER OF TRANSPORT</span>
        </td>
    </tr>
</table>


<style>
    #coat-of-arm, #driver-image, #cross-river-logo {
        width: 10rem;
        height: 10rem;
    }

    .qr-code {
        height: 10rem;
        width: 10rem;
    }
</style>
</body>
</html>`


export const generateReceipt = async (payload)=>{
    // Add the fullname
    receiptHTML.querySelector('#full_name').innerHTML = payload.full_name;
    // Add the phone number
    receiptHTML.querySelector('#phone').innerHTML = payload.phone;
    // Add the phone number 2
    receiptHTML.querySelector('#phone2').innerHTML = payload.phone2;
    // Add the vehicle_security_registration_number
    receiptHTML.querySelector('#vehicle_security_registration_number').innerHTML = payload.vehicle_security_registration_no;
    // Add the license number
    // receiptHTML.querySelector('#license_no').innerHTML = payload.license_no;
    // // Add the chassis number
    // receiptHTML.querySelector('#chassis_no').innerHTML = payload.chassis_no;
    // Add the Local Government of Operation
    // receiptHTML.querySelector('#lga').innerHTML = payload.lga;
    // Add the vehicle type
    receiptHTML.querySelector('#vehicle_type').innerHTML = payload.vehicle_type;
    // Add the revenue head
    receiptHTML.querySelector('#revenue_head').innerHTML = payload.revenue_head;
    // Add the issue date
    receiptHTML.querySelector('#issue_date').innerHTML = payload.issue_date;
    // Add the expiry date
    // receiptHTML.querySelector('#expiry_date').innerHTML = payload.expiry_date;
    // Add the amount
    receiptHTML.querySelector('#amount').innerHTML = Number(payload.amount).toLocaleString('en-US');

    const qrPayload = `This receipt was issued on the  ${payload.issue_date} to ${payload.full_name}, from ${payload.lga}, with phone number ${payload.phone}. The vehicle chassis number is ${payload.chassis_no}. The vehicle license number is ${payload.license_no}. To verify this information visit the link ${backend.value}/pages/verify/driver/${payload.phone}`;
    const qrCode = generateQRCode(qrPayload);

    // Add the qrcode photo
    receiptHTML.querySelector('.qr-code').src = qrCode;


    const opt = {
        filename: payload.full_name.concat("_").concat(payload.license_no).concat("_receipt.pdf"),
        margin: 3,
        image: { type: 'png', quality: 1},
    }

    html2pdf().from(receiptHTML).set(opt).save();
}