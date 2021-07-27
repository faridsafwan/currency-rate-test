<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Practical Question </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8"> Question </q-item-label>
        <EssentialLink
          v-for="link in questionLinks1"
          :key="link.title"
          v-bind="link"
        />
        <q-item-label header class="text-grey-8">
          Elasticsearch Search criteria
        </q-item-label>
        <EssentialLink
          v-for="link in questionLinks2"
          :key="link.title"
          v-bind="link"
        />
        <q-item-label header class="text-grey-8">
          DynamoDB Search criteria
        </q-item-label>
        <EssentialLink
          v-for="link in questionLinks3"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';

const questionList1 = [
  {
    title: 'Question 1',
    caption: 'Convert message to lowercase',
    icon: 'code',
    link: '/',
  },
  {
    title: 'Question 2',
    caption: 'Currency Coversion Page',
    icon: 'code',
    link: '/question/2',
  },
];

const questionList2 = [
  {
    title: 'Question 1',
    caption: 'Search offers where price range between USD 1 to 5',
    icon: 'code',
    link: '/elastic/1',
  },
  {
    title: 'Question 2',
    caption: 'Search offers where seller is_online=true',
    icon: 'code',
    link: '/elastic/2',
  },
  {
    title: 'Question 3',
    caption: 'Search offers where title can match "wrold"',
    icon: 'code',
    link: '/elastic/3',
  },
  {
    title: 'Question 4',
    caption: 'Search offers sort by sellers user_level in DESC',
    icon: 'code',
    link: '/elastic/4',
  },
  {
    title: 'Question 5',
    caption:
      'Search offers where buyers country is MY, sort by total sales of the offer (in Malaysia) DESC',
    icon: 'code',
    link: '/elastic/5',
  },
  {
    title: 'Index Design',
    caption: 'Design the Elasticsearch index',
    icon: 'code',
    link: '/elastic/6',
  },
];

const questionList3 = [
  {
    title: 'Question 1',
    caption: 'Search user where email=ss1001@gmail.com',
    icon: 'code',
    link: '/dynamo/1',
  },
  {
    title: 'Question 2',
    caption: 'Search all the users where is_seller=true',
    icon: 'code',
    link: '/dynamo/2',
  },
  {
    title: 'DynamoDB table design',
    caption: 'design a user DynamoDB table',
    icon: 'code',
    link: '/dynamo/3',
  },
];

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      questionLinks1: questionList1,
      questionLinks2: questionList2,
      questionLinks3: questionList3,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
