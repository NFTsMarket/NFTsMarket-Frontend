const uri = "https://api-fis-wallet-d-rhym.cloud.okteto.net/api/v1";

function requestHeaders(){
    return {
        "Authorization":"Bearer "+ localStorage.getItem("token")
    }
}

async function addFunds(amount) {
    const user = JSON.parse(localStorage.getItem("user"));
    
    const request= new Request(uri + "/wallet/" + user.id + "/" + amount, {
        method: "PUT",
        headers: requestHeaders()
    })
    
    return await fetch(request);
}

async function getWalletByUser() {
    const user = JSON.parse(localStorage.getItem("user"));

    const request= new Request(uri + "/wallet/" + user.id, {
        method: "GET",
        headers: requestHeaders()
    })
    
    return await fetch(request);
}

export { addFunds, getWalletByUser };