<template>
  <div class="loading-animation">
    <div v-for="i in 5" :key="i" :class="['circle', `order-${i}`]"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/palette";
@import "/src/assets/scss/contentAdjustment";

$circles-count: 5;
$circle-radius: 12px;

$loading-color: $color-1-shade-5;

$duration: 1.5s;

@keyframes change-color {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.loading-animation {
  display: flex;
  gap: $padding-step-large;
}

.circle {
  width: $circle-radius * 2;
  height: $circle-radius * 2;
  border-radius: $circle-radius;

  background: $loading-color;

  animation: change-color $duration infinite;
}

@for $i from 0 to $circles-count {
  .circle.order-#{$i} {
    opacity: $i * 1 / $circles-count;
    animation-delay: $i * $duration / $circles-count;
  }
}

</style>