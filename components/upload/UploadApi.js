import Router from 'next/router';
class UploadApi {

    // static API_BASE_URL="https://api-juaferfer11.cloud.okteto.net/api/v1/asset";
    static API_BASE_URL="http://localhost:8000/api/v1/asset";

    static requestHeaders(){
        return {
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    }

    static async getAllAssets(){
        const headers= this.requestHeaders();
        const user=JSON.parse(localStorage.getItem("user"));
        const request= new Request(this.API_BASE_URL+"?user="+user.id,{
            method:"GET",
            headers:headers
        })

        const response= await fetch(request);

        if(!response.ok){
            throw Error("Response not valid:"+ response.status);
        }

        return response.json();
    }

    static async getAsset(id){
        const headers= this.requestHeaders();
        const user=JSON.parse(localStorage.getItem("user"));
        const request= new Request(this.API_BASE_URL+"/"+id,{
            method:"GET",
            headers:headers
        })

        const response= await fetch(request);
        console.log(response);

        if(!response.ok){
            if(response.status==404){
                Router.push('/');
            }else{
                throw Error("Response not valid:"+ response.status);
            }
        }

        return response.json();
    }

    static async updateAsset(id,file,name,userId){
        const headers= this.requestHeaders();
        const user=JSON.parse(localStorage.getItem("user"));
        const request= new Request(this.API_BASE_URL+"/"+id,{
            method:"PUT",
            headers:headers,
            body: new Blob([JSON.stringify({ "file": file, "name": name, "user":userId })], { type: "application/json" })
        })

        const response= await fetch(request);

        if(!response.ok){
            throw Error("Response not valid:"+ response.status);
        }
        return response.json();
    }

    static async deleteAsset(id){
        const headers= this.requestHeaders();
        const user=JSON.parse(localStorage.getItem("user"));
        const request= new Request(this.API_BASE_URL+"/"+id,{
            method:"DELETE",
            headers:headers
        })

        const response= await fetch(request);
        if(!response.ok){
            throw Error("Response not valid:"+ response.status);
        }
        Router.push('/assets');
        return response.json();
    }
}

export default UploadApi;