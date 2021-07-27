<template>
  <q-page padding>
    <!-- content -->
    <div class="q-gutter-sm">
      <div class="row justify-between">
        <div class="col-md-6 q-pa-md">
          <p>Answer</p>
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
          <p>Result</p>
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
    # Question 2 - Search offers where seller is_online=true
    GET offer/_search
    {
      "query": {
        "has_child": {
          "type": "user",
          "query": {
            "match": {
              "is_online": "TRUE"
            }
          }
        }
      }
    }`);

    let result = ref(`{
  "took" : 10,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 3,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "offer",
        "_type" : "_doc",
        "_id" : "AA1000001",
        "_score" : 1.0,
        "_source" : {
          "offer_id" : "AA1000001",
          "title" : "hello world 1000001",
          "unit_price" : 12.44,
          "my_join_field" : {
            "name" : "offer"
          }
        }
      },
      {
        "_index" : "offer",
        "_type" : "_doc",
        "_id" : "AA1000002",
        "_score" : 1.0,
        "_source" : {
          "offer_id" : "AA1000002",
          "title" : "hello world 1000002",
          "unit_price" : 168882,
          "my_join_field" : {
            "name" : "offer"
          }
        }
      },
      {
        "_index" : "offer",
        "_type" : "_doc",
        "_id" : "AA1000005",
        "_score" : 1.0,
        "_source" : {
          "offer_id" : "AA1000005",
          "title" : "hello world 1000005",
          "unit_price" : 11.21,
          "my_join_field" : {
            "name" : "offer"
          }
        }
      }
    ]
  }
}`);
    return {
      answer: answer,
      result: result,
    };
  },
};
</script>
