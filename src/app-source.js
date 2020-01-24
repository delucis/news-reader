/* eslint-env browser */
/* global Vue */

var storageKey = 'seenFiles'
var fileCount = 251

function getSeenCache () {
  try {
    var json = window.localStorage.getItem(storageKey)
    if (!json) return []
    var seen = JSON.parse(json)
    // reset if the browser has downloaded all files
    if (seen.length >= fileCount) return []
    return seen
  } catch (_) { return [] }
}

Vue.component('app', {
  template: `<div>
    <transition-group v-if="hasAudio" class="audio" name="fade" tag="div">
      <div v-for="file in currentFiles" :key="file.title" class="fade-item">
        <p v-text="file.title"></p>
        <audio :src="file.url" controls>
          😧 Looks like your browser can’t play audio. Try downloading the file below.
        </audio>
        <p class="mt-2 ta-c">
          💾 <a :href="file.url" download>Download audio file</a>
        </p>
      </div>
    </transition-group>
    <button type="button" name="get-audio" @click="getAudio" v-text="buttonText"/>
  </div>`,
  data: function () {
    return {
      currentFile: null,
      fileCount: fileCount,
      seen: getSeenCache(),
      storageKey: storageKey
    }
  },
  computed: {
    buttonText: function () {
      return this.hasAudio
        ? '🔄 Get a new audio file'
        : '🎧 Load audio'
    },
    currentFiles: function () {
      return this.hasAudio
        ? [{
          url: `/audio/${this.currentFile}.mp3`,
          title: `#${this.currentFile}`
        }]
        : []
    },
    files: function () {
      return Array(this.fileCount)
        .fill()
        .map(function (_, i) {
          return i
        })
    },
    hasAudio: function () { return this.currentFile !== null }
  },
  methods: {
    addToSeen: function (i) {
      this.seen.push(i)
      if (this.seen.length >= this.fileCount) this.seen = []
      try {
        var json = JSON.stringify(this.seen)
        window.localStorage.setItem(this.storageKey, json)
      } catch (_) { /* nothing set, no worries */ }
    },
    urn: function () {
      var seen = this.seen
      var unseenFiles = this.files.filter(function (i) {
        return !seen.includes(i)
      })
      var pick = Math.floor(Math.random() * unseenFiles.length)
      var fileIndex = unseenFiles[pick]
      this.addToSeen(fileIndex)
      return fileIndex
    },
    getAudio: function () {
      Vue.set(this, 'currentFile', this.urn())
    }
  }
})

new Vue({ el: '#app' }) /* eslint-disable-line no-new */
