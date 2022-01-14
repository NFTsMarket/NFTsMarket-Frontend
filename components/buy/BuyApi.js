class BuyApi {
    static API_BASE_URL = "https://api-fis-fersolesp.cloud.okteto.net/api/v1/purchase/";

    static requestHeaders() {
        const token = localStorage.getItem("token");
        return { "Authorization": token ? `Bearer ${token}` : "" };
    }

    static async getAllPurchases(filters) {
        let url = this.API_BASE_URL + '?';
        for (const [key, value] of Object.entries(filters))
            if (value)
                url += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';

        const response = await fetch(new Request(url, {
            method: "GET",
            headers: this.requestHeaders()
        }));

        if (!response.ok)
            throw Error("Response not valid:" + response.status);

        return response.json();
    }

    static async createPurchase(productId, recaptcha) {
        const response = await fetch(new Request(this.API_BASE_URL, {
            method: "POST",
            headers: this.requestHeaders(),
            body: new Blob([JSON.stringify({ "productId": productId, "g-recaptcha-response": recaptcha })], { type: "application/json" })
        }));

        return response.ok;
    }
}

export default BuyApi;