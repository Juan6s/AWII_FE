<template>
    <div class="p-grid p-justify-center">
      <div class="p-col-12 p-md-6">
        <Card>
          <template #title>
            lista TODO
          </template>
          <template #content>
            <div class="p-inputgroup p-mb-3">
              <InputText v-model="newItem" placeholder="Añadir a la lista" />
              <Button label="Add" icon="pi pi-plus" @click="addItem" />
            </div>
            <ul>
              <li v-for="(item, index) in items" :key="index" class="p-mb-2">
                <span>{{ item }}</span>
                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-ml-2" @click="removeItem(index)" />
              </li>
            </ul>
          </template>
        </Card>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TodoList',
    data() {
      return {
        newItem: '',
        items: []
      };
    },
    mounted() {
      this.loadItems();
    },
    methods: {
      addItem() {
        if (this.newItem.trim()) {
          this.items.push(this.newItem.trim());
          this.newItem = '';
          this.saveItems();
        }
      },
      removeItem(index) {
        this.items.splice(index, 1);
        this.saveItems();
      },
      saveItems() {
        localStorage.setItem('todo-items', JSON.stringify(this.items));
      },
      loadItems() {
        const savedItems = localStorage.getItem('todo-items');
        if (savedItems) {
          this.items = JSON.parse(savedItems);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .p-inputgroup {
    display: flex;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  