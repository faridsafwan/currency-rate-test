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
    # Question 5 - Search offers where buyer's country is MY, sort by total sales of the offer (in Malaysia) DESC
    GET order/_search
    {
      "query": {
        "has_child": {
          "type": "user",
          "query": {
            "match": {
              "user_country": "MY"
            }
          }
        }
      },
      "aggs": {
        "offer_MY": {
          "children": {
            "type": "offer"
          },
          "aggs": {
            "offer_id": {
              "terms": {
                "field": "offer_id.keyword",
                "size": 10
              },
              "aggs": {
                "total_sales": {
                  "parent": {
                    "type": "offer"
                  },
                  "aggs": {
                    "sales": {
                      "sum": {
                        "field": "amount (USD)"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`);

    let result = ref(`
        {
      "took" : 4,
      "timed_out" : false,
      "_shards" : {
        "total" : 1,
        "successful" : 1,
        "skipped" : 0,
        "failed" : 0
      },
      "hits" : {
        "total" : {
          "value" : 4,
          "relation" : "eq"
        },
        "max_score" : 1.0,
        "hits" : [
          {
            "_index" : "order",
            "_type" : "_doc",
            "_id" : "O10001",
            "_score" : 1.0,
            "_source" : {
              "order_id" : "O10001",
              "amount (USD)" : 199.99,
              "my_join_field" : {
                "name" : "order"
              }
            }
          },
          {
            "_index" : "order",
            "_type" : "_doc",
            "_id" : "O10004",
            "_score" : 1.0,
            "_source" : {
              "order_id" : "O10004",
              "amount (USD)" : 99.32,
              "my_join_field" : {
                "name" : "order"
              }
            }
          },
          {
            "_index" : "order",
            "_type" : "_doc",
            "_id" : "O10006",
            "_score" : 1.0,
            "_source" : {
              "order_id" : "O10006",
              "amount (USD)" : 45.66,
              "my_join_field" : {
                "name" : "order"
              }
            }
          },
          {
            "_index" : "order",
            "_type" : "_doc",
            "_id" : "O10007",
            "_score" : 1.0,
            "_source" : {
              "order_id" : "O10007",
              "amount (USD)" : 297.22,
              "my_join_field" : {
                "name" : "order"
              }
            }
          }
        ]
      },
      "aggregations" : {
        "offer_MY" : {
          "doc_count" : 4,
          "offer_id" : {
            "doc_count_error_upper_bound" : 0,
            "sum_other_doc_count" : 0,
            "buckets" : [
              {
                "key" : "AA1000001",
                "doc_count" : 3,
                "total_sales" : {
                  "doc_count" : 3,
                  "sales" : {
                    "value" : 596.5300064086914
                  }
                }
              },
              {
                "key" : "AA1000003",
                "doc_count" : 1,
                "total_sales" : {
                  "doc_count" : 1,
                  "sales" : {
                    "value" : 45.65999984741211
                  }
                }
              }
            ]
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
