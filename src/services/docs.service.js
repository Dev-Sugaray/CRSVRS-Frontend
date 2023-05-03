/*eslint-disable*/
import { storeToRefs } from 'pinia';
import axios from 'axios';

export const read = ()=>{
	const options = {
		method: 'get',
		url: `https://docs.google.com/document/d/e/2PACX-1vT1njikv5lOJLN2W2-zUpMVT0XDNk6tXlPCf8N7BSrfwLYueYDB0ZJA3W1K1b9puhieY1iGaW4dmJcs/pub?embedded=true`,
	}

	return new Promise((resolve, reject)=>{
		axios(options).then( res =>{
			const { data } = res;
			const html = document.createElement('html');
			html.innerHTML = data;
			const content = html.querySelector('.doc-content');
			resolve(content.innerHTML);
		}, (err)=>{
			reject(err);
		});
	})
}