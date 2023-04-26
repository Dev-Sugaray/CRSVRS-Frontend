<script setup>
import {generateQRCode} from "@/modules/qrcode";
</script>
<template>
    <div class="certificate">
        <div class="certificate-header">
            <div class="driver-photo"></div>
            <div class="cross-river-logo"></div>
            <div class="coat-of-arm"></div>
        </div>
        <div class="certificate-body">
            <img class="qr-code" :src="generateQRCode('Driver is: Ebite Miracle Nonso\
                Owner of vehicle is: Ebite Miracle Nonso\
                His registration is to expire by 8th November 2027\
                Balablu link to certificate = http://add.com/phonenumber')" alt="">
        </div>
    </div>

</template>
<style scoped>
.certificate {
    /* height: 11.7in;
    width: 8.3in; */
    background-color: white;
    box-shadow: 0px 1px 10px black;
}

.certificate-header {
    /* height: 4in;
    width: 8.3in; */
    background-color: black !important;
    height: 4rem;
    width: 2rem;
}

.driver-photo {

}

.cross-river-logo {

}

.qr-code {
    width: 2.5in;
    height: 2.5in;
    /* margin-top: calc(11.7in - 2.5in - 4in);
    margin-left: calc(8.3in - 2.5in); */
}
</style>