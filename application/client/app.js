const fetchHistoryComponent = {
  template: `<div>
              <h2>Fetch History</h2>
              <ul>
                  <li v-for="spell in pastSpells">
                    <a href="#" v-on:click="$emit('fetch-past-spell', spell.name)">{{ spell.name }}</a> | {{spell.timestamp}}
                    <hr class="bg-white"/>
                  </li>
              </ul>
            </div>`,
  props: {
    pastSpells: Array,
  },
};

const spells = new Vue({
  el: "#spells",
  data: {
    spells: [],
    pastSpells: [],
    query: "",
    selectedSpell: "",
    isSearching: true,
    showResult: false,
    spellData: {},
  },
  computed: {
    searchCount: function () {
      return this.spells.length;
    },
  },
  methods: {
    searchSubmit: async function () {
      this.isSearching = false;
      this.spells = [];

      const res = await axios.post("http://localhost:8888/api/search", {
        query: this.query,
      });
      res.data.results.forEach((spell) => {
        this.spells.push(spell.name);
      });
    },
    fetchSubmit: async function () {
      this.isSearching = false;

      const id = this.selectedSpell.toLowerCase().replace(/ /g, "-");
      const res = await axios.post("http://localhost:8888/api/fetch", {
        query: id,
      });
      this.spellData = res.data;
      this.spellData.img =
        "https://www.logolynx.com/images/logolynx/51/517dccbc6c88e146124619c16e335769.png";
      this.showResult = true;
      this.trackSpell();
    },
    trackSpell: function () {
      const now = new Date().toLocaleString("en-US");
      const isNewSearch =
        this.pastSpells.filter((spell) => spell.name === this.spellData.name)
          .length === 0;

      if (isNewSearch) {
        this.pastSpells.push({
          name: this.spellData.name,
          timestamp: now,
        });
      }
    },
    searchAgain: function () {
      this.showResult = false;
      this.isSearching = true;
    },
    fetchPastSpell: function (pastSpell) {
      this.selectedSpell = pastSpell;
      this.fetchSubmit();
    },
  },
  components: {
    "history-component": fetchHistoryComponent,
  },
});
