<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content}` : `SITE_NAME` }}</template>
  </metainfo>
  <v-snackbar variant="text" v-model="snackbar" location="top right">
    <v-alert type="success" title="Alert title" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi">
      <v-btn icon="$close" size="small" variant="text" @click="snackbar = false"></v-btn>
    </v-alert>
  </v-snackbar>
  <v-container class="py-8" fluid>
    <!-- like abovr -->
    <div class="d-flex justify-space-between align-center">
      <v-btn color="success" variant="text" @click="snackbar = true"> open snack bar </v-btn>
    </div>
    <v-row>
      <v-col lg="6" cols="12">
        <v-alert
          density="compact"
          color="success"
          icon="$success"
          title="Alert title"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi"
          variant="tonal">
        </v-alert>
        <v-row>
          <v-col lg="6" cols="12" v-for="(item, i) in 4" :key="i">
            <v-card>
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <h4>card title</h4>
                  <p>card description</p>
                </div>
                <v-avatar color="red">
                  <span>icon</span>
                </v-avatar>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="6" cols="12">
        <v-card class="mt-1">
          <v-card-title>activities</v-card-title>
          <v-timeline side="end" class="justify-start">
            <v-timeline-item dot-color="pink" size="small">
              <div class="d-flex">
                <strong class="me-4">5pm</strong>
                <div>
                  <strong>New Icon</strong>
                  <div class="text-caption">Mobile App</div>
                </div>
              </div>
            </v-timeline-item>

            <v-timeline-item dot-color="teal-lighten-3" size="small">
              <div class="d-flex">
                <strong class="me-4">3-4pm</strong>
                <div>
                  <strong>Design Stand Up</strong>
                  <div class="text-caption mb-2">Hangouts</div>
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item dot-color="teal-lighten-3" size="small">
              <div class="d-flex">
                <strong class="me-4">3-4pm</strong>
                <div>
                  <strong>Design Stand Up</strong>
                  <div class="text-caption mb-2">Hangouts</div>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'calories', order: 'asc' }]" class="elevation-4 mt-5 rounded-lg">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" dark class="mb-2" v-bind="props"> New Item </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save"> Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item.raw)"> mdi-pencil </v-icon>
        <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useMeta } from 'vue-meta'
useMeta({
  title: 'dashboard' ,
  meta:[
    {property:'og:title',content:'dashboard'},
    {property:'og:description',content:'dashboard description'},
    {property:'og:type',content:'video.movie'},
    {property:'og:url',content:'dashboard'},
    {property:'og:image',content:''},
    {property:'og:image:alt',content:'dashboard_image:alt'},
    {property:'og:site_name',content:'dashboard_site_name'},
    {property:'og:locale' ,content:'ar_EG'},
    { name:"twitter:title" ,content:"dashboard_twitter:title"},
    { name:"twitter:description" ,content:"dashboard_twitter:description"},
    { name:"twitter:image" ,content:"dashboard_twitter:image"},
    { name:'twitter:image:alt' ,content:"dashboard_twitter:image:alt"},
    { name:"twitter:site" ,content:"dashboard_twitter:site"},
    { name:"twitter:creator" ,content:"dashboard_twitter:creator"},

  ]
})
const dialog = ref(false);
const dialogDelete = ref(false);
const headers = ref([
  {
    title: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Calories', key: 'calories' },
  { title: 'Fat (g)', key: 'fat' },
  { title: 'Carbs (g)', key: 'carbs' },
  { title: 'Protein (g)', key: 'protein' },
  { title: 'Actions', key: 'actions', sortable: false },
]);
const snackbar = ref(false);
const desserts = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
  },
]);
//crude operation
const editedIndex = ref(-1);
const editedItem = ref({
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});
const defaultItem = ref({
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});

const formTitle = computed(() => (editedIndex.value === -1 ? 'New Item' : 'Edit Item'));

watch(dialog, (val) => {
  val || close();
});
watch(dialogDelete, (val) => {
  val || closeDelete();
});

function save() {
  if (editedIndex.value > -1) {
    Object.assign(desserts.value[editedIndex.value], editedItem.value);
  } else {
    desserts.value.push(editedItem.value);
  }
  close();
}
function editItem(item) {
  editedIndex.value = desserts.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

function deleteItem(item) {
  editedIndex.value = desserts.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
}

function deleteItemConfirm() {
  desserts.value.splice(editedIndex.value, 1);
  closeDelete();
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}
</script>

<style lang="scss" scoped></style>
