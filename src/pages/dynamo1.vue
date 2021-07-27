<template>
  <q-page padding>
    <!-- content -->
    <div class="q-gutter-sm">
      <div class="row justify-between">
        <div class="col">
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
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    let answer = ref(`
    response = table.get_item(
        Key={
            'email': 'ss1001@gmail.com',
        }
    )
    item = response['Item']
    print(item)`);

    return {
      answer: answer,
    };
  },
};
</script>
