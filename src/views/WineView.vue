<template>
  <div id="vue-app" class="lobby-container">
    <div
      @click="cancelSearch"
      v-if="searchKey || countrySelected || grapesSelected"
      class="cancel"
    >
      <h5>Annuler recherche</h5>
      <i class="fas fa-times"></i>
    </div>
    <ul>
      <li v-on:click="searchInput('name')" class="name">
        <i class="fas fa-search"></i>
        <input
          v-if="inputType == 'name'"
          v-model="searchKey"
          type="search"
          class="search"
          placeholder="Entrez le nom d'un vin..."
        />
      </li>

      <li v-on:click="searchInput('country')" class="country">
        <i class="fas fa-globe-europe"></i>
        <select v-show="inputType == 'country'" v-model="countrySelected">
          <option value="">Choisissez un pays</option>
          <option v-for="option in countryOption" :key="option.id">
            {{ option.name }}
          </option>
        </select>
      </li>

      <li v-on:click="searchInput('grapes')" class="grapes">
        <i class="fas fa-wine-glass-alt"></i>
        <div class="radio-container" v-if="inputType == 'grapes'">
          <div v-for="grape in grapesRadio" :key="grape.name" class="radio">
            <label :for="grape.name">{{ grape.name }}</label>
            <input
              v-model="grapesSelected"
              :id="grape.name"
              :value="grape.name"
              type="radio"
              class="radio-button"
            />
          </div>
        </div>
      </li>
    </ul>

    <h1 v-if="inputType == ''" class="title">Liste des vins</h1>
    <h3 v-if="searchWines.length == 0">Aucun résultat</h3>

    <transition-group name="item-anim" tag="div" class="list-container">
      <div v-for="(wine, id) in searchWines" :key="wine.id" class="wine-list">
        <div class="wine-card">
          <div class="card-header">
            <h2>{{ wine.name }}</h2>
            <i @click="removeItem(id)" class="fas fa-times"></i>
          </div>
          <div class="container">
            <div class="text-container">
              <div class="buttons">
                <h4>{{ wine.year }}</h4>
                <h4>{{ wine.country }}</h4>
                <h4>{{ wine.grapes }}</h4>
              </div>
              <div class="location">
                <i class="fas fa-map-marker-alt"></i>
                <span> {{ wine.region }}</span>
              </div>
              <p>{{ wine.description }}</p>
            </div>
            <img :src="getImgUrl(wine.picture)" @click="addToCart('WD', wine.id)" alt="photo-bouteille" />
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { useLink } from "vue-router";

class WineDetail {
  id: string;
  name: string;
  country: string;
  grapes: string;
  year: string;
  region: string;
  picture: string;
  description: string;

  public constructor(
    id: string,
    name: string,
    country: string,
    grapes: string,
    year: string,
    region: string,
    picture: string,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.grapes = grapes;
    this.year = year;
    this.region = region;
    this.picture = picture;
    this.description = description;
  }
}

class CountryOption {
  id: string;
  name: string;

  public constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export default defineComponent({
  data() {
    return {
      wines: [] as Array<WineDetail>,
      type: "", // a faire pour parametre selon le type
      users: [],
      countryList: [] as Array<string>,
      inputType: "",
      searchKey: "",
      countryOption: [] as Array<CountryOption>,
      countrySelected: "",
      grapesRadio: [
        { name: "Pinot Noir" },
        { name: "Sauvignon" },
        { name: "Merlot" },
        { name: "Chardonnay" },
      ],
      grapesSelected: "",
    };
  },
  computed: {
    searchWines(): WineDetail[] {
      return this.wines.filter((wine) => {
        return (
          wine.name.toLowerCase().includes(this.searchKey.toLowerCase()) &&
          wine.country
            .toLowerCase()
            .includes(this.countrySelected.toLowerCase()) &&
          wine.grapes.toLowerCase().includes(this.grapesSelected.toLowerCase())
        );
      });
    },
  },
  methods: {
    getImgUrl(pic: string) {
      return "/uploads/" + pic;
    },
    searchInput(arg: string) {
      this.inputType = arg;
    },
    removeItem(id: number) {
      // this.delete(this.wines, id);
    },
    cancelSearch() {
      this.searchKey = "";
      this.countrySelected = "";
      this.grapesSelected = "";
    },
    addToCart(user: string, wineId: string) {
      const url = "http://localhost:3000/addToCart.php";
      const data = "user=" + user + "&wineId=" + wineId;
      axios.post(url, data).then((res) => console.log(res.data));
    },
  },
  mounted() {
    const url = "http://localhost:3000/getWines.php";
    axios
      // .get(url, { params: { type: 42 } })
      .get(url)
      .then((res) => res.data)
      .then((res) => {
        this.wines = res;
      })
      .then(() => {
        for (let i = 0; i <= this.wines.length; i++) {
          if (!this.countryList.includes(this.wines[i].country)) {
            this.countryList.push(this.wines[i].country);
          }
        }
      });

    setTimeout(() => {
      const arr = this.countryList.sort();
      for (let i = 0; i < arr.length; i++) {
        this.countryOption.push({
          name: arr[i],
          id: arr[i],
        });
      }
    }, 500);

    // ,
    //   axios
    //     .get("libraries/controllers/getDataUsers.php")
    //     .then((res) => res.data)
    //     .then((res) => {
    //       this.users = res;
    //     });
  },
});
</script>
