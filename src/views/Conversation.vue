<template>
  <div
    class="w-full h-16 border-b border-gray-300 flex items-center pl-3 pr-4 py-2"
  >
    <div
      class="border shadow bg-gray-100 flex-grow-0 flex-shrink-0 rounded-full h-10 w-10 flex justify-center items-center"
    >
      <span>{{ initials }}</span>
    </div>
    <div class="ml-3 flex-1 h-full flex flex-col justify-center">
      <p class="text-base font-bold">{{ chatName }}</p>
    </div>
    <!-- Actions -->
    <div class="flex-shrink-0 flex-grow-0">
      <button class="h-auto w-auto rounded-full p-1.5 hover:bg-gray-100">
        <InformationCircleIcon class="h-6 w-6 text-blue-500" />
      </button>
    </div>
  </div>
  <div class="flex-1 flex flex-col min-h-0 mt-3 w-full">
    <ul
      class="flex-1 h-full flex w-full overflow-hidden flex-col-reverse pl-1 pr-6 pb-1 overflow-y-auto"
    >
      <!-- Display messages here -->
      <Message
        v-for="message in messages"
        :message="message"
        :didISendIt="didISendIt(message)"
        :initials="initials"
      />
    </ul>
    <div class="flex items-center h-min py-2 px-3 w-full flex-shrink-0">
      <button
        class="hover:bg-gray-100 rounded-full p-2 flex justify-center items-center"
      >
        <PhotographIcon class="h-5 w-5 text-blue-500 block" />
      </button>
      <label class="ml-3 flex-1" for="">
        <input
          type="text"
          placeholder="Aa"
          class="w-full rounded-full border-none outline-none py-2 px-3 bg-gray-100"
          v-model="newMessage.message"
        />
      </label>
      <button
        class="ml-2 hover:bg-gray-100 rounded-full px-2 py-2.5 flex justify-center items-center"
        @click="sendMessage()"
      >
        <PaperAirplaneIcon
          class="transform rotate-90 h-5 w-5 text-blue-500 block ml-1"
        />
      </button>
    </div>
  </div>
</template>


<script>
import {
  InformationCircleIcon,
  PhotographIcon,
  PaperAirplaneIcon,
} from "@heroicons/vue/solid";

import { useRoute } from "vue-router";
import { ref, reactive } from "@vue/reactivity";
import Message from "../components/Message.vue";
import io from "socket.io-client";
import { onMounted } from "@vue/runtime-core";

export default {
  components: {
    InformationCircleIcon,
    PhotographIcon,
    PaperAirplaneIcon,
    Message,
  },

  setup() {
    const socket = io("http://localhost:4000");
    const router = useRoute();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("id");
    const chatId = router.params.id;
    const chat = reactive({});
    const messages = ref([]);
    const chatName = ref("");
    const initials = ref("");
    const newMessage = reactive({
      message: "",
      user,
      chat: "",
    });

    const getChat = async () => {
      const res = await fetch(`http://localhost:4000/api/chats/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
      });

      const data = await res.json();

      chat.value = data;
      chatName.value = getChatName(chat.value);
      initials.value = getInitials(chatName.value);
      newMessage.chat = chat.value._id;
    };

    const getMessages = async () => {
      const res = await fetch(
        `http://localhost:4000/api/messages/chat/${chatId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": token,
          },
        }
      );

      const data = await res.json();

      messages.value = data;

      socket.on("message", (data) => {
        messages.value.unshift(data);
      });
    };

    getChat();
    getMessages();

    const didISendIt = (message) => {
      return message.user === user;
    };

    const getInitials = (name) => {
      name = name.split(/\s+/);
      const initials = "";
      if (name.length > 1) {
        return name[0][0] + name[1][0];
      } else {
        if (name.length > 1) {
          return name[0][0] + name[0][1];
        } else {
          return name[0];
        }
      }
    };

    const getChatName = (chat) => {
      if (chat.users.length > 2) {
        let name = "";
        for (let i = 0; i < chat.users.length; i++) {
          if (chat.users[i].id !== user) {
            name += chat.users[i].name.split()[0];
          }
        }
        return name;
      } else {
        for (let i = 0; i < chat.users.length; i++) {
          if (chat.users[i]._id !== user) {
            return chat.users[i].name;
          }
        }
      }
    };

    const sendMessage = async () => {
      const res = await fetch(`http://localhost:4000/api/messages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify(newMessage),
      });

      const data = await res.json();
      const response = data;
      newMessage.message = "";
    };

    return {
      chat,
      didISendIt,
      chatName,
      messages,
      newMessage,
      sendMessage,
      initials,
    };
  },
};
</script>