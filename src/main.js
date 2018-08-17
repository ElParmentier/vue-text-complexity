import Vue from '../node_modules/vue/dist/vue.js';
import _ from 'lodash';

const Hypher = require('hypher');
const english = require('hyphenation.en-us');
const french = require('hyphenation.fr');
const h = new Hypher(english);
const h1 = new Hypher(french);


const baseForm = Vue.component('base-form', {
  template: '<div>\
  <p>Saisissez ici votre texte</p>\
  <textarea class="hyphenate" id="textToCheck" v-bind:value="textToCheck" v-on:input="$emit(\'input\', $event.target.value)" type="text"></textarea>\
  </div>',
  props: ['textToCheck'],
})

const app = new Vue({
  el: '#app',
  data: {
    textToCheck: 'placeholder',
    wordCount: 0,
    sentencesCount: 0,
    syllabeCount: 0,
    fleschReadingEase: 0,
  },
  components: {baseForm: baseForm},
  methods: {
    checkText: function() {
      this.wordCount = wordCount(this.textToCheck);
      this.sentencesCount = sentencesCount(this.textToCheck);
      this.syllabeCount = syllabeCount(this.textToCheck);
      this.fleschReadingEase = 206.835 - 1.015 * (this.wordCount / this.sentencesCount);
      this.fleschReadingEase -= 84.6 * (this.syllabeCount / this.wordCount);
      console.log(this.fleschReadingEase);
    },
  },
});

function wordCount(str) {
  return str.trim().split(/\s+/).length;;
}

function sentencesCount(str) {
  // Very quick regex implementation, matches most sentences terminators
  // will count abreviations as sentences (Dr. Sgt. etc.)
  str = str.replace(/(\[\w+\])/g, ''); // Supresses words between brackets (ex: wikipedia references)
  str = str.replace(/(\.{3})/g, '$1|'); // Matches ...
  str = str.replace(/(.[.?!](\s|$))/g, "$1|"); // matches any character followed by a phrase end
  return str.split("|").length; // split along the pipes we added
}

function syllabeCount(str) {
  let syllabeCount = 0;
  _.each(str.trim().split(/\s+/), (word) => {
    syllabeCount += h.hyphenate(word).length;
  });
  return syllabeCount;
}
