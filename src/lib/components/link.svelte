<script lang="ts">
  export let href: string;
</script>

<a
  class="transition
    ease-in-out
    p-5 m-5
    rounded-full
    bg-[#3c3836]
    hover:-translate-y-5
    hover:bg-[#689d6a]
    text-center
    align-middle"
  {href}
>
  <slot />
</a>
