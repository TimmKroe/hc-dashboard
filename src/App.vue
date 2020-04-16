<template>
  <div id="app">
    <Navigation/>
    <!-- END NAV -->
    <div class="container">
      <div class="columns">
        <div class="column is-3 ">
          <SidebarNavigation/>
        </div>
        <div class="column is-9">

          <Breadcrumbs/>

          <router-view>

          </router-view>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Navigation from "@/components/Navigation";
import SidebarNavigation from "@/components/SidebarNavigation";
import Breadcrumbs from "@/components/Breadcrumbs";
export default {
  name: 'App',
  components: {
    Breadcrumbs,
    SidebarNavigation,
    Navigation
  }
}
</script>

<style>
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    font-size: 16px;
    line-height: 1.5;
    height: 100%;
    background: #ECF0F3;
  }
  nav.navbar {
    border-top: 4px solid #276cda;
    margin-bottom: 1rem;
  }
  .navbar-item.brand-text {
    font-weight: 300;
  }
  .navbar-item, .navbar-link {
    font-size: 14px;
    font-weight: 700;
  }
  .columns {
    width: 100%;
    height: 100%;
    margin-left: 0;
  }
  .menu-label {
    color: #8F99A3;
    letter-spacing: 1.3;
    font-weight: 700;
  }
  .menu-list a {
    color: #0F1D38;
    font-size: 14px;
    font-weight: 700;
  }
  .menu-list a:hover {
    background-color: transparent;
    color: #276cda;
    border-radius: 10px;
  }
  .menu-list a.is-active {
    background-color: transparent;
    color: #276cda;
    font-weight: 700;
    border-radius: 10px;
  }
  .card {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
    margin-bottom: 2rem;
    border-radius: 10px;
  }
  .card-header-title {
    color: #8F99A3;
    font-weight: 400;
  }
  .info-tiles {
    margin: 1rem 0;
  }
  .info-tiles .subtitle {
    font-weight: 300;
    color: #8F99A3;
  }
  .hero.welcome.is-info {
    background: #36D1DC;
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);
    background: linear-gradient(to right, #5B86E5, #36D1DC);
    border-radius: 10px;
  }
  .hero.welcome .title, .hero.welcome .subtitle {
    color: hsl(192, 17%, 99%);
  }
  .card .content {
    font-size: 14px;
  }
  .card-footer-item {
    font-size: 14px;
    font-weight: 700;
    color: #8F99A3;
  }
  .card-footer-item:hover {
  }
  .card-table .table {
    margin-bottom: 0;
  }
  .events-card .card-table {
    max-height: 250px;
    overflow-y: scroll;
  }
</style>
