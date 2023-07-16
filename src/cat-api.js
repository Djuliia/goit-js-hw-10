import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_BPPgYWg2PjJsln2hhZsV58r6JKfEQdsUlNNkCx2bVGEaRjtxFHKuRBRzt6LwFjxL";

export function fetchBreeds() {
    return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

export function fetchCatByBreed(breedId) {
    return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
}

