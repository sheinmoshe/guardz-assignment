<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useUser} from "@/composables/use-user.ts";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const { allUsers , getUsers, updateUser } = useUser();

const editingRows = ref([]);

const onRowEditSave = (data: any) => {
  console.log(data.newData);
  updateUser(data.newData);
}

onMounted( getUsers() );

</script>
 <template>
    <div class="card p-fluid">
      <DataTable v-model:editingRows="editingRows" :value="allUsers" editMode="row" dataKey="id" @row-edit-save="onRowEditSave">
        <Column field="id" header="ID" style="width: 20%">
        </Column>
        <Column field="username" header="Username" style="width: 20%">
        </Column>
        <Column field="age" header="Age" style="width: 20%">
          <template #editor="{ data, field }">
            <input v-model="data[field]" type="number" />
          </template>
        </Column>
        <Column field="hobbies" header="Hobbies" style="width: 20%">
          <template #editor="{ data, field }">
            <input type="text" v-model="data[field]" />
          </template>
        </Column>
        <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
      </DataTable>
    </div>
  </template>

<style scoped>

</style>
