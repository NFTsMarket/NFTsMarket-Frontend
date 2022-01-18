import UploadApi from '../upload/UploadApi.js';

class BuyApi {
    static API_BASE_URL = `${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/buy/purchase/`;

    static requestHeaders() {
        const token = localStorage.getItem("token");
        return { "Authorization": token ? `Bearer ${token}` : "" };
    }

    static async processPurchase(purchase) {
        // Convierte las fechas de un purchase de String a Date
        try {
            purchase.imageUrl = (await UploadApi.getAsset(purchase.assetId, null, localStorage.getItem("token"))).image.baseUrl;
        } catch (error) {
            console.log(error);
        }

        purchase.createdAt = new Date(purchase.createdAt);
        return purchase;
    }

    static async getAllPurchases(filters, process = true) {
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

        return await Promise.all((await response.json()).map(async purchase => {
            return process ? await BuyApi.processPurchase(purchase) : purchase;
        }));
    }

    static async existsPurchases(filters) {
        return await this.getAllPurchases(filters, process = false).length > 0;
    }

    static async createPurchase(productId, recaptcha) {
        const response = await fetch(new Request(this.API_BASE_URL, {
            method: "POST",
            headers: this.requestHeaders(),
            body: new Blob([JSON.stringify({ "productId": productId, "g-recaptcha-response": recaptcha })], { type: "application/json" })
        }));

        return response.ok;
    }

    static async accceptPurchase(purchaseId) {
        const response = await fetch(new Request(this.API_BASE_URL + purchaseId, {
            method: "PUT",
            headers: this.requestHeaders(),
        }));

        return response.ok;
    }

    static async deletePurchase(purchaseId) {
        const response = await fetch(new Request(this.API_BASE_URL + purchaseId, {
            method: "DELETE",
            headers: this.requestHeaders()
        }));

        return response.ok;
    }

}

export default BuyApi;
