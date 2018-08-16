import Vue from '../node_modules/vue/dist/vue.js';
import _ from 'lodash';

const baseForm = Vue.component('base-form', {
  template: '<div>\
  <p>Saisissez ici votre texte</p>\
  <textarea id="textToCheck" v-bind:value="textToCheck" v-on:input="$emit(\'input\', $event.target.value)" type="text"></textarea>\
  </div>',
  props: ['textToCheck'],
})

const app = new Vue({
  el: '#app',
  data: {
    textToCheck: 'Hello maggle!',
    wordCount: 0,
  },
  components: {baseForm: baseForm},
  methods: {
    checkText: function() {
      this.wordCount = wordCount(this.textToCheck);
      console.log(sentencesCount(this.textToCheck))
    },
  },
});

function wordCount(str) {
  return str.trim().split(/\s+/).length;;
}

function sentencesCount(str) {
  str = str.replace(/(\.{3})/g, '$1|');
  str = str.replace(/(("|»|\))\.)/g, '$1|');
  str = str.replace(/(\w[.?!](\s|$))/g, "$1|").split("|").length;
  return str;
}
