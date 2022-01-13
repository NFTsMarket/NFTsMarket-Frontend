class UploadApi {

    static API_BASE_URL="http://localhost:8000/api/v1/asset";

    static requestHeaders(){
        return {
            "Authorization":"Bearer {TOKEN}"
        }
    }

    static async getAllAssets(){
        const headers= this.requestHeaders();
        const request= new Request(this.API_BASE_URL,{
            method:"GET",
            headers:headers
        })

        const response= await fetch(request);

        if(!response.ok){
            throw Error("Response not valid:"+ response.status);
        }

        return response.json();
    }
}

export default UploadApi;