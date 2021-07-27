<template>
  <q-page padding>
    <!-- content -->
    <div class="q-gutter-sm">
      <div class="row justify-between">
        <div class="col-md-6 q-pa-md">
          <p>Offer Mapping</p>
          <q-editor
            v-model="answer"
            flat
            content-class="bg-amber-3"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['code'],
                },
              ],
            ]"
          />
        </div>
        <div class="col-md-6 q-pa-md">
          <p>Order Mapping</p>
          <q-editor
            v-model="result"
            flat
            content-class="bg-amber-3"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['code'],
                },
              ],
            ]"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let answer = ref(`
    # Offer Mapping
    PUT offer
    {
      "mappings": {
        "properties": {
          "offer_id": {
            "type": "keyword"
          },
          "title": {
            "type": "text"
          },
          "unit_price": {
            "type": "float"
          },
          "my_join_field": {
            "type": "join",
            "relations": {
              "offer": [
                "user",
                "currency"
              ]
            }
          },
          "user_id": {
            "type": "keyword"
          },
          "email": {
            "type": "text"
          },
          "is_seller": {
            "type": "text"
          },
          "user_level": {
            "type": "integer"
          },
          "is_online": {
            "type": "text"
          },
          "user_country": {
            "type": "text"
          },
          "currency_code": {
            "type": "keyword"
          },
          "rate": {
            "type": "float"
          },
          "buy_rate": {
            "type": "float"
          },
          "sell_rate": {
            "type": "float"
          },
          "decimal_places": {
            "type": "integer"
          },
          "last_synced_at": {
            "type": "date"
          }
        }
      }
    }`);

    let result = ref(`
    # Order Mapping
    PUT order
    {
      "mappings": {
        "properties": {
          "order_id": {
            "type": "keyword"
          },
          "my_join_field": {
            "type": "join",
            "relations": {
              "order": [
                "offer",
                "user"
              ]
            }
          },
          "amount (USD)": {
            "type": "float"
          },
          "user_id": {
            "type": "keyword"
          },
          "email": {
            "type": "text"
          },
          "is_seller": {
            "type": "text"
          },
          "user_level": {
            "type": "integer"
          },
          "is_online": {
            "type": "text"
          },
          "user_country": {
            "type": "text"
          }
        }
      }
    }`);
    return {
      answer: answer,
      result: result,
    };
  },
};
</script>
