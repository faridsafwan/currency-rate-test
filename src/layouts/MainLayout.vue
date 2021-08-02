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
        <div v-if="!user" class="q-pa-sm q-gutter-md">
          <q-btn
            color="secondary"
            label="Login as seller"
            @click="login('seller')"
          />
          <q-btn
            color="secondary"
            label="Login as buyer"
            @click="login('buyer')"
          />
        </div>
        <div class="q-px-lg">
          <b>{{ currentLogin }}</b>
        </div>
        <div>Quasar v{{ $q.version }}</div>
        <q-btn
          dense
          round
          flat
          icon="notifications"
          class="q-mx-md"
          @click="toggleNotification"
        >
          <q-badge color="red" floating transparent>
            {{ purchaseOrder.length + soldOrder.length }}
          </q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>
    <div v-if="notificationOpen" class="q-pa-md absolute dropout">
      <q-card class="my-card">
        <q-card-actions class="q-pa-md text-grey-6" align="center">
          No order cancellation
        </q-card-actions>
        <q-card-actions class="q-pa-md bg-grey-3" align="between">
          <span>PURCHASE ORDERS</span>
          <span class="text-red-9"
            >View all <q-icon class="q-pl-sm" name="arrow_forward" />
          </span>
        </q-card-actions>
        <div v-if="purchaseOrder.length > 0">
          <q-card-actions
            v-for="order of purchaseOrder"
            :key="order"
            class="q-pa-md"
            align="between"
          >
            <span>{{ order['orderId'] }}</span>
            <span>{{ order['status'] }}</span>
          </q-card-actions>
        </div>
        <q-card-actions v-else class="q-pa-md text-grey-6" align="center">
          No sold order
        </q-card-actions>
        <q-card-actions class="q-pa-md bg-grey-3" align="between">
          <span>SOLD ORDERS</span>
          <span class="text-red-10"
            >View all <q-icon class="q-pl-sm" name="arrow_forward" />
          </span>
        </q-card-actions>
        <div v-if="soldOrder.length > 0">
          <q-card-actions
            v-for="order of soldOrder"
            :key="order"
            class="q-pa-md"
            align="between"
          >
            <span>{{ order['orderId'] }}</span>
            <span>{{ order['status'] }}</span>
          </q-card-actions>
        </div>
        <q-card-actions v-else class="q-pa-md text-grey-6" align="center">
          No sold order
        </q-card-actions>
      </q-card>
    </div>

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
    link: '/question/1',
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

import { defineComponent, ref, computed } from 'vue';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const notificationOpen = ref(false);
    const purchaseOrder = ref([]);
    const soldOrder = ref([]);
    const user = ref('');

    let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

    let login = (loginUser: string) => {
      user.value = loginUser;
      purchaseOrder.value = [];
      soldOrder.value = [];
      socket = io('http://localhost:3000', { auth: { token: user.value } });

      socket.on('connect', () => {
        console.log(`Connected with id: ${socket.id}`);
      });

      socket.on('buyer-notification', (n: []) => {
        purchaseOrder.value = n;
        soldOrder.value = [];
      });

      socket.on('seller-notification', (n: []) => {
        soldOrder.value = n;
        purchaseOrder.value = [];
      });
    };

    let currentLogin = computed(() => {
      return user.value ? `Login as ${user.value}` : 'Please login first !';
    });

    return {
      questionLinks1: questionList1,
      questionLinks2: questionList2,
      questionLinks3: questionList3,
      leftDrawerOpen,
      notificationOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleNotification() {
        notificationOpen.value = !notificationOpen.value;
      },
      login,
      currentLogin,
      purchaseOrder,
      soldOrder,
      user,
    };
  },
});
</script>

<style scoped>
.dropout {
  max-width: 350px;
  top: 2.5rem;
  right: 2rem;
  z-index: 1;
}

.my-card {
  width: 100%;
  min-width: 350px;
}
</style>
