<script lang="ts">
    import { goto } from '$app/navigation';
</script>


<div class="w-[26rem] border-2 bg-transparent rounded-md grid-place-items-center px-4 py-2 text-white text-xl text-center">
  Temporary Navbar
  <div class="flex">
    <button on:click={()=>{goto('/book'); console.log('clicked da home button')}} class="border-r-2 pr-4 mr-4">
      EchoEDU
    </button> 
    <button on:click={()=>{goto('/tutoring')}} class="border-r-2 pr-4 mr-4">
      Tutoring
    </button> 
    <button on:click={()=>{goto('/tutoring/schedule')}}>
      Scheduling
    </button> 
  </div>
</div>

<style>

</style>