<script setup>
import  axios  from 'axios';
import { ref } from 'vue';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useRouter } from 'vue-router';
import university from './university.vue';


const router = useRouter()
const universities = ref([]);
const GG = ref('')
function search (e){
    e.preventDefault();
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
    
    <div class="container">
        <form action="">
            <input v-model="GG" type="text" name="" id="">
            <button @click="search($event)">найти</button>
        </form>
        <div class="items">
            <div class="item" v-for="university in universities" @click="universities_info(university)">
                <div>
                <p  class="Name">Name: {{ university.name }}</p>
                
                <p style="font-weight: bold;">Country: <p :class="get_alpha_two_code(university.alpha_two_code)"></p></p>
                </div>
                <div class="strelka">
                <p>></p>
                </div>
            </div>
        </div>
    </div>
    
</template>
<style>
body, html {
    height: 100%;
}
.container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 20px;
}
form{
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    gap: 10px;
    -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
input{
    border: 1px;
    background-color: #EA9A62 ;
    border-radius: 5px;
    padding: 5px;
    opacity: 20%;
    color: white;
}
button{
    border: 1px;
    border-radius: 5px;
    padding: 5px;
    background-color: #EA9A62;
    color: white;
}
.items{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.item{
    display: flex;
    text-align: left;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    padding: 10px;
    border-radius: 5px;
    -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);

}
 
form input{
    border-top-right-radius: 0%;
    border-bottom-right-radius: 0%;
    margin-left: 40px;
}

form button{
    border-top-left-radius: 0%;
    border-bottom-left-radius: 0%;
    margin-right: 40px;
}

.strelka{
margin-bottom: 11px;
}

.strelka p{
    font-size: 60px;
}

</style>