<template>
  <div
    id="carouselExampleSlidesOnly"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <router-link 
            :to="{
            path: '/wines',
            name: 'wines',
        }">
        <img
          src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
          class="d-block w-100"
          alt="..."
        />
        </router-link>
      </div>
      <div class="carousel-item">
        <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg" class="d-block w-100" alt="..." />
      </div>
    </div>
  </div>
</template>