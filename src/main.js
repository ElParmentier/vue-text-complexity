import Vue from '../node_modules/vue/dist/vue.js';
import _ from 'lodash';

const Hypher = require('hypher');
const english = require('hyphenation.en-us');
const french = require('hyphenation.fr');
const en = new Hypher(english);
const fr = new Hypher(french);


const baseForm = Vue.component('base-form', {
  template: '<div>\
  <h1>Saisissez ici votre texte</h1>\
  <textarea id="textToCheck" v-bind:value="textToCheck" v-on:input="$emit(\'input\', $event.target.value)"></textarea>\
  </div>',
  props: ['textToCheck'],
});

Vue.filter('fixed', (value, decimals) => {
  if (!value) return 0
  return value.toFixed(decimals);
});

const app = new Vue({
  el: '#app',
  data: {
    textToCheck: '',
    language: 'english',
    wordCount: 0,
    sentencesCount: 0,
    syllabeCount: 0,
    fkReadingEase: 0, // fk for Flesch–Kincaid
    fkGradeLevel: 0,
  },
  components: {
    baseForm: baseForm,
  },
  methods: {
    checkText: function() {
      this.wordCount = wordCount(this.textToCheck);
      this.sentencesCount = sentencesCount(this.textToCheck);
      this.syllabeCount = syllabeCount(this.textToCheck, this.language);

      this.fkReadingEase = 206.835 - 1.015 * (this.wordCount / this.sentencesCount);
      this.fkReadingEase -= 84.6 * (this.syllabeCount / this.wordCount);

      this.fkGradeLevel = 0.39 * (this.wordCount / this.sentencesCount);
      this.fkGradeLevel += (11.8 * (this.syllabeCount / this.wordCount)) - 15.59;
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
  str = str.replace(/(.[.?!](\s|$))/g, "$1|"); // matches any character followed by a phrase ending character
  return str.split("|").length; // split along the pipes we added
}

function syllabeCount(str, language) {
  let syllabeCount = 0;
  _.each(str.trim().split(/\s+/), (word) => {
    if (language === 'french') syllabeCount += fr.hyphenate(word).length;
    else syllabeCount += en.hyphenate(word).length;
  });
  return syllabeCount;
}
