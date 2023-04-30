/*eslint-disable*/
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app.store';
import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

const appStore = useAppStore();
const { backend } = storeToRefs(appStore);

// const { toggleProcessLoader } = appStore;
const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

export const getDriverImage = (phone)=>{
    const options = {
        method: 'GET',
        url: `${backend.value}/driver/image.php?phone=${phone}`,
        headers: {
            Authorization: `bearer ${token.value}`
        }
    }

    return new Promise((resolve, reject)=>{
        axios(options).then((res) =>{
            const { data }  = res;
            if(data.status == true){
                resolve(data.result);
            }else {
                reject(data.message);
            }
        }).catch(e => reject(e.message));
    })
   
}

export const getOwnerImage = (phone)=>{
    const options = {
        method: 'GET',
        url: `${backend.value}/vehicle_owner/image.php?phone=${phone}`,
        headers: {
            Authorization: `bearer ${token.value}`
        }
    }

    return new Promise((resolve, reject)=>{
        axios(options).then((res) =>{
            const { data }  = res;
            if(data.status == true){
                resolve(data.result);
            }else {
                reject(data.message);
            }
        }).catch(e => reject(e.message));
    })
}