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
    import boto3

    # Get the service resource.
    dynamodb = boto3.resource('dynamodb')

    # Create the DynamoDB table.
    table = dynamodb.create_table(
        TableName='users',
        KeySchema=[
            {
                'AttributeName': 'email',
                'KeyType': 'HASH'
            },
            {
                'AttributeName': 'is_seller',
                'KeyType': 'RANGE'
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'email',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'is_seller',
                'AttributeType': 'S'
            },
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        }
    )

    # Wait until the table exists.
    table.meta.client.get_waiter('table_exists').wait(TableName='users')

    # Print out some data about the table.
    print(table.item_count)`);

    return {
      answer: answer,
    };
  },
};
</script>
