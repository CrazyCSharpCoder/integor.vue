<template>
  <connection-failed-display v-if="hasConnectionFailedError"/>
  <server-error-display v-else-if="hasServerError" :server-error="serverError"/>
  <router-view v-else></router-view>
</template>

<script>
import appEvents from "@/helpers/appEvents";

import ConnectionFailderHandlingMixin from "@/components/mixins/errorHandling/ConnectionFailderHandlingMixin";
import ServerErrorHandlingMixin from "@/components/mixins/errorHandling/ServerErrorHandlingMixin";

import ConnectionFailedDisplay from "@/components/primitives/informationDisplay/ConnectionFailedDisplay";
import ServerErrorDisplay from "@/components/primitives/informationDisplay/ServerErrorDisplay";

export default {
  components: {
    ServerErrorDisplay,
    ConnectionFailedDisplay
  },
  mixins: [
    ConnectionFailderHandlingMixin(
        appEvents.connection.connectionFailedError,
        appEvents.connection.connectionRestoredError
    ),
    ServerErrorHandlingMixin(
        appEvents.errors.serverError,
        appEvents.errors.discardServerError
    )
  ],
}
</script>

<style scoped>

</style>