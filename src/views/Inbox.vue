<template>
  <div
    class="flex bg-white h-screen max-w-screen min-w-[300px] overflow-hidden"
  >
    <div class="w-24 lg:w-96 h-screen border-r border-gray-300 h-full">
      <div class="flex flex-col h-full">
        <div
          class="flex w-full h-auto items-center p-4 justify-center lg:justify-between"
        >
          <div class="flex justify-center lg-justify-start items-center">
            <div
              class="border bg-gray-100 shadow flex-grow-0 rounded-full h-10 w-10 flex justify-center items-center"
            >
              <span>{{ initials }}</span>
            </div>
            <h2
              class="hidden mb-1 lg:block flex-grow overflow-hidden ml-3 text-2xl font-bold"
            >
              Chats
            </h2>
          </div>
          <div class="hidden lg:flex">
            <div class="relative">
              <button
                @click="menu = !menu"
                class="flex items-center justify-center hover:bg-gray-200 rounded-full p-2 ring-0 ring-transparent focus:outline-none"
              >
                <DotsHorizontalIcon class="h-5 w-5" r />
              </button>
              <div
                v-show="menu"
                class="w-32 absolute bg-white border border-black rounded"
              >
                <button
                  @click="logout"
                  class="w-full rounded hover:bg-gray-100 py-1 text-center text-sm border-none"
                >
                  Logout
                </button>
              </div>
            </div>
            <router-link
              :to="{ name: 'NewChat' }"
              class="flex items-center justify-center hover:bg-gray-200 rounded-full p-2 ml-1"
            >
              <PencilAltIcon class="h-5 w-5" />
            </router-link>
          </div>
        </div>
        <div class="p-4 shadow-sm">
          <form>
            <div class="mt-1 relative rounded-md shadow-sm">
              <label
                class="relative flex bg-gray-100 mt-1 relative rounded-lg shadow-sm"
              >
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <!-- Heroicon name: solid/mail -->
                  <SearchIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  v-model="search"
                  type="text"
                  class="pl-10 w-full h-full rounded-lg bg-transparent border-none"
                  placeholder="Search in chats"
                />
              </label>
              <div
                v-if="users.length > 0"
                class="absolute border rounded-lg mt-1 w-[351px] bg-white max-h-[300px] overflow-y-auto p-2"
              >
                <ul>
                  <li v-for="u in users">
                    <button
                      @click.prevent="createChat(u._id)"
                      class="w-full shadow-none ring-0 focus:outline-none"
                    >
                      <div
                        class="flex hover:bg-gray-100 w-full rounded-lg cursor-pointer lg:px-3 py-2 justify-center lg:justify-start"
                      >
                        <div>
                          <div
                            class="shadow border bg-gray-100 flex-shrink-0 rounded-full h-10 w-10 object-cover flex justify-center items-center"
                          >
                            <span>{{ u.initials }}</span>
                          </div>
                        </div>
                        <div
                          class="flex flex-col ml-3 justify-center flex-grow"
                        >
                          <p class="block text-sm text-gray-900 text-left">
                            {{ u.name }}
                          </p>
                          <p
                            class="flex items-center mt-0.5 block text-xs text-gray-500"
                          >
                            {{ u.email }}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <div class="overflow-hidden h-full">
          <ul class="flex min-h-0 max-h-full flex-col overflow-y-auto">
            <Chat
              v-for="chat in chats"
              :username="getUsername(chat)"
              :id="chat._id"
              :message="chat.lastMessage.message"
              :who="who(chat.lastMessage.user)"
              :when="chat.updatedAt"
            />
          </ul>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col w-full h-screen">
      <router-view :key="$route.name + ($route.params.id || '')"></router-view>
    </div>
  </div>
</template>

<script>
import {
  DotsHorizontalIcon,
  InformationCircleIcon,
  PhotographIcon,
  PaperAirplaneIcon,
} from "@heroicons/vue/solid";
import { PencilAltIcon, SearchIcon } from "@heroicons/vue/outline";
import Chat from "../components/Chat.vue";
import { useRouter } from "vue-router";
import { reactive, ref, watch } from "vue";
import io from "socket.io-client";

export default {
  components: {
    DotsHorizontalIcon,
    PencilAltIcon,
    SearchIcon,
    Chat,
    InformationCircleIcon,
    PhotographIcon,
    PaperAirplaneIcon,
  },
  setup() {
    const router = useRouter();
    const socket = io("http://localhost:4000");
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("id");
    const initials = localStorage.getItem("initials");

    if (!token) {
      router.push("/login");
      return {
        users: [],
      };
    }

    const nameofuser = localStorage.getItem("name");
    const menu = ref(false);
    const search = ref("");
    const users = ref([]);
    const chats = ref([]);

    const username = ref("");

    const newChat = reactive({
      users: [user],
      createdBy: user,
    });

    const getChats = async () => {
      const res = await fetch(
        `http://localhost:4000/api/chats/user/${user}?username=${username.value
          .trim()
          .replaceAll("\\s{1,}", "+")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": token,
          },
        }
      );
      const data = await res.json();

      chats.value = data;

      socket.on("newChat", (data) => {
        console.log(getUsername(data));
        for (let i = 0; i < chats.value.length; i++) {
          if (chats.value[i]._id === data._id) {
            chats.value.splice(i, 1);
          }
        }
        chats.value.unshift(data);
      });
    };

    getChats();

    const logout = async () => {
      await router.push("/t");
      await router.push("login");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    };

    const getUsername = (chat) => {
      if (chat.users.length > 2) {
        let name = [];
        for (let i = 0; i < chat.users.length; i++) {
          if (chat.users[i]._id !== user) {
            name.push(chat.users[i].name.split(/\s/)[0]);
          }
        }
        return name.join(", ");
      } else {
        for (let i = 0; i < chat.users.length; i++) {
          if (chat.users[i]._id !== user) {
            return chat.users[i].name;
          }
        }
      }
    };

    const who = (userDB) => {
      console.log(userDB);
      if (userDB._id === user) return "Tu: ";
      const name = userDB.name.split(/\s/)[0];
      return `${name}: `;
    };

    const searchUsers = async () => {
      const res = await fetch(
        `http://localhost:4000/api/user?user=${search.value
          .trim()
          .replaceAll("\\s{1,}", "+")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": token,
          },
        }
      );
      const data = await res.json();
      users.value = data;
    };

    const createChat = async (id) => {
      search.value = "";
      newChat.users.push(id);
      const res = await fetch("http://localhost:4000/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify(newChat),
      });

      const data = await res.json();
      newChat.users = [user];
      await router.push({ name: "Chat", params: { id: data._id } });
    };

    watch(search, (newValue, oldValue) => {
      searchUsers();
    });

    return {
      menu,
      logout,
      getChats,
      user,
      chats,
      getUsername,
      search,
      users,
      createChat,
      who,
      initials,
    };
  },
};
</script>
