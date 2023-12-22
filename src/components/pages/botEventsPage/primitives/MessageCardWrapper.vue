<template>
  <div class="message-card-wrapper">
    <message-card :item="item" :options="options"/>
  </div>
</template>

<script>
import MessageCard from "@/components/pages/botEventsPage/primitives/MessageCard";

export default {
  components: {MessageCard},
  props: {
    item: {
      required: true,
      type: Object
    },
    options: Object
  }
}
</script>

<style scoped lang="scss">

@import "/src/assets/scss/contentAdjustment";

.message-card-wrapper {
  margin: $padding-step-large * 2 0;
}

</style>