<template>
  <div class="upload-form">
    <h2>Upload New Meal</h2>

    <form @submit.prevent="submitMeal">
      <div class="form-group">
        <label>Meal Name</label>
        <input type="text" v-model="meal.mealName" required />
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea v-model="meal.description" required></textarea>
      </div>

      <div class="form-group">
        <label>Price (Ksh)</label>
        <input type="number" v-model.number="meal.price" required min="1" />
      </div>

      <div class="form-group">
        <label>Featured</label>
        <input type="checkbox" v-model="meal.isFeatured" />
      </div>

      <div class="form-group" v-if="meal.isFeatured">
        <label>Discount (%)</label>
        <input type="number" v-model.number="meal.discount" min="0" max="100" />
      </div>

      <div class="form-group">
        <label>Menu Type</label>
        <select v-model="meal.menuTypeId" required>
          <option value="" disabled>Select Menu Type</option>
          <option
            v-for="type in menuStore.menuTypes"
            :key="type.id"
            :value="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>

      <div class="form-group" v-if="categories.length">
        <label>Category</label>
        <select v-model="meal.categoryId" required>
          <option value="" disabled selected>Select Category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Meal Image</label>
        <input
          type="file"
          @change="handleFileChange"
          accept="image/*"
          required />
        <img
          v-if="preview"
          :src="preview"
          alt="Preview"
          class="preview-image" />
      </div>

      <button type="submit">Upload Meal</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useToast } from "vue-toastification";
import { useMenuStore } from "@/store/menuStore";

const toast = useToast();
const menuStore = useMenuStore();

const meal = ref({
  mealName: "",
  description: "",
  price: null,
  discount: null,
  isFeatured: false,
  menuTypeId: "",
  categoryId: "",
});

const preview = ref(null);
const file = ref(null);
const categories = ref([]);

// Watch for changes to the menuTypeId and fetch categories
watch(
  () => meal.value.menuTypeId,
  async (newId) => {
    meal.value.categoryId = "";
    if (newId) {
      const selectedType = menuStore.menuTypes.find(
        (type) => type.id === newId
      );

      if (selectedType) {
        categories.value = await menuStore.fetchCategories(selectedType.name);
      }
    } else {
      categories.value = [];
    }
  }
);

onMounted(() => {
  if (!menuStore.menuTypes.length) {
    menuStore.fetchMenuTypes();
  }
});

// Handle image file selection
const handleFileChange = (e) => {
  file.value = e.target.files[0];

  if (file.value) preview.value = URL.createObjectURL(file.value);
};

const submitMeal = async () => {
  try {
    const formData = new FormData();
    for (const key in meal.value) {
      formData.append(key, meal.value[key]);
    }
    formData.append("mealImage", file.value);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/uploadmeals`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      toast.success(
        data.message || "Meal uploaded, processing in background..."
      );
      resetForm();
    } else {
      throw new Error(data.message || "Unable to upload meal");
    }
  } catch (error) {
    toast.error("Failed to upload meal. Please try again.");
    console.error("Error uploading meal:", error);
  }
};

// Reset the form to its initial state
const resetForm = () => {
  meal.value = {
    mealName: "",
    description: "",
    price: null,
    discount: null,
    isFeatured: false,
    menuTypeId: "",
    categoryId: "",
  };
  file.value = null;
  preview.value = null;
  categories.value = [];
};
</script>

<style scoped>
/* Add your styles here */
.upload-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.preview-image {
  max-width: 100%;
  margin-top: 10px;
}
</style>
