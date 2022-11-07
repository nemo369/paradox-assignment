<script lang="ts">
import { ref } from 'vue';
import {randomFromArr} from '../utils/utils';
export default {
  name: 'SubmitChatId',
  emits: ['fetchChat'],
  setup(props, { emit }) {
    const chatsIds = ['003KG45','QZ8M559','67AA1BO','334PS89' ,'QZ8M559'];
    const chatId = ref(randomFromArr(chatsIds));

    const loadChat = () => {
      if(chatId.value) {
        emit('fetchChat', chatId.value);
        return
      }
      chatId.value = randomFromArr(chatsIds);
    };

    return {
      chatId,
      loadChat,
    };
  },
};

</script>

<template>

  <form @submit.prevent="loadChat">
    <label class="flex gap-x-1 items-center">
      <span class="text-gray-700 flex-auto whitespace-nowrap">Chat ID:</span>
      <input
        v-model="chatId"
        type="text"
        class="py-2 px-1 block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </label>
    <button
      type="submit"
      class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Load chat
    </button>
  </form>
</template>

<style scoped>

</style>
