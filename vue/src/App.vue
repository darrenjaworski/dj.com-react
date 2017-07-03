<template>
<div>
  <header>
    <nav id="navigation" class="nav">
      <router-link to="/" exact>home</router-link>
      <router-link to="projects">projects</router-link>
      <router-link to="journalism">journalism</router-link>
    </nav>
  </header>
  <main>
    <router-view></router-view>
  </main>
</div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import "../node_modules/normalize.css/normalize.css";

$main: #304371;
$accent: #5883A7;

// #0D0B0E;
// #020526;
// #304371;

html {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-size: 100%;
    color: $main;
}

a {
    color: $accent;
    &:hover {
        color: darken($accent, 10%);
    }
}

header,
main {
    max-width: 45rem;
    margin: auto;
    padding: 0 1rem 2rem;
}

h1,
h2,
h3,
h4,
h5,
h6,
li,
p {
    margin: 0 !important;
    line-height: 1.5;
}

h1 {
    font-size: 40px !important;
    padding-bottom: 0.5rem;
}

h2 {
    font-size: 32px;
}

h3 {
    font-size: 24px;
}

nav a,
li,
p {
    font-size: 19px;
    padding-bottom: 0.75rem;
}

ul {
    margin: 1rem 0 0;
    padding-left: 3rem;
}

img {
    max-width: 100%;
}

header {
    ul {
        padding: 1rem 0;
        margin: 0;
    }
    a {
        padding: 0;
        display: inline-block;
        margin-right: 1rem !important;
        &.router-link-active {
            color: $main;
        }
    }
}
</style>
