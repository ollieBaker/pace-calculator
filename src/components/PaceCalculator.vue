<script setup lang="ts">
import { ref } from "vue";
import { formatPace, calcTime } from "../lib/lib";
import PaceSelector from "../components/PaceSelector.vue";

const selectedPace = ref("");
</script>

<template>
  <section class="pace-calculator">
    <PaceSelector v-model="selectedPace" />
    <table class="pace-calculator__table">
      <thead class="pace-calculator__table-head">
        <tr>
          <th class="pace-calculator__cell pace-calculator__cell--distance">
            Distance
          </th>
          <th class="pace-calculator__cell pace-calculator__cell--pace">
            {{ formatPace(selectedPace) }}/km
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="distance in 50" :key="distance">
          <tr
            v-if="distance === 22"
            class="pace-calculator__table-row pace-calculator__table-row--race-distance"
          >
            <td class="pace-calculator__cell pace-calculator__cell--distance">
              1/2 Marathon
            </td>
            <td class="pace-calculator__cell pace-calculator__cell--pace">
              {{ calcTime(21.0975, selectedPace) }}
            </td>
          </tr>
          <tr
            v-if="distance === 43"
            class="pace-calculator__table-row pace-calculator__table-row--race-distance"
          >
            <td class="pace-calculator__cell pace-calculator__cell--distance">
              Marathon
            </td>
            <td class="pace-calculator__cell pace-calculator__cell--pace">
              {{ calcTime(42.195, selectedPace) }}
            </td>
          </tr>
          <tr
            class="pace-calculator__table-row"
            :class="{
              'pace-calculator__table-row--race-distance':
                distance == 5 || distance == 10,
            }"
          >
            <td class="pace-calculator__cell pace-calculator__cell--distance">
              {{ distance }}/km
            </td>
            <td class="pace-calculator__cell pace-calculator__cell--pace">
              {{ calcTime(distance, selectedPace) }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </section>
</template>

<style scoped lang="scss">
.pace-calculator {
  display: flex;
  flex-flow: column;
  flex-wrap: nowrap;
  place-items: center;

  &__label {
    font-family: monospace;
    width: 100%;
    display: block;
  }

  &__table {
    width: 100%;
    color: black;
    font-family: monospace;
    font-size: large;
    background-color: whitesmoke;
    max-width: 480px;
    overflow-x: hidden;
    border-collapse: collapse;
  }
  &__table-head {
    > tr {
      border-bottom: 1px solid black;
      margin-bottom: 0.25rem;
      position: sticky;
      top: 121px;
      z-index: 99;
      background-color: white;
      > th {
        padding: 0.5rem 0.5rem;
      }
    }
  }

  &__table-row {
    background-color: whitesmoke;
    &--race-distance {
      background-color: wheat;
      font-weight: bold;
      position: sticky;
      top: 121 + 40.5px;
    }
  }

  &__cell {
    padding: 0.1rem 0.5rem;
    &--distance {
      text-align: left;
    }
    &--pace {
      text-align: right;
    }
  }
}
</style>
