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
                    "content": "напиши описание университета " + universityName
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
    <div>
        <!-- Карта -->
        <VMap style="height: 200px;" :center="center" :zoom="zoom">
            <VMapOsmTileLayer />
            <VMapZoomControl />
        </VMap>
    </div>

    <div>
        <!-- Информация об университете -->
        <h1>{{ universityName }}</h1>
        <h4>{{ universityInfo }}</h4>
        <p v-if="address">{{ address }}</p>
    </div>
</template>

<style>
/* Ваши стили */
</style>