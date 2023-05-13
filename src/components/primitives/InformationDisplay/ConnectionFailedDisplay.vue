<template>
  <information-display
      title="Не удалось установить соединение с сервером"
      description="Возможно, на сервере возникли неполадки, или
      у вас плохое качество соединения. Зайдите позже"
      :image-ref="require('@/assets/icons/connection-failed.svg')"
  />
</template>

<script>
import InformationDisplay from "@/components/primitives/InformationDisplay/InformationDisplay";

export default {
  components: {InformationDisplay}
}
</script>

<style scoped>

</style>