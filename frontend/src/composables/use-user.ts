import {type Ref, ref} from "vue";
import type {User} from "@/modules/user.ts";

export const useUser = () => {
  const allUsers: Ref<Array<User> | []> = ref([]);
  const currentUser: Ref<User | null> = ref(null);

  const getUsers = () => {
    fetch('api/users')
      .then(res => res.json())
      .then(users => allUsers.value = users);
  }

  const updateUser = (user: User) => {

    fetch('api/edit-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        const userIndex = allUsers.value.findIndex((user) => user.id == responseData.id);
        allUsers.value[userIndex] = responseData;
        console.log('Success:', responseData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  return {allUsers, currentUser, getUsers, updateUser};
}
