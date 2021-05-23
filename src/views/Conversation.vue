<template>
  <div
    class="w-full h-16 border-b border-gray-300 flex items-center pl-3 pr-4 py-2"
  >
    <img
      class="flex-grow-0 flex-shrink-0 rounded-full h-10 w-10 object-cover"
      src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    />
    <div class="ml-3 flex-1 h-full flex flex-col justify-center">
      <p class="text-base font-bold">Someone Unknown</p>
      <p class="text-xs text-gray-500">Activo hace 38 min</p>
    </div>
    <!-- Actions -->
    <div class="flex-shrink-0 flex-grow-0">
      <button class="h-auto w-auto rounded-full p-1.5 hover:bg-gray-100">
        <InformationCircleIcon class="h-6 w-6 text-blue-500" />
      </button>
    </div>
  </div>
  <div class="flex-1 flex flex-col">
    <ul class="flex-1 flex flex-col-reverse pl-1 pr-6 pb-1">
      <!-- Display messages here -->
    </ul>
    <div class="flex items-center py-2 px-3 w-full">
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
        />
      </label>
      <button
        class="ml-2 hover:bg-gray-100 rounded-full px-2 py-2.5 flex justify-center items-center"
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
export default {
  components: {
    InformationCircleIcon,
    PhotographIcon,
    PaperAirplaneIcon,
  },

  setup() {},
};
</script>