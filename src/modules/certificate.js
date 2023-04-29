import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';
// import { jsPDF } from 'jspdf';

const appStore = useAppStore();
const { backendRaw } = storeToRefs(appStore);

import { getDriverImage } from "./getImage";
import { generateQRCode } from "./qrcode";
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
        <td colspan="1"><img id="driver-image" src="" alt=""></td>
        <td colspan="1"><img src="${backendRaw.value}/pages/verify/image/image2.jpg" alt="" id="coat-of-arm"></td>
        <td colspan="1"><img src="${backendRaw.value}/pages/verify/image/image3.png" alt="" id="cross-river-logo"></td>
    </tr>
    <tr>
        <td style="font-size: 1.5rem" colspan="3">
            <span style="font-weight: bold">Name:</span> <span id="full_name">AZUKA Amos Azubene</span> 
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
            <span style="font-weight: bold">License Number:</span> <span id="license_no">222222</span> 
        </td>
    </tr>
    <tr>
        <td style="font-size: 1.5rem" colspan="3">
            <span style="font-weight: bold">Chassis Number:</span> <span id="chassis_no">22222222</span> 
        </td>
    </tr>
    <tr>
        <td style="font-size: 1.5rem" colspan="3">
            <span style="font-weight: bold">Local Government of Operation:</span>  <span id="lga">ABI</span>   
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
            <span style="font-weight: bold">Issue Date:</span> <span id="issue_date">1st November 2023</span>  
        </td>
    </tr>
    <tr>
        <td style="font-size: 1.5rem" colspan="3">
            <span style="font-weight: bold">Expiry Date:</span> <span id="expiry_date">1st November 2024</span>  
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


export const generateCertificate = async (payload)=>{
    // Add the fullname
    certificateHTML.querySelector('#full_name').innerHTML = payload.full_name;
    // Add the phone number
    certificateHTML.querySelector('#phone').innerHTML = payload.phone;
    // Add the phone number 2
    certificateHTML.querySelector('#phone2').innerHTML = payload.phone2;
    // Add the vehicle_security_registration_number
    certificateHTML.querySelector('#vehicle_security_registration_number').innerHTML = payload.vehicle_security_registration_no;
    // Add the license number
    certificateHTML.querySelector('#license_no').innerHTML = payload.license_no;
    // Add the chassis number
    certificateHTML.querySelector('#chassis_no').innerHTML = payload.chassis_no;
    // Add the Local Government of Operation
    certificateHTML.querySelector('#lga').innerHTML = payload.lga;
    // Add the vehicle type
    certificateHTML.querySelector('#vehicle_type').innerHTML = payload.vehicle_type;
    // Add the revenue head
    certificateHTML.querySelector('#revenue_head').innerHTML = payload.revenue_head;
    // Add the issue date
    certificateHTML.querySelector('#issue_date').innerHTML = payload.issue_date;
    // Add the expiry date
    certificateHTML.querySelector('#expiry_date').innerHTML = payload.expiry_date;
    // Add the amount
    certificateHTML.querySelector('#amount').innerHTML = Number(payload.amount).toLocaleString('en-US');
    // Add the crsvrs logo 
    // certificateHTML.querySelector('#cross-river-logo').src = payload.cross_river_logo;
    // Add the crsvrs logo
    // certificateHTML.querySelector('#coat-of-arm').src = payload.coat_of_arm;
    // Add the driver photo
    const driverPhoto = await getDriverImage(payload.photo);
    certificateHTML.querySelector('#driver-image').src = driverPhoto;

    const qrPayload = `This certificate belongs to one ${payload.full_name}, from ${payload.lga}, with phone number is ${payload.phone}. The vehicle chassis number is ${payload.chassis_no}. The vehicle license number is ${payload.license_no}. To verify this information visit the link ${backendRaw.value}pages/verify/driver/${payload.phone}`;
    const qrCode = generateQRCode(qrPayload);

    // Add the qrcode photo
    certificateHTML.querySelector('.qr-code').src = qrCode;


    const win = window.open();
    win.document.body.innerHTML = certificateHTML.innerHTML;
    win.print();

    // Create a new jsPDF instance
    // const filename = `certificate_phone_${payload.phone}.pdf`;
    // const doc = new jsPDF();

    // Set the page size and orientation
    // console.log(doc)
   
    // doc.internal.pageSize.width = 595.28;
    // doc.internal.pageSize.height = 841.89;

    // Add the HTML code to the PDF document
    // doc.addHTML(certificateHTML.innerHTML, function() {
    //     // Save the PDF document
    //     doc.save(filename);
    // });
}