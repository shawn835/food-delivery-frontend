<template>
  <div class="profile-update-page">
    <h1>Update Your Profile</h1>

    <!-- Profile Information -->
    <div class="card">
      <h2>Personal Information</h2>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" v-model="phone" required />
        </div>

        <div class="form-group">
          <label for="name">city</label>
          <input type="city" id="city" v-model="city" required />
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <textarea id="address" v-model="address" required></textarea>
        </div>
        <button type="submit" class="btn-save">Save Profile</button>
      </form>
    </div>

    <!-- Password Update -->
    <div class="card">
      <h2>Change Password</h2>
      <form @submit.prevent="updatePassword">
        <div class="form-group">
          <label for="current-password">Current Password</label>
          <input
            type="password"
            id="current-password"
            v-model="currentPassword"
            required />
        </div>
        <div class="form-group">
          <label for="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            v-model="newPassword"
            required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            required />
        </div>
        <button type="submit" class="btn-save">Save Password</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { useToast } from "vue-toastification";
const userStore = useUserStore();
const toast = useToast();

const name = ref(userStore?.user.name || "");
const phone = ref(userStore?.user.phone || "");
const city = ref(userStore?.user.city || "");
const email = ref(userStore?.user.email || "");
const address = ref(userStore?.user.address || "");
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

// Dummy API call (replace with real API)
const updateProfile = () => {
  // Add validation for profile data
  if (!name.value || !phone.value || !address.value) {
    toast.error("Please fill all the fields!");
    return;
  }
};

const updatePassword = async () => {
  // Validate password fields
  if (newPassword.value !== confirmPassword.value) {
    toast("Passwords do not match!");
    return;
  }

  if (newPassword.value.length < 6) {
    toast("Password should be at least 6 characters!");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/updatepassword`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to update password");
    }

    toast.success(data.message || "Password updated successfully");
    newPassword.value = "";
    currentPassword.value = "";
    confirmPassword.value = "";
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};
</script>

<style scoped>
.profile-update-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  font-weight: bold;
}

input,
textarea {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.btn-save {
  width: 100%;
  background: #28a745;
  color: white;
  font-size: 1.2rem;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.btn-save:hover {
  background: #218838;
}
</style>
