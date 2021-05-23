<template>
  <li class="flex">
    <div class="ml-3 flex justify-end">
      <p
        class="rounded-xl bg-[#0099ff] px-4 py-2 lg:max-w-[70%] text-sm text-white"
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis,
        magnam necessitatibus mollitia velit alias nobis illo ea, dicta ipsa
        aliquam, adipisci saepe labore accusamus? Doloremque sunt facilis
        excepturi labore eligendi.
      </p>
    </div>
  </li>
  <li class="flex mb-2">
    <div class="flex-shrink-0 self-end">
      <img
        class="flex-grow-0 flex-shrink-0 rounded-full h-7 w-7 object-cover"
        src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
      />
    </div>
    <div class="ml-3">
      <p class="rounded-xl bg-gray-200 px-4 py-2 lg:max-w-[70%] text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis,
        magnam necessitatibus mollitia velit alias nobis illo ea, dicta ipsa
        aliquam, adipisci saepe labore accusamus? Doloremque sunt facilis
        excepturi labore eligendi.
      </p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },

  setup() {},
};
</script>