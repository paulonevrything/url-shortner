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

    public submitted = false;
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
                // this.tutorial.id = response.data.id;
                console.log(response.data);
                this.submitted = true;
            })
            .catch((e) => {
                this.loading = false;
                console.log(e);
            });
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