import Router from 'next/router';
class UploadApi {
    
    static API_BASE_URL="https://api-reyblacua.cloud.okteto.net/api/v1/asset";

    static requestHeaders(){
        return {
            "Authorization":"Bearer "+token
        }
    }

    static async getAllAssets(usuario, token){
        const request= new Request(this.API_BASE_URL+"?user="+usuario.id,{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+token
            }
        })

        const response= await fetch(request);

        if(!response.ok){
            throw Error("Response not valid:"+ response.status);
        }

        return response.json();
    }

    static async getAsset(id,user,token){
        const request= new Request(this.API_BASE_URL+"/"+id,{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+token
            }
        })

        const response= await fetch(request);

        if(!response.ok){
            if(response.status==404){
                Router.push('/');
            }else{
                throw Error("Response not valid:"+ response.status);
            }
        }

        return response.json();
    }

    static async postAsset(file,name,usuario,token){
        const body=new Blob([JSON.stringify({ "file": file, "name": name, "user":usuario.id })], { type: "application/json" })
        const request= new Request(this.API_BASE_URL,{
            method:"POST",
            headers:{
                "Authorization":"Bearer "+token
            },
            body: body
        })

        const response= await fetch(request);

        if(!response.ok){
            throw Error("Response not valid:"+ response.status);
        }
        return response.json();
    }

    static async updateAsset(id,file,name,userId,user,token){
        const request= new Request(this.API_BASE_URL+"/"+id,{
            method:"PUT",
            headers:{
                "Authorization":"Bearer "+token
            },
            body: new Blob([JSON.stringify({ "file": file, "name": name, "user":userId })], { type: "application/json" })
        })

        const response= await fetch(request);

        if(!response.ok){
            throw Error("Response not valid:"+ response.status);
        }
        return response.json();
    }

    static async deleteAsset(id,user,token){
        const request= new Request(this.API_BASE_URL+"/"+id,{
            method:"DELETE",
            headers:{
                "Authorization":"Bearer "+token
            }
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