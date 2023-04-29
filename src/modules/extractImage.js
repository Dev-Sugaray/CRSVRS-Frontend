export const extractImage = (image)=>{
    return new Promise((resolve)=>{
        const fileReader = new FileReader();
		fileReader.addEventListener("load", ()=>{
			resolve(fileReader.result);
		});
		fileReader.readAsDataURL(image);
    })
		
}