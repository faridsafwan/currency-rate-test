<template>
  <q-page padding>
    <!-- content -->
    <div class="full-width row wrap justify-evenly content-center">
      <div class="col-3">
        <p>Amount</p>
        <q-input v-model="amount" type="number" outlined @click="reset" />
      </div>
      <div class="col-3" @click="reset">
        <p>From</p>
        <q-select v-model="from" outlined :options="options" />
      </div>
      <div class="col-1 q-pt-lg">
        <br />
        <q-btn
          flat
          round
          color="primary"
          icon="sync_alt"
          class="full-width"
          @click="swapCurrency"
        />
      </div>
      <div class="col-3" @click="reset">
        <p>To</p>
        <q-select v-model="to" outlined :options="options" />
      </div>
      <div class="col-1 q-pt-lg">
        <br />
        <q-btn
          flat
          round
          color="primary"
          icon="arrow_forward_ios"
          class="full-width"
          @click="submit"
        />
      </div>
    </div>
    <br />
    <div v-if="submitted" class="q-pt-xl">
      <h4 class="full-width row wrap justify-evenly content-center">
        {{ amount }} {{ from }} =
      </h4>
      <div class="full-width row wrap justify-evenly content-center">
        <h2>{{ converted }} {{ to }}</h2>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { api } from 'boot/axios';

export default {
  name: 'Question2',
  setup() {
    let data = ref(null);
    let amount = ref(1);
    let from = ref('USD');
    let to = ref('MYR');
    let submitted = ref(false);
    let converted = ref('');

    function submit() {
      submitted.value = true;
      if (from.value === to.value) {
        return (converted.value = amount.value);
      }
      api
        .get('/currency', {
          params: {
            q: `${from.value}_${to.value}`,
            compact: 'ultra',
            apiKey: '4fde8650caf1344c2ec4',
          },
        })
        .then((response) => {
          console.log(response, 'response');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data.value = response.data;
          converted.value = amount.value * data.value.spotRate;
        })
        .catch((e) => {
          console.log(e, 'e');
        });
    }

    function swapCurrency() {
      submitted.value = false;
      let currentFrom = from.value;
      from.value = to.value;
      to.value = currentFrom;
    }

    function reset() {
      submitted.value = false;
    }

    return {
      amount,
      from,
      to,
      options: ['EUR', 'MYR', 'USD'],
      submitted,
      submit,
      data,
      converted,
      swapCurrency,
      reset,
    };
  },
};
</script>
