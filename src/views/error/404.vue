<template>
  <div class="wrapper">
    <div class="error-spacer"></div>
    <div role="main" class="main">
      <h1>你已在Cheyy小镇中迷失了方向</h1>

      <p>
        点击这里回到
        <router-link to="/" >主干道上</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
body {
  font-family: 'Droid Sans', sans-serif;
  font-size: 10pt;
  color: #555;
  line-height: 25px;
}

.wrapper {
  line-height: 35px;
  width: 760px;
  margin: 0 auto 5em auto;
}

.main {
  overflow: hidden;
  color: #22863a;
}

.error-spacer {
  height: 4em;
}

h2 {
  padding: 10px 0 20px;
}

h3 {
  padding: 20px 0 20px;
}

a,
a:visited {
  color: #00b5ad;
}

a:hover {
  color: #00b5ad;
}
</style>
