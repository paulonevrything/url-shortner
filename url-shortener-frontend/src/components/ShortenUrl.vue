<template>
    <div class="container">
        <div class="shorten-url-form">
            <div>
                <div class="form-group">
                    <label for="url-shortener">Shorten URL</label>
                    <input class="form-control" placeholder="Enter long url" id="url-shortener" required
                        name="url-shortener" v-model="request.longUrl" />
                </div><br>
                <button v-bind:disabled="request.longUrl.length < 1" v-if="!loading" @click="shortenUrl"
                    class="btn btn-secondary">Shorten Now</button>
                <div v-else class="spinner-border" role="status">
                </div>
            </div>
        </div>

        <div v-if="result" class="result card w-75">
            <div class="card-header">
                Result
                <font-awesome-icon @click="copyToClipboard" icon="fa-solid fa-paste" />
            </div>
            <div class="card-body">
                <p class="card-text">{{ shortUrl }}</p>
            </div>
        </div>
    </div>

</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import UrlShortnerService from "@/services/UrlShortnerService";
import UrlShortnerRequest from "@/types/UrlShortnerRequest";

@Component
export default class ShortenUrl extends Vue {

    public request: UrlShortnerRequest = {
        longUrl: "",
    };

    public loading = false;
    public result = false;
    public shortUrl!: string;

    shortenUrl() {
        this.loading = true;

        let data = {
            longUrl: this.request.longUrl
        };

        UrlShortnerService.shortenUrl(data)
            .then((response) => {
                this.loading = false;
                this.result = true;
                this.shortUrl = `http://localhost:3000/urls/${response.data.shortUrl}`;
                console.log('response: ', response.data);
            })
            .catch((e) => {
                this.loading = false;
                console.log('error: ', e.response.data.error.message);
                this.makeToast(e.response.data.error.message);
            });
    }

    copyToClipboard() {
        
        this.$copyText(this.shortUrl).then(e => {
            this.makeToast('Copied!');
            console.log(e)
        }, function (e) {
            alert('Can not copy')
            console.log(e)
        })
    }

    makeToast(message: string) {
        this.$bvToast.toast(message, {
            title: 'Alert',
            autoHideDelay: 5000,
        })
    }
}

</script>

<style scoped>
.shorten-url-form {
    max-width: 500px;
    margin: auto;
}

.container {
    margin-top: 100px;
}

.result {
    margin: auto;
    margin-top: 15px;
}
</style>