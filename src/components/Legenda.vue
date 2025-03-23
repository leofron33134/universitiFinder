<script setup>
import  axios  from 'axios';
import { ref } from 'vue';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useRouter } from 'vue-router';
import university from './university.vue';


const router = useRouter()
const universities = ref([]);
const GG = ref('')
function search (){
    axios.get('http://universities.hipolabs.com/search?name=' + GG.value)
  .then(response => {

    universities.value = response.data
    console.log(universities.value)
  })
  .catch(error => {
    console.error('Ошибка:', error);
  })

}

 function get_alpha_two_code (alpha_two_code){
    return "fi fi-" + alpha_two_code.toLowerCase()
 }

 function universities_info (item){
    router.push({ name: 'universityInfo', params: {name: item.name} })
 }

</script>


<template>
    
    <input v-model="GG" type="text" name="" id="">
    <button @click="search">поиск</button>
    <div class="items">
        <div class="item" v-for="university in universities" @click="universities_info(university)">
            <p  class="Name">Name: {{ university.name }}</p>
            <p class="Web" style="font-weight: bold;" >Web Site: <a :href="university.web_pages[0]"  style="font-weight: normal;">{{ university.web_pages[0] }}</a></p>
            <p style="font-weight: bold;">Country: <p :class="get_alpha_two_code(university.alpha_two_code)"></p></p>
        </div>
    </div>
</template>
<style>
    .items{
        background-color: white;
        padding-top: 50px;
    }
    .item{
        background-color: red;
        margin: 40px;
        padding: 25px;
        border-radius: 15px;
    }
    .items p {
        color: white;
        padding: 14x;
    }

    .Name{
        font-size: 20px;
        font-weight: bold;
    }
    .Web{
        font-size: 13px;
        color: white;
    }

</style>