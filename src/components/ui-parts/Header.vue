<template>
  <nav class="bg-[#000000] text-[#ffffff] border-gray-200 dark:bg-gray-900">
    <div class="relative flex flex-wrap items-center justify-between mx-auto p-4">
      <p class="space-x-3 rtl:space-x-reverse">Book Finder</p>
      <div class="w-full block w-auto" id="navbar-default">
        <ul
          class="absolute right-20 top-0.5 font-medium flex p-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row space-x-8 rtl:space-x-reverse border-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <li>
            <RouterLink to="/home">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/favorites">Favorites</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>
