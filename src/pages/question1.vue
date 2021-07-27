<template>
  <q-page padding>
    <!-- content -->
    <div class="full-width row wrap justify-evenly content-center">
      <div class="col-3">
        <p>Original message</p>
        <q-input v-model="message" outlined />
      </div>
      <div class="col-1 q-pt-lg">
        <br />
        <q-btn flat round color="primary" icon="arrow_forward_ios" />
      </div>
      <div class="col-3">
        <p>Message in Lowercase</p>
        <p class="q-pt-md">{{ messagetoLowerCase }}</p>
      </div>
    </div>
    <br />
  </q-page>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Question1',
  setup() {
    let message = ref('');
    let messagetoLowerCase = computed(() => {
      return message.value.toLowerCase();
    });

    return {
      message,
      messagetoLowerCase,
    };
  },
};
</script>
