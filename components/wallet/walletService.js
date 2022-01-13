const uri = "http://localhost:3000";

function addFunds(amount, idWallet) {
    return fetch(uri + "/wallet/" + idWallet + "/" + amount, {method:"PUT"})
}

export default addFunds;