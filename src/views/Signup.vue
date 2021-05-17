<template>
  <div class="min-h-screen bg-white flex">
    <div
      class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
            alt="Workflow"
          />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Registrate</h2>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <form class="space-y-6" @submit.prevent="submit">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Nombre completo
                </label>
                <div class="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autocomplete="name"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    v-model="form.name"
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div class="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <div class="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label
                  for="verify-password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Verificar contraseña
                </label>
                <div class="mt-1">
                  <input
                    id="verify-password"
                    name="verify-password"
                    type="password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    v-model="passwordVerify"
                  />
                </div>
              </div>

              <p class="text-red-500" v-text="errorBag.error">

              </p>

              <div class="flex items-center justify-start">
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-medium text-blue-600 hover:text-blue-500"
                  >
                    ¿Ya tienes una cuenta?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Registrate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixqx=VlAmqSRrnM&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const token = localStorage.getItem("token");

    if(token) {
      router.push('/t')
    }

    const form = reactive({
      name: "",
      email: "",
      password: "",
    });

    const errorBag = reactive({
      name: "",
      email: "",
      password: "",
      error: ""
    });

    const passwordVerify = ref("");

    watch(form, (newValue, oldValue) => {
      console.log(newValue);
    });

    const submit = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        
        const data = await res.json();

        if (data.error) {
          console.log(data.error);
          errorBag.error = 'Error en el registro';
          return;
        }

        localStorage.setItem('token', data.body.token);

        await router.push('/t');
      } catch (error) {
        console.log(error);
      }
    };

    return {
      form,
      submit,
      passwordVerify,
      errorBag
    };
  },
};
</script>
