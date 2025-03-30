<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VMap, VMapOsmTileLayer, VMapZoomControl } from 'vue-map-ui';
import 'leaflet/dist/leaflet.css';
import 'vue-map-ui/dist/normalize.css';
import 'vue-map-ui/dist/style.css';
import 'vue-map-ui/dist/theme-all.css';


const route = useRoute();
const universityName = route.params.name;
const universityInfo = ref('');
const center = ref([0, 0]); // Начальные координаты
const zoom = ref(18);
const address = ref('');

onMounted(async () => {
    try {
        // Запрос к Mistral API для получения описания университета
        const mistralResponse = await axios.post(
            'https://api.mistral.ai/v1/chat/completions',
            {
                "model": "mistral-small-latest",
                "messages": [{
                    "role": "user",
                    "content": "напиши краткое описание университета" + universityName,
                }]
            },
            {
                headers: {
                    'Authorization': 'Bearer z8m7B7NfLm0EqScgVTDK6ulfvT9xEmXB'
                }
            }
        );
        universityInfo.value = mistralResponse.data.choices[0].message.content;

        // Запрос к Geoapify API для геокодирования
        const geoResponse = await axios.get(
            `https://api.geoapify.com/v1/geocode/search?text=${universityName}&apiKey=9bbbe07333bd4ed1ad171c0a60eef7c2`
        );

        if (geoResponse.data.features.length > 0) {
            const { lat, lon } = geoResponse.data.features[0].properties;
            address.value = geoResponse.data.features[0].properties.address_line2;
            center.value = [lat, lon]; // Порядок: [долгота, широта]
        } else {
            address.value = 'Адрес не найден';
        }
    } catch (error) {
        console.error('Ошибка при запросе к API:', error);
        address.value = 'Ошибка при получении данных';
    }
});
</script>

<template>
    <div class="container">
        <div class="content">
            <h1 class="title">{{ universityName }}</h1>
            
            <div class="ss">
            <div class="map-container">
                <VMap class="map" :center="center" :zoom="zoom">
                    <VMapOsmTileLayer />
                    <VMapZoomControl />
                </VMap>
            </div>

            <div class="info">
                <h4 class="description">{{ universityInfo }}</h4>
                <p v-if="address" class="address"><p class="address2">Адресс: </p> {{ address }}</p>
            </div>
        </div>
        </div>
    </div>
</template>

<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
}

.content {
    max-width: 800px;
    width: 100%;
    text-align: center;
}

.title {
    font-size: 25px;
    margin-bottom: 20px;
    color: #2c3e50;
    font-weight: 1000;
}

.map-container {
    margin: 20px 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 500px;
    height: 500px;
}

.map {
    height: 558px;
    width: 503px;
}

.info {
    width: 458px;
    height: 348px ;
    margin-top: 20px;
    text-align: left;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
}

.info h4 {
   font-size: 15px;
}

.description {
    color: #34495e;
    line-height: 1.6;
}

.address {
    margin-top: 10px;
    color: #EA9A62;
}
.address2 {
    margin-top: 10px;
    color: #EA9A62;
    font-weight: bold;
}

.ss{
    width: 960px;
    display: flex;
    height: 579px;
    justify-content: center;
}
</style>