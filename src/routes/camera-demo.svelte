<script>
  import Camera from "$lib/Camera.svelte"

  let cameraShow = false
  let images = []

  const cameraDone = (ev) => {
    console.log(ev)
    images.push(ev.detail.image)
    console.log(images[0])
    images = images
    cameraShow = false
  }
</script>

<button on:click={() => cameraShow = true} type=button>Open Camera</button>

{#if cameraShow}
  <Camera on:cancel={() => cameraShow = false} on:done={cameraDone} />
{/if}

{images.length}
{#each images as image}
  <img src={image} alt="Image">
{/each}