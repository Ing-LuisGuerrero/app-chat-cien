<template>
  <li v-if="didISendIt" class="mt-3 flex justify-end">
    <div class="ml-3 flex justify-end w-full">
      <p
        class="rounded-xl bg-[#0099ff] px-4 py-2 lg:max-w-[70%] text-sm text-white"
      >
        {{ message.message }}
      </p>
    </div>
  </li>
  <li v-else class="flex mt-3">
    <div class="flex-shrink-0 self-end">
      <img
        class="flex-grow-0 flex-shrink-0 rounded-full h-7 w-7 object-cover"
        src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
      />
    </div>
    <div class="ml-3 w-full">
      <p class="rounded-xl bg-gray-200 px-4 py-2 w-min lg:max-w-[70%] text-sm">
        {{ message.message }}
      </p>
    </div>
  </li>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    didISendIt: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const user = ref({});

    const getUser = async () => {
      const res = await fetch(
        `http://localhost:4000/api/user/${props.message.user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": token,
          },
        }
      );

      const data = await res.json();

      user.value = data;
      console.log("enter");
      console.log(user.value);
    };

    console.log(`${props.message.user} === ${id}`);
    console.log(props.message.user !== id);
    if (props.message.user !== id) {
      getUser();
    }

    return {
      user,
    };
  },
};
</script>