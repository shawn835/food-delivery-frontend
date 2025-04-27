<template>
  <!-- Sidebar -->
  <aside class="sidebar">
    <h2 class="logo">Admin</h2>
    <nav>
      <ul>
        <li v-for="item in navItems" :key="item.name">
          <router-link :to="item.route">
            <span class="icon">{{ item.icon }}</span>
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
const navItems = [
  { name: "Dashboard", route: "/admin/dashboard", icon: "📊" },
  { name: "Meals", route: "/admin/meals", icon: "🍲" },
  { name: "Orders", route: "/admin/orders", icon: "📦" },
  { name: "Users", route: "/admin/users", icon: "👥" },
  { name: "Categories", route: "/admin/categories", icon: "📂" },
  { name: "Reports", route: "/admin/reports", icon: "📋" },
  { name: "Settings", route: "/admin/settings", icon: "⚙" },
];
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: #2c3e50;
  color: #fff;
  padding: 1rem;
}

.logo {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  margin: 1rem 0;
}

nav a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.3s;
}

nav a:hover {
  background: #34495e;
}
</style>
