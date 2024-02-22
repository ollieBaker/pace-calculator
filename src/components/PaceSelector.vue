<template>
  <div class="pace-selector">
    <form @submit.prevent>
      <div class="pace-selector__range">
        <div class="pace-selector__range-input">
          <label for="minPace" class="pace-selector__range-label">Min: </label>
          <select
            name="minPace"
            id="minPace"
            v-model="minPace"
            class="pace-selector__range-select"
          >
            <option v-for="min in 10" :key="min" :value="min * 60">
              {{ min }}/km
            </option>
          </select>
        </div>
        <div class="pace-selector__range-input">
          <label for="maxPace" class="pace-selector__range-label">Max: </label>
          <select
            name="maxPace"
            id="maxPace"
            v-model="maxPace"
            class="pace-selector__range-select"
          >
            <option v-for="max in 5" :key="max" :value="minPace + max * 60">
              {{ minPace / 60 + max }}/km
            </option>
          </select>
        </div>
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
      >
        {{ minPace + ((maxPace - minPace) / 12) * marker }}
      </option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { formatPace } from "../lib/lib";

const model = defineModel({ default: "0" });

const minuteValue = parseInt(model.value);
const remainder = minuteValue % 60;
const minPace = ref(Math.max(60, minuteValue - (60 + remainder)));
const maxPace = ref(Math.min(600, minuteValue + (60 - remainder)));
</script>

<style scoped lang="scss">
.pace-selector {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-flow: column;
  background: #242424;
  &__slider {
    height: 48px;
    margin: 1rem 0;
  }

  &__display {
    font-size: x-large;
    font-weight: bold;
    font-family: monospace;
  }
  &__range {
    display: flex;
    justify-content: space-between;
  }
  &__range-label {
    font-size: 1rem;
  }
  &__range-select {
    font-size: medium;
    width: 8ch;
    padding: 2px;
    border: 1px solid white;
    border-radius: 4px;
  }
}
</style>
