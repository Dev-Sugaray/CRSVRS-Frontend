import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';

import { generateQRCode } from "./qrcode";

const appStore = useAppStore();
const { backendRaw } = storeToRefs(appStore);

const certificateHTML = document.createElement('html');
certificateHTML.style.fontSize = '12px';
certificateHTML.innerHTML = `<head>
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
        <td style="font-size: 1.5rem" colspan="3">
            <span style="font-weight: bold">Payer Name:</span> <span id="full_name">AZUKA Amos Azubene</span> 
        </td>
    </tr>
    <tr>
        <td style="font-size: 1.5rem" colspan="3"> 
            <span style="font-weight: bold">Phone Number:</span>  <span id="phone">070333444555</span>
        </td>
    </tr>
    <tr>
    <tr>
        <td style="font-size: 1.5rem" colspan="3">
            <span style="font-weight: bold">Alternative Phone Number:</span> <span id="phone2">080999333444</span>
        </td>
    </tr>
    <tr>
        <td style="font-size: 1.5rem" colspan="3">
            <span style="font-weight: bold">Vehicle Security Registration Number:</span> <span id="vehicle_security_registration_number">ABI/MOT/1</span> 
        </td>
    </tr>
    <tr>
        <td style="font-size: 1.5rem" colspan="3">
            <span style="font-weight: bold">Vehicle Type:</span> <span id="vehicle_type">Truck</span> 
        </td>
    </tr>
    <tr>
        <td style="font-size: 1.5rem" colspan="3">
            <span style="font-weight: bold">Revenue Head:</span> <span id="revenue_head">Vehicle Security Registration</span> 
        </td>
    </tr>
    <tr>
        <td style="font-size: 1.5rem" colspan="3">
            <span style="font-weight: bold">Payment Date:</span> <span id="issue_date">1st November 2023</span>  
        </td>
    </tr>
    <tr>
        <td style="font-size: 1.5rem" colspan="3">
            <span style="font-weight: bold">Amount:</span> &#x20A6;<span id="amount">0,000</span> 
        </td>
    </tr>
    <tr>
        <td colspan="3"  style="text-align: right;">
            <img class="qr-code" src="images/image4.png" alt="">
            <hr>
            COMMISSIONER OF TRANSPORT
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
    certificateHTML.querySelector('#full_name').innerHTML = payload.full_name;
    // Add the phone number
    certificateHTML.querySelector('#phone').innerHTML = payload.phone;
    // Add the phone number 2
    certificateHTML.querySelector('#phone2').innerHTML = payload.phone2;
    // Add the vehicle_security_registration_number
    certificateHTML.querySelector('#vehicle_security_registration_number').innerHTML = payload.vehicle_security_registration_no;
    // Add the license number
    // certificateHTML.querySelector('#license_no').innerHTML = payload.license_no;
    // // Add the chassis number
    // certificateHTML.querySelector('#chassis_no').innerHTML = payload.chassis_no;
    // Add the Local Government of Operation
    // certificateHTML.querySelector('#lga').innerHTML = payload.lga;
    // Add the vehicle type
    certificateHTML.querySelector('#vehicle_type').innerHTML = payload.vehicle_type;
    // Add the revenue head
    certificateHTML.querySelector('#revenue_head').innerHTML = payload.revenue_head;
    // Add the issue date
    certificateHTML.querySelector('#issue_date').innerHTML = payload.issue_date;
    // Add the expiry date
    // certificateHTML.querySelector('#expiry_date').innerHTML = payload.expiry_date;
    // Add the amount
    certificateHTML.querySelector('#amount').innerHTML = Number(payload.amount).toLocaleString('en-US');

    const qrPayload = `This receipt was issued on the  ${payload.issue_date} to ${payload.full_name}, from ${payload.lga}, with phone number ${payload.phone}. The vehicle chassis number is ${payload.chassis_no}. The vehicle license number is ${payload.license_no}. To verify this information visit the link ${backendRaw.value}/pages/verify/driver/${payload.phone}`;
    const qrCode = generateQRCode(qrPayload);

    // Add the qrcode photo
    certificateHTML.querySelector('.qr-code').src = qrCode;

    const win = window.open();
    win.document.body.innerHTML = certificateHTML.innerHTML;
    win.print();
}