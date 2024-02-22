<template>
  <div class="pace-selector">
    <form @submit.prevent>
      <div>
        <label for="minPace">Min: </label>
        <select name="minPace" id="minPace" v-model="minPace">
          <option v-for="min in 10" :key="min" :value="min * 60">
            {{ min }}/km
          </option>
        </select>
        <label for="maxPace">Max: </label>
        <select name="maxPace" id="maxPace" v-model="maxPace">
          <option v-for="max in 5" :key="max" :value="minPace + max * 60">
            {{ minPace / 60 + max }}/km
          </option>
        </select>
      </div>
      <div class="pace-selector__slider">
        <label for="pace-selector" class="pace-calculator__label"
          >Select your pace</label
        >
        <input
          v-model="model"
          type="range"
          name="pace-selector"
          id="pace-selector"
          :min="minPace"
          :max="maxPace"
          :step="1"
          list="markers"
        />
      </div>
    </form>
    <p class="__display">{{ formatPace(model) }} min/km</p>
    <datalist id="markers">
      <option
        v-for="marker in 12"
        :value="minPace + ((maxPace - minPace) / 12) * marker"
      ></option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { formatPace } from "../lib/lib";

const minPace = ref(4 * 60);
const maxPace = ref(6 * 60);

const defaultPace = minPace.value + (maxPace.value - minPace.value) * 0.5;

const model = defineModel({ default: "0" });

model.value = defaultPace.toString();
</script>

<style scoped lang="scss">
.pace-selector {
  width: 100%;
  display: flex;
  flex-flow: column;
  position: sticky;
  top: 0;
  z-index: 100;
  background: #242424;
  &__slider {
    height: 48px;
    margin: 0.5rem 0;
  }

  &__display {
    font-size: x-large;
    font-weight: bold;
    font-family: monospace;
  }
}
</style>
